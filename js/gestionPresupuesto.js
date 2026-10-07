// TODO: Crear las funciones, objetos y variables indicadas en el enunciado
'use strict';
// TODO: Variable global
let presupuesto = 0;
let gastos = [];
let idGasto = 0;

function actualizarPresupuesto(nuevoPresupuesto) {
    // TODO
    if (typeof nuevoPresupuesto === 'number' && nuevoPresupuesto >= 0) {
        presupuesto = nuevoPresupuesto;
        return presupuesto;
    } else {
        console.log("Error: El presupuesto debe ser un número positivo.");
        return -1;
    }
}

function mostrarPresupuesto() {
    // TODO
    return `Tu presupuesto actual es de ${presupuesto} €`;
}

function CrearGasto(descripcion, valor, fecha, ...etiquetas) {
    this.descripcion = descripcion;

    if (typeof valor === 'number' && valor >= 0) {
        this.valor = valor;
    } else {
        this.valor = 0;
    }

    if (typeof fecha === 'string' && !isNaN(Date.parse(fecha))) {
        this.fecha = Date.parse(fecha);
    } else {
        this.fecha = Date.now();
    }

    this.etiquetas = [];

    this.mostrarGasto = function() {
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    };

    this.actualizarDescripcion = function(nuevaDescripcion) {
        this.descripcion = nuevaDescripcion;
    };

    this.actualizarValor = function(nuevoValor) {
        if (typeof nuevoValor === 'number' && nuevoValor >= 0) {
            this.valor = nuevoValor;
        }
    };

    this.anyadirEtiquetas = function(...nuevasEtiquetas) {
        for (let etiqueta of nuevasEtiquetas) {
            if (!this.etiquetas.includes(etiqueta)) {
                this.etiquetas.push(etiqueta);
            }
        }
    };

    this.anyadirEtiquetas(...etiquetas);
}

function listarGastos() {
    return gastos;
}

function anyadirGasto(gasto) {
    gasto.id = idGasto;

    idGasto++;

    gastos.push(gasto);
}

// 4. borrarGasto
// Elimina de la variable global "gastos" el gasto cuyo id coincide con el pasado como parámetro.
// Si no existe un gasto con ese id, no hace nada.
function borrarGasto(id) {
    let indice = gastos.findIndex(gasto => gasto.id === id);

    if (indice !== -1) {
        gastos.splice(indice, 1);
    }
}

// 5. calcularTotalGastos
// Devuelve la suma de todos los gastos creados en la variable global "gastos".
function calcularTotalGastos() {
    return gastos.reduce((acumulador, gasto) => acumulador + gasto.valor, 0);
}

// 6. calcularBalance
// Devuelve el balance disponible: presupuesto - gastos totales.
function calcularBalance() {
    return presupuesto - calcularTotalGastos();
}



// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto,
    listarGastos,
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance
}
