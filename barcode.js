// ======================================
// QR.LOG v4.0
// barcode.js
// ======================================

// ======================
// GERAR CÓDIGO DE BARRAS
// ======================

function gerarBarra() {

    const texto =
        $("textoBarra")?.value.trim();

    if (campoVazio(texto)) {

        mostrarAlerta(
            "Digite um código."
        );

        return;

    }

    const barcode =
        $("barcode");

    if (!barcode) return;

    try {

        JsBarcode(

            barcode,

            texto,

            {

                format: "CODE128",

                lineColor: "#000000",

                background: "#FFFFFF",

                width: 3,

                height: 90,

                margin: 15,

                fontSize: 18,

                displayValue: true,

                textMargin: 8

            }

        );

    }

    catch (erro) {

        console.error(erro);

        mostrarAlerta(
            "Erro ao gerar o código de barras."
        );

    }

}

// ======================
// SALVAR PNG
// ======================

function salvarBarraPNG() {

    const svg =
        $("barcode");

    if (
        !svg ||
        !svg.innerHTML
    ) {

        mostrarAlerta(
            "Gere um código primeiro."
        );

        return;

    }

    svgParaPNG(
        svg,
        "codigo-barras.png"
    );

}

// ======================
// LIMPAR CÓDIGO
// ======================

function limparBarra() {

    $("textoBarra").value = "";

    const svg =
        $("barcode");

    if (svg) {

        svg.innerHTML = "";

    }

}

// ======================
// IMPRESSÃO
// ======================

function imprimirCodigoBarras() {

    const container =
        document.querySelector(
            ".barcode-container"
        );

    const svg =
        $("barcode");

    if (
        !container ||
        !svg ||
        !svg.innerHTML
    ) {

        mostrarAlerta(
            "Gere um código primeiro."
        );

        return;

    }

    container.classList.add(
        "print-area"
    );

    window.print();

    setTimeout(() => {

        container.classList.remove(
            "print-area"
        );

    }, 500);

}

// ======================
// ALTERAR TAMANHO DA ETIQUETA
// ======================

function aplicarFormatoEtiqueta(formato) {

    const container =
        document.querySelector(
            ".barcode-container"
        );

    if (!container) return;

    switch (formato) {

        case "18x5":

            container.style.width =
                "18cm";

            container.style.height =
                "5cm";

            break;

        case "10x5":

            container.style.width =
                "10cm";

            container.style.height =
                "5cm";

            break;

        default:

            container.style.width =
                "auto";

            container.style.height =
                "auto";

    }

}

// ======================
// LOG
// ======================

console.log(
    "barcode.js carregado!"
);