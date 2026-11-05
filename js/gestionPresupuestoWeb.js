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

    divGasto.append(descripcion, fecha, valor, etiquetas);
    contenedor.append(divGasto);
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {

}

export   { 
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}