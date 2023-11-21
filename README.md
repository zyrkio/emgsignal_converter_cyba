
> Open this page at [https://zyrkio.github.io/emgsignal_converter_cyba/](https://zyrkio.github.io/emgsignal_converter_cyba/)

## Use as Extension

### ``plotAt``
``` blocks


basic.forever(function () {
    radio.setGroup(1);
    // Setze den EMG-Wert auf das analoge Lesen des Pins P0
    let EMG_value = pins.analogReadPin(AnalogPin.P0);

    // Schreibe den Wert "emg signal" über die Serielle Schnittstelle
    serial.writeValue("emg signal", EMG_value);

    // Schreibe den Wert "processed" über die Serielle Schnittstelle
    serial.writeValue("processed", extension.block(EMG_value));

    // Sende den EMG-Wert über den Radio-Block
    radio.sendNumber(extension.block(EMG_value));

    // Pause für 100 Millisekunden
    basic.pause(100);
});


```

### ``useCar``
Using Blocks with the maqueenPlusV2 Kitronic Version with a second microbit

These blocks are designed for users utilizing the maqueenPlusV2 Kitronic version, accessible under the extensions section.

* Adjusting Parameters: Users can modify the 'received Number' parameter as needed.
* Serial Write Value: This feature allows users to print and display the received signal.
* Stable Signal Analysis: If a stable signal waveform is observed, analyze it. Adjust the values to clearly detect muscle flexing.
* Signal Fluctuations: If the signal fluctuates rapidly from a high value to zero, it indicates misalignment or instability in the EMG patches. Check for dirt, ensure proper placement, and stabilize the patches.

These blocks are versatile for signal analysis and can be adjusted according to the requirements of the muscle flex detection. 
Adjust parameters and observe serial outputs for signal analysis and troubleshooting.



``` blocks

radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber > 0.025) {
        maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.AllMotor, maqueenPlusV2.MyEnumDir.Forward, 60)
    } else {
        maqueenPlusV2.controlMotorStop(maqueenPlusV2.MyEnumMotor.AllMotor)
    }
    serial.writeValue("x", receivedNumber)
})

basic.forever(function () {
    radio.setGroup(1)
})


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
