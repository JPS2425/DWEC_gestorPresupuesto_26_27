import * as gestionPresupuesto from "./gestionPresupuesto.js";

function mostrarDatoEnId(idElemento, valor) {
  document.getElementById(idElemento).textContent = valor;
}

function mostrarGastoWeb(idElemento, gasto) {
    const contenedor = document.getElementById(idElemento);

    const divGasto = document.createElement("div");
    divGasto.classList.add("gasto");

    const descripcion = document.createElement("div");
    descripcion.classList.add("gasto-descripcion");
    descripcion.textContent = gasto.descripcion;

    const fecha = document.createElement("div");
    fecha.classList.add("gasto-fecha");
    fecha.textContent = gasto.fecha;

    const valor = document.createElement("div");
    valor.classList.add("gasto-valor");
    valor.textContent = gasto.valor;

    const etiquetas = document.createElement("div");
    etiquetas.classList.add("gasto-etiquetas");
    for (const etiqueta of gasto.etiquetas) {
        const span = document.createElement("span");
        span.classList.add("gasto-etiquetas-etiqueta");
        span.textContent = etiqueta;
        etiquetas.append(span);
    }

    const botonEditar = document.createElement("button");
    botonEditar.type = "button";
    botonEditar.classList.add("gasto-editar");
    botonEditar.textContent = "Editar";
    const manejadorEditar = new EditarHandle();
    manejadorEditar.gasto = gasto;
    botonEditar.addEventListener("click", manejadorEditar);

    const botonBorrar = document.createElement("button");
    botonBorrar.type = "button";
    botonBorrar.classList.add("gasto-borrar");
    botonBorrar.textContent = "Borrar";
    const manejadorBorrar = new BorrarHandle();
    manejadorBorrar.gasto = gasto;
    botonBorrar.addEventListener("click", manejadorBorrar);

    divGasto.append(descripcion, fecha, valor, etiquetas, botonEditar, botonBorrar);
    contenedor.append(divGasto);
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
    const contenedor = document.getElementById(idElemento);
    const nombres = {mes: "mes", dia: "día", anyo: "año"};

    const divAgrup = document.createElement("div");
    divAgrup.classList.add("agrupacion");

    const titulo = document.createElement("h1");
    titulo.textContent = `Gastos agrupados por ${nombres[periodo]}`;
    divAgrup.append(titulo);

    for (const [clave, valor] of Object.entries(agrup)) {
        const dato = document.createElement("div");
        dato.classList.add("agrupacion-dato");

        const spanClave = document.createElement("span");
        spanClave.classList.add("agrupacion-dato-clave");
        spanClave.textContent = clave;

        const spanValor = document.createElement("span");
        spanValor.classList.add("agrupacion-dato-valor");
        spanValor.textContent = valor;

        dato.append(spanClave, spanValor);
        divAgrup.append(dato);
    }

    contenedor.append(divAgrup);
}

function repintar() {
    mostrarDatoEnId("presupuesto", gestionPresupuesto.mostrarPresupuesto());
    mostrarDatoEnId("gastos-totales", gestionPresupuesto.calcularTotalGastos());
    mostrarDatoEnId("balance-total", gestionPresupuesto.calcularBalance());

    document.getElementById("listado-gastos-completo").innerHTML = "";
    for (const gasto of gestionPresupuesto.listarGastos()) {
        mostrarGastoWeb("listado-gastos-completo", gasto);
    }
}

function actualizarPresupuestoWeb() {
    const respuesta = prompt("Introduce un presupuesto:");
    const presupuesto = Number(respuesta);
    gestionPresupuesto.actualizarPresupuesto(presupuesto);
    repintar();
}

function nuevoGastoWeb() {
    const descripcion = prompt("Descripción del gasto:");
    const valor = Number(prompt("Valor del gasto:"));
    const fecha = prompt("Fecha del gasto (yyyy-mm-dd):");
    const etiquetas = prompt("Etiquetas (separadas por comas):").split(",");

    const gasto = new gestionPresupuesto.CrearGasto(descripcion, valor, fecha, ...etiquetas);
    gestionPresupuesto.anyadirGasto(gasto);
    repintar();
}

function EditarHandle() {
    this.handleEvent = function () {
        const descripcion = prompt("Descripción del gasto:", this.gasto.descripcion);
        const valor = Number(prompt("Valor del gasto:", this.gasto.valor));
        const fecha = prompt(
            "Fecha del gasto (yyyy-mm-dd):",
            new Date(this.gasto.fecha).toISOString().substring(0, 10)
        );
        const etiquetas = prompt(
            "Etiquetas (separadas por comas):",
            this.gasto.etiquetas.join(",")
        ).split(",");

        this.gasto.actualizarDescripcion(descripcion);
        this.gasto.actualizarValor(valor);
        this.gasto.actualizarFecha(fecha);
        this.gasto.anyadirEtiquetas(...etiquetas);

        repintar();
    };
}

function BorrarHandle() {
    this.handleEvent = function () {
        gestionPresupuesto.borrarGasto(this.gasto.id);
        repintar();
    };
}

function BorrarEtiquetasHandle() {
    this.handleEvent = function () {
        this.gasto.borrarEtiquetas(this.etiqueta);
        repintar();
    };
}

document
    .getElementById("actualizarpresupuesto")
    .addEventListener("click", actualizarPresupuestoWeb);

document
    .getElementById("anyadirgasto")
    .addEventListener("click", nuevoGastoWeb);
    
export   { 
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
};