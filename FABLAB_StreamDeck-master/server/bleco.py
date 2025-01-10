import asyncio
import json
import sys
import warnings

from bleak import BleakClient, BleakScanner

warnings.simplefilter(action='ignore', category=FutureWarning)

UART_SERVICE_UUID = "6E400001-B5A3-F393-E0A9-E50E24DCCA9E"
UART_RX_CHARACTERISTIC_UUID = "6E400002-B5A3-F393-E0A9-E50E24DCCA9E"
UART_TX_CHARACTERISTIC_UUID = "6E400003-B5A3-F393-E0A9-E50E24DCCA9E"

async def gestionnaire_notifications(expediteur, donnees):
    message_recu = donnees.decode('utf-8')
    data_dict = {"button": message_recu}
    data_json = json.dumps(data_dict)
    print(data_json, file=sys.stdout)
    sys.stdout.flush()

async def executer_client_ble():
    dispositifs = await BleakScanner.discover()
    dispositif_cible = None

    for dispositif in dispositifs:
        uuids = dispositif.metadata.get("uuids", [])
        if any(UART_SERVICE_UUID.lower() in uuid.lower() for uuid in uuids):
            dispositif_cible = dispositif
            break

    if dispositif_cible is None:
        # print("Dispositif non trouvé. Assurez-vous que votre dispositif est en mode publicité.", file=sys.stderr)
        return

    async with BleakClient(dispositif_cible.address) as client:
        print(f"Je suis connecte a {dispositif_cible.name}", file=sys.stderr)
        
        await client.start_notify(UART_TX_CHARACTERISTIC_UUID, gestionnaire_notifications)
        message = "Bonjour, Pico !"
        await client.write_gatt_char(UART_RX_CHARACTERISTIC_UUID, message.encode())

        try:
            while True:
                await asyncio.sleep(1)
        except KeyboardInterrupt:
            await client.stop_notify(UART_TX_CHARACTERISTIC_UUID)
            print("Interruption du programme, j'ai arrêté d'écouter.", file=sys.stderr)

if __name__ == "__main__":
    try:
        asyncio.run(executer_client_ble())
    except Exception as e:
        pass