const fs = require('fs');
const data = "contenido para escribir en el archivo"
try {
    fs.writeFileSync('archivo.txt', data)
    console.log("archivo creado correctamente")

} catch (error) {
    console.error("error al escriir el archivo", error)
}