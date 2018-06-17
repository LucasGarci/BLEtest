// Esta es la unica caracteristica que responde a startNotific...
await BleManager.startNotification(
  deviceInfo.id,
  deviceInfo.characteristics[4].service,
  deviceInfo.characteristics[4].characteristic
).catch(errNotif => console.log({ errNotif }));
//Creamos enlace o certificamos que esta creado
await BleManager.createBond(deviceInfo.id)
  .then(() => {
    console.log("Bonding its OK");
  })
  .catch(() => {
    console.log("Fail to bond");
  });