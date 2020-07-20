# @sorrir/bluetooth

## Setup

First, make sure which version of `bluez` you have installed:
```console
bluetoothd -v
```
`@sorrir/bluetooth` has been tested with `bluez 5.50` or newer. It might work on older versions as well, but if you run into problems, make sure to update `bluez` first.

Afterwards you can install the package from npm
```console
npm install @sorrir/bluetooth
```
The next step is optional, however it is **strongly** recommended. By default, `@sorrir/bluetooth` can only communicate with `bluez` as a root user. To avoid this, create the file `/etc/dbus-1/system.d/sorrir-bluetooth.conf` with the following content:
```conf
<!-- This configuration file specifies the required security policies
     for @sorrir/bluetooth npm package to work. -->

<!DOCTYPE busconfig PUBLIC "-//freedesktop//DTD D-BUS Bus Configuration 1.0//EN"
 "http://www.freedesktop.org/standards/dbus/1.0/busconfig.dtd">
<busconfig>
  <policy user="<YOUR_USER>">
    <allow own="org.bluez"/>
    <allow send_destination="org.bluez"/>
    <allow send_interface="org.bluez.GattCharacteristic1"/>
    <allow send_interface="org.bluez.GattDescriptor1"/>
    <allow send_interface="org.bluez.LEAdvertisement1"/>
    <allow send_interface="org.freedesktop.DBus.ObjectManager"/>
    <allow send_interface="org.freedesktop.DBus.Properties"/>
  </policy>
</busconfig>
```
Make sure to replace `<YOUR_USER>` with your user name. Note that the above configuration is only for core BLE functionality using the Generic Attribute Profile (GATT). If intend to use more advanced functionality like custom agents, some additional send interfaces might have to be added. If you start getting `org.freedesktop.DBus.Error.AccessDenied` errors, add the required interface(s) from the following list:
```conf
<allow send_interface="org.bluez.Agent1"/>
<allow send_interface="org.bluez.Profile1"/>
<allow send_interface="org.bluez.MediaEndpoint1"/>
<allow send_interface="org.bluez.MediaPlayer1"/>
<allow send_interface="org.mpris.MediaPlayer2.Player"/>
```

