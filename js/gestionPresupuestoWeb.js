function mostrarDatoEnId(idElemento, valor) {
    let elemento = document.getElementById(idElemento);
    if (elemento) {
        elemento.textContent = valor;
    }
}

function mostrarGastoWeb(id,gasto) {

}

function mostrarGastosAgrupadosWeb() {

}

export   { 
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}