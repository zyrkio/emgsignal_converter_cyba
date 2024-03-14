@namespace
class EMGConversion:
    filteredValue = 0
    windowSize = 5
    # Fenstergröße für RMS
    signalBuffer: List[number] = []
    """
    
    Konvertiert, filtert, gleicht aus und berechnet das RMS des EMG-Signals
    @param signal, beschreibe den Parameter hier
    
    """
    # % block="Filtere RAW Signal $signal"
    # % signal.min=0 signal.max=1023
    def convertFilterRectifyAndCalculateRMS(signal: number):
        global filteredValue
        operatingVoltage = 3.3
        sensorGain = 1009
        alpha = 0.5
        # Filterkonstante für den Tiefpassfilter
        # Konvertierung in Millivolt
        signal = (signal / 1024 - 0.5) * operatingVoltage / sensorGain * 1000
        # Anwendung des Tiefpassfilters
        filteredValue = alpha * signal + (1 - alpha) * filteredValue
        # Vollwellengleichrichtung
        filteredValue = abs(filteredValue)
        # Wandelt negative Werte in positive um
        # Speichern des gefilterten und gleichgerichteten Signals im Buffer
        signalBuffer.append(filteredValue)
        # Überprüfen, ob das Fenster die maximale Größe erreicht hat, und die ältesten Werte entfernen
        if len(signalBuffer) > windowSize:
            signalBuffer.shift()
        # Berechnung des Root Mean Square (RMS)
        sumSquared = 0
        for i in range(len(signalBuffer)):
            sumSquared += signalBuffer[i] ** 2
        rmsValue = Math.sqrt(sumSquared / len(signalBuffer))
        "call funktion um threshold zu berechnen"
        " if caluse und threshold wert benutzen falls höher dann 1 falls darunter dann 0"
        return rmsValue