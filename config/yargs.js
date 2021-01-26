// let opts = {
//     descripcion: {     
//         demand: true,   
//         alias: 'd',
//         desc: 'Descripción de la tarea por hacer'
//     },
//     completado: {
//         alias: 'c',
//         default: true,
//         desc: 'Marca como completada o pendiente la tarea'
//     }
// }

const descripcion =  {     
    demand: true,   
    alias: 'd',
    desc: 'Descripción de la tarea por hacer'
}

const completado = {
    alias: 'c',
    default: true,
    desc: 'Marca como completada o pendiente la tarea'
}

// 1. PRIMERO REQUERIMOS yargs
let argv = require('yargs')
    // 2. DEFINIMOS LOS COMANDOS 
    .command('crear','Crea un elemento por hacer',{
        descripcion
    })
    .command('actualizar','Actualiza el estado completado de una tarea',{
        descripcion,
        completado
    })
    .command('borrar','Borra una tarea',{
        descripcion
    })
    .help()
    .argv;

// 3. LO EXPORTAMOS PARA QUE FUNCIONE 
module.exports = {
    argv
}