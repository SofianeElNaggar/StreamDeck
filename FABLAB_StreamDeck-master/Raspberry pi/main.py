# Importation des modules nécessaires
from machine import Pin
import time
import bluetooth
from ble_simple_peripheral import BLESimplePeripheral

# Création de l'objet pour le Bluetooth
ble = bluetooth.BLE()

# Création de l'objet pour le périphérique simple et activation du Bluetooth
sp = BLESimplePeripheral(ble)

# Configuration de la broche GP25 comme sortie pour la LED et de la broche du bouton en entrée avec résistance de rappel au bas
led = Pin(25, Pin.OUT)  # Utilisez le GP25 pour la LED
button = Pin(14, Pin.IN, Pin.PULL_DOWN)

# Ajout de cinq autres boutons
button1 = Pin(2, Pin.IN, Pin.PULL_DOWN)
button2 = Pin(3, Pin.IN, Pin.PULL_DOWN)
button3 = Pin(4, Pin.IN, Pin.PULL_DOWN)
button4 = Pin(5, Pin.IN, Pin.PULL_DOWN)
button5 = Pin(6, Pin.IN, Pin.PULL_DOWN)

# Fonction exécutée lors de la réception des données pour allumer/éteindre
def on_rx(data):
    """
    Fonction exécutée lorsque la commande on_off est reçue
    """
    print("Données reçues : ", data)
    if data == b'on_off\r\n':
        led.value(not led.value())  # Change l'état de la LED
        if led.value():
            print('LED allumée')
        else:
            print('LED éteinte')

# Boucle principale
while True:
    # Si le périphérique BLE est connecté
    if sp.is_connected():
        # Si des données sont reçues, exécute la fonction on_rx
        sp.on_write(on_rx)

    # Vérifie si l'un des boutons a été pressé et envoie un message correspondant
    if button.value():
        sp.send("button1")
        #print("Bouton pressé")
        time.sleep(0.2)  # Anti-rebond pour le bouton
    if button1.value():
        sp.send("button2")
        #print("Bouton 1 pressé")
        time.sleep(0.2)
    if button2.value():
        sp.send("button3")
        #print("Bouton 2 pressé")
        time.sleep(0.2)
    if button3.value():
        sp.send("button4")
        #print("Bouton 3 pressé")
        time.sleep(0.2)
    if button4.value():
        sp.send("button5")
        #print("Bouton 4 pressé")
        time.sleep(0.2)
    if button5.value():
        sp.send("button6")
#      	print("Bouton 5 pressé")
        time.sleep(0.2)

