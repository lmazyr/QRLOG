// ======================================
// QR.LOG v4.0
// print.js
// ======================================

// ======================
// FORMATOS DE IMPRESSÃO
// ======================

const FORMATOS_IMPRESSAO = {

    "18x5": {
        largura: "18cm",
        altura: "5cm"
    },

    "10x5": {
        largura: "10cm",
        altura: "5cm"
    },

    "5x8": {
        largura: "5cm",
        altura: "8cm"
    },

    "personalizado": {
        largura: "auto",
        altura: "auto"
    }

};

// ======================
// MODAL
// ======================

function abrirImpressao() {

    const modal =
        $("modalPrint");

    if (modal) {

        modal.style.display =
            "flex";

    }

}

function fecharImpressao() {

    const modal =
        $("modalPrint");

    if (modal) {

        modal.style.display =
            "none";

    }

}

// ======================
// PEGAR FORMATO SELECIONADO
// ======================

function obterFormatoSelecionado() {

    const opcao =
        document.querySelector(
            'input[name="print"]:checked'
        );

    if (!opcao) {

        return "18x5";

    }

    return opcao.value;

}

// ======================
// APLICAR FORMATO
// ======================

function aplicarFormato(elemento) {

    const formato =
        obterFormatoSelecionado();

    const config =
        FORMATOS_IMPRESSAO[formato];

    if (!config) return;

    elemento.style.width =
        config.largura;

    elemento.style.height =
        config.altura;

}

// ======================
// IMPRIMIR ELEMENTO
// ======================

function imprimirElemento(idElemento) {

    const elemento =
        $(idElemento);

    if (!elemento) {

        mostrarAlerta(
            "Elemento não encontrado."
        );

        return;

    }

    const larguraOriginal =
        elemento.style.width;

    const alturaOriginal =
        elemento.style.height;

    aplicarFormato(elemento);

    elemento.classList.add(
        "print-area"
    );

    fecharImpressao();

    setTimeout(() => {

        window.print();

        setTimeout(() => {

            elemento.classList.remove(
                "print-area"
            );

            elemento.style.width =
                larguraOriginal;

            elemento.style.height =
                alturaOriginal;

        }, 300);

    }, 200);

}

// ======================
// IMPRESSÕES ESPECÍFICAS
// ======================

function imprimirQR() {

    const qr =
        document.querySelector(
            "#qrcode canvas, #qrcode img"
        );

    if (!qr) {

        mostrarAlerta(
            "Gere um QR primeiro."
        );

        return;

    }

    imprimirElemento(
        "qrcode"
    );

}

function imprimirCracha() {

    const cracha =
        $("cardColaborador");

    if (!cracha ||
        !$("nomeCard").innerText) {

        mostrarAlerta(
            "Gere um crachá primeiro."
        );

        return;

    }

    imprimirElemento(
        "cardColaborador"
    );

}

function imprimirCodigoBarras() {

    const svg =
        $("barcode");

    if (!svg ||
        !svg.innerHTML) {

        mostrarAlerta(
            "Gere um código primeiro."
        );

        return;

    }

    imprimirElemento(
        "barcode"
    );

}

// ======================
// EVENTOS
// ======================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const modal =
            $("modalPrint");

        if (!modal) return;

        modal.addEventListener(
            "click",
            (e) => {

                if (e.target === modal) {

                    fecharImpressao();

                }

            }
        );

    }
);

// ======================
// LOG
// ======================

console.log(
    "print.js carregado!"
);