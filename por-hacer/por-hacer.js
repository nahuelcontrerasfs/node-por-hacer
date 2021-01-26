// AQUI CONFIGURAREMOS TODA LA LÓGICA

// VAMOS A USAR EL FILESYSTEM PORQUE NECESITAMOS GRABAR LA INFORMACIÓN EN ALGÚN LUGAR FÍSICO PARA QUE PERSISTA
const fs = require('fs');

// LAS NOTAS VAN A SER GUARDADAS EN UN ARREGLO
let listadoPorHacer = [];

// CON ESTA FUNCIÓN GUARDAREMOS EN NUESTRA BASE DE DATOS
const guardarDB = () => {
    // PASAMOS LA INFORMACION QUE NOS INTERESA A UN FORMATO JSON VÁLIDO PARA GRABARLO CON FILESYSTEM
    let data = JSON.stringify(listadoPorHacer);
    // A) USAMOS LA FUNCIÓN fs:writeFile PARA GRABAR
    // B) EL PRIMER PARÁMETRO ES EL PATH DONDE SE GRABARA db/data.json
    // C) LUEGO VIENE LA INFORMACIÓN QUE SE QUIERE GRABAR, EN ESTE CASO data
    // D) EL TERCER ARGUMENTO ES UN ERROR EN CASO QUE FALLE
    fs.writeFile('db/data.json', data, (error) => {
        if(error) 
            throw new Error('No se pudo grabar', error);
    });
    // ESTE COMANDO SOBREESCRIBE EL CONTENIDO DEL ARCHIVO, POR LO CUAL NO SE ACUMULA, POR ESO EN crear COMENZAMOS CARGANDO LA BASE DE DATOS PARA QUE SE HAGA UN APPEND
}

// VAMOS A LEER EL ARCHIVO
const cargarDB = () => {
    // UTILIZAMOS UN try catch PARA MANEJAR LOS ERRORS, COMO LO QUE SUCEDE SI LA BASE DE DATOS ESTÁ VACÍA
    try {        
        // COMO ESTAMOS EN UN LENGUAJE QUE SE ENCUENTRA DEL LADO DEL SERVIDOR, NO VAMOS A HACER UNA PETICIÓN http SINO UN require
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }
    
}

// LA PRIMERA FUNCIÓN SERÁ LA DE CREAR. RECIBE LA DESCRIPCIÓN COMO ARGUMENTO
const crear = (descripcion) => {

    // ANTES DEL PUSH CARGAREMOS LA DB
    cargarDB();
    // AL EJECUTAR POR HACER SE CREA UN NUEVO POR HACER Y SE AGREGA EN EL LISTADO POR HACER
    let porHacer = {
        // GRACIAS A ES6 ES REDUNDANTE CUANDO TIENE EL MISMO NOMBRE
        // descripcion: descripcion
        descripcion,
        // COMPLETADO ES POR DEFECTO FALSE
        completado: false
    }

    listadoPorHacer.push(porHacer);

    guardarDB();

    return porHacer;
}


const getListado = () => {

    cargarDB();
    return listadoPorHacer;
    
}

const actualizar = (descripcion, completado = true) => {
    // CARGO LA BASE DE DATOS
    cargarDB();
    // BUSCO LA TAREA QUE QUIERO ACTUALIZAR
    let index = listadoPorHacer.findIndex( tarea => tarea.descripcion === descripcion );

    if(index >=0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }
}

const borrar = (descripcion) => {
    cargarDB();    

    let index = listadoPorHacer.findIndex( tarea => tarea.descripcion === descripcion );
    if(index >= 0)
    {
        listadoPorHacer.splice(index,1);
        guardarDB();
        return true;
    } else {
        return false;
    }

    // OTRA ALTERNATIVA CON FILTER
    // let nuevoListado = listadoPorHacer.filter( tarea => tarea.descripcion !== descripcion);
    // if( listadoPorHacer.length === nuevoListado.length ) {
    //     return false;
    // } else {
    //     listadoPorHacer = nuevoListado;
    //     guardarDB();
    //     return true;
    // }
}


// EXPORTAMOS
module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}