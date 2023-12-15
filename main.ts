namespace EMGConversion {
    let filteredValue = 0;
    let windowSize = 5; // Fenstergröße für RMS
    let signalBuffer: number[] = [];
    let maxRMS = -Infinity;
    let minRMS = Infinity;
    /**
     * Konvertiert, filtert, gleicht aus und berechnet das RMS des EMG-Signals
     * @param signal, beschreibe den Parameter hier
     */
    //% block="Konvertiere, filtere, gleiche aus und berechne RMS des EMG-Signal $signal"
    //% signal.min=0 signal.max=1023
    export function convertFilterRectifyAndCalculateRMS(signal: number): number {
        const operatingVoltage = 3.3;
        const sensorGain = 1009;
        const alpha = 0.5; // Filterkonstante für den Tiefpassfilter

        // Konvertierung in Millivolt
        signal = (signal / 1024 - 0.5) * operatingVoltage / sensorGain * 1000;

        // Anwendung des Tiefpassfilters
        filteredValue = alpha * signal + (1 - alpha) * filteredValue;

        // Vollwellengleichrichtung
        filteredValue = Math.abs(filteredValue); // Wandelt negative Werte in positive um

        // Speichern des gefilterten und gleichgerichteten Signals im Buffer
        signalBuffer.push(filteredValue);

        // Überprüfen, ob das Fenster die maximale Größe erreicht hat, und die ältesten Werte entfernen
        if (signalBuffer.length > windowSize) {
            signalBuffer.shift();
        }

        // Berechnung des Root Mean Square (RMS)
        let sumSquared = 0;
        for (let i = 0; i < signalBuffer.length; i++) {
            sumSquared += signalBuffer[i] ** 2;
        }
        let rmsValue = Math.sqrt(sumSquared / signalBuffer.length);
        let result = EMGConversion.thresholdCalculate(rmsValue);
        "call funktion um threshold zu berechnen"
        " if caluse und threshold wert benutzen falls höher dann 1 falls darunter dann 0"

        if (rmsValue > result) {
            return 1; // Rückgabe 1, wenn der RMS-Wert den Schwellenwert überschreitet
        } else {
            return 0; // Rückgabe 0, wenn der RMS-Wert den Schwellenwert unterschreitet
        }
    }
    export function thresholdCalculate(threshold: number): number {
        // Aktualisiere den maximalen und minimalen Wert
        if (threshold > maxRMS) {
            maxRMS = threshold;
        }
        if (threshold < minRMS) {
            minRMS = threshold;
        }

        // Berechne den Durchschnitt aus dem maximalen und minimalen Wert
        const averageThreshold = (maxRMS + minRMS) / 2;

        return averageThreshold;
    }
     
}