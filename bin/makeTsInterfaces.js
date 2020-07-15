const fs = require('fs');
const argv = require('yargs').argv
const { DBusSignatures } = require('../lib/sorrir-bluez/types')

// consts

const includeNames = DBusSignatures.getImportableTypes().reduce((prev, cur) => `${prev}, ${cur}`)

const template = `import { Bluez } from "../core"
import { @class1 } from "./generated/@filename"
import { BaseInterface } from "./models/BaseInterface"
import { Signal } from "./models/Signal"
import { Property, ReadOnlyProperty } from "./models/Property"
import { ${includeNames}, Variant } from "../types"

export class @class0 extends BaseInterface<@class1> {
     /**
     * Hide constructor, initialization shall be done asynchronously with connect
     */

    private constructor(bluez: Bluez, internal: @class1) { super(bluez, internal) }

    static async connect(bluez: Bluez, path: String) {
        return new @class0(bluez, await @class1.Connect(bluez.bus, path))
    }

    /**
    * Direct mappings to introspected properties, methods and signals of internal @class1
    */

@out
}`

// functions

function lowercaseFirstLetter(string) {
    return string.charAt(0).toLowerCase() + string.slice(1);
}

function getSignatures(signature, previous = [],) {
    if (signature === undefined || signature.trim() === "") return previous
    console.log(signature.charAt(0))
    let type = DBusSignatures.getType(signature.charAt(0))
    console.log(type)
    if (type === DBusSignatures.getType('a')) {
        if (signature.charAt(1) !== '{') {
            return getSignatures(signature.substring(2), [...previous, `${type}<${getSignatures(signature.charAt(1))}>`])
        } else {
            console.log(signature)
            type = DBusSignatures.getType('a{')
            let closeingBraceIndex = findClosingBrace(signature.substring(2))
            if (closeingBraceIndex !== -1) {
                let subSignatures = getSignatures(signature.substring(2, 2 + closeingBraceIndex))
                if (subSignatures[0] === 'String') {
                    subSignatures[0] = 'string'
                }
                return getSignatures(signature.substring(3 + closeingBraceIndex),
                    [...previous, `${type}<${subSignatures[0]}, ${subSignatures[1]}>`])
            }
        }
    } else if (type) {
        return getSignatures(signature.substring(1), [...previous, type])
    }
    return previous
}

function findClosingBrace(string, openBraces = 1) {
    for (let i = 0; i < string.length; i++) {
        switch (string.charAt(i)) {
            case "{": openBraces++
                break
            case "}": openBraces--
                break
        }
        if (openBraces == 0) return i
    }
    return -1
}



function produceOutput(inFile, outFile) {
    const text = fs.readFileSync(inFile, 'utf8');

    let sourceClass = text.match(/export class (.+?) extends/)[1]
    let generatedClass = sourceClass.endsWith(1) ? sourceClass.replace(/1$/, "") : `${sourceClass}Impl`
    let fileName = inFile.match(/([^/]+?)\.js/)[1]

    let propertyRegex = /(\/\/\@property\(.*?signature: '(.*?)'.*?\))[\t-ü]*?([A-Z][a-zA-Z]*?)\((.*?)\)/g
    let propertyMatches = text.matchAll(propertyRegex)

    let methodRegex = /(\/\/\@method.*?inSignature: '(.*?)'.*?outSignature: '(.*?)'.*?\))[\t-ü]*?([A-Z][a-zA-Z]*?)\((.*?)\)/g
    let methodMatches = text.matchAll(methodRegex)

    let signalRegex = /(\/\/\@signal\(.*?name: '(.*?)'.*?signature: '(.*?)'.*?\))/g
    let signalMatches = text.matchAll(signalRegex)

    let out = ""
    for (let match of propertyMatches) {
        let hasSet = match[4] !== ""
        let signature = getSignatures(match[2])

        let s = `\t${match[1]}\n`
        s += `\t${match[3]} = new ${!hasSet ? 'ReadOnly' : ''}Property<${signature}>('${match[3]}', this._internal)\n`
        out += s + "\n"
    }

    for (let match of methodMatches) {
        let s = `\t${match[1]}\n`
        let inSignatures = getSignatures(match[2])
        let outSignatures = getSignatures(match[3])
        let functionParameters = ''
        let parameterNames = match[5].trim().split(",").filter((el) => { return el !== undefined && el !== "" })
        for (i = 0; i < parameterNames.length; i++) {
            if (parameterNames[i] === 'interface')
                parameterNames[i] = "iface"
        }
        inSignatures.forEach((sig, index) => {
            functionParameters += (functionParameters.length > 0 ? ',' : '')
            functionParameters += parameterNames[index] + ': ' + sig
        })
        let outType = `${outSignatures.length > 0 ? `${outSignatures.length > 1 ? `[${outSignatures.reduce((prev, cur) => `${prev}, ${cur}`)}]` : outSignatures}` : ""}`
        if (outType.startsWith("Array")) {
            s += `\tasync ${lowercaseFirstLetter(match[4])}(${functionParameters}): Promise<${outType}> { return new ${outType}(await this._internal.${match[4]}(${parameterNames})) }\n`
        } else {
            s += `\tasync ${lowercaseFirstLetter(match[4])}(${functionParameters}) { return this._internal.${match[4]}(${parameterNames}) }\n`
        }
        out += s + "\n"
    }

    for (let match of signalMatches) {
        let s = `\t${match[1]}\n`
        let signatures = getSignatures(match[3])
        let functionParameters = ''
        let args = ''
        signatures.forEach((sig) => {
            functionParameters += (functionParameters.length > 0 ? ', ' : '')
            functionParameters += lowercaseFirstLetter(sig).split("<")[0] + ': ' + sig
            args += (args.length > 0 ? ', ' : '')
            args += lowercaseFirstLetter(sig).split("<")[0]
        })
        let keyProvider = ''
        for(let match of functionParameters.matchAll(/([a-z][a-zA-Z0-9]*?):/g)) {
            keyProvider += (keyProvider !== "" ? "," : "") + match[0] + " null"
        }
        s += `\t${match[2]} = new Signal<{${functionParameters}}>('${match[2]}', this._internal, {${keyProvider}})\n`
        out += s + "\n"
    }

    function apply(template) {
        return template.replace(/@out/g, out).replace(/@class1/g, sourceClass).replace(/@class0/g, generatedClass).replace(/@filename/g, fileName)
    }

    fs.writeFileSync(apply(outFile || 'out.ts'), apply(template))
}

// read files

if (argv.inDir && argv.outDir) {
    fs.readdir(argv.inDir, (err, files) => {
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }
        files.forEach((file) => {
            console.log(file)
            try {
                produceOutput(`${argv.inDir}/${file}`, `${argv.outDir}/@class0.ts`)
            } catch (e) {
                console.error(e)
            }
        });
    });
} else if (argv.in) {
    console.log(argv.in)
    produceOutput(argv.in, argv.out || argv.outDir ? `${argv.outDir}/@class0.ts` : undefined || '@class0.ts')
}