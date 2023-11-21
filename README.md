
> Open this page at [https://zyrkio.github.io/emgsignal_converter_cyba/](https://zyrkio.github.io/emgsignal_converter_cyba/)

## Use as Extension

### ``plotAt``
``` blocks
basic.forever(function () {
    // Setze den EMG-Wert auf das analoge Lesen des Pins P0
    let EMG_value = pins.analogReadPin(AnalogPin.P0);

    // Schreibe den Wert "emg signal" über die Serielle Schnittstelle
    serial.writeValue("emg signal", EMG_value);

    // Schreibe den Wert "processed" über die Serielle Schnittstelle
    serial.writeValue("processed", extension.block(EMG_value));

    // Pause für 100 Millisekunden
    basic.pause(100);
});

```

This repository can be added as an **extension** in MakeCode.

* open [https://makecode.microbit.org/](https://makecode.microbit.org/)
* click on **New Project**
* click on **Extensions** under the gearwheel menu
* search for **https://github.com/zyrkio/emgsignal_converter_cyba** and import

## Edit this project

To edit this repository in MakeCode.

* open [https://makecode.microbit.org/](https://makecode.microbit.org/)
* click on **Import** then click on **Import URL**
* paste **https://github.com/zyrkio/emgsignal_converter_cyba** and click import

#### Metadata (used for search, rendering)

* for PXT/microbit
<script src="https://makecode.com/gh-pages-embed.js"></script><script>makeCodeRender("{{ site.makecode.home_url }}", "{{ site.github.owner_name }}/{{ site.github.repository_name }}");</script>
