// =====================================
// QR.LOG v4.1
// SCRIPT PRINCIPAL
// =====================================

console.log("QR.LOG iniciado!");

// =====================================
// FUNÇÕES AUXILIARES
// =====================================

function $(id) {
    return document.getElementById(id);
}

function alerta(msg) {
    alert(msg);
}

function vazio(valor) {
    return !valor || valor.trim() === "";
}

function limpar(id) {

    const elemento = $(id);

    if (elemento) {
        elemento.innerHTML = "";
    }

}

function baixarArquivo(nome, url) {

    const link = document.createElement("a");

    link.href = url;
    link.download = nome;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

}

// =====================================
// NAVEGAÇÃO
// =====================================

function abrirTela(id) {

    document
        .querySelectorAll("section")
        .forEach(sec => sec.classList.remove("active"));

    const tela = $(id);

    if (tela) {
        tela.classList.add("active");
    }

}

// =====================================
// QR CODE SIMPLES
// =====================================

function gerarQR() {

    const texto = $("textoQR").value.trim();

    if (vazio(texto)) {

        alerta("Digite um texto ou link.");

        return;

    }

    limpar("qrcode");

    new QRCode($("qrcode"), {

        text: texto,

        width: 220,

        height: 220

    });

}

async function salvarQRPNG() {

    const elemento = $("qrcode");

    if (!elemento.innerHTML) {

        alerta("Gere um QR primeiro.");

        return;

    }

    const canvas = await html2canvas(elemento);

    baixarArquivo(
        "qrcode.png",
        canvas.toDataURL("image/png")
    );

}

function imprimirQR() {

    const qr = $("qrcode");

    if (!qr.innerHTML) {

        alerta("Gere um QR primeiro.");

        return;

    }

    qr.classList.add("print-area");

    window.print();

    setTimeout(() => {

        qr.classList.remove("print-area");

    }, 500);

}

// =====================================
// CRACHÁ DE COLABORADOR
// =====================================

function gerarCracha() {

    const nome =
        $("nome").value.trim();

    const login =
        $("loginUser").value.trim();

    const senha =
        $("senha").value.trim();

    if (
        vazio(nome) ||
        vazio(login) ||
        vazio(senha)
    ) {

        alerta(
            "Preencha todos os campos."
        );

        return;

    }

    $("nomeCard").innerText = nome;

    limpar("qrLogin");
    limpar("qrSenha");

    new QRCode($("qrLogin"), {

        text: login,

        width: 80,

        height: 80

    });

    new QRCode($("qrSenha"), {

        text: senha,

        width: 80,

        height: 80

    });

}

async function salvarCrachaPNG() {

    const cracha =
        $("cardColaborador");

    const canvas =
        await html2canvas(cracha, {

            backgroundColor: "#FFFFFF",

            scale: 3

        });

    baixarArquivo(
        "cracha.png",
        canvas.toDataURL("image/png")
    );

}

function imprimirCracha() {

    $("cardColaborador")
        .classList
        .add("print-area");

    window.print();

    setTimeout(() => {

        $("cardColaborador")
            .classList
            .remove("print-area");

    }, 500);

}

function limparCracha() {

    $("nome").value = "";
    $("loginUser").value = "";
    $("senha").value = "";

    $("nomeCard").innerText = "";

    limpar("qrLogin");
    limpar("qrSenha");

}

// =====================================
// CÓDIGO DE BARRAS
// =====================================

function gerarBarra() {

    const texto =
        $("textoBarra")
        .value
        .trim();

    if (vazio(texto)) {

        alerta(
            "Digite um código."
        );

        return;

    }

    JsBarcode(
        "#barcode",
        texto,
        {

            format: "CODE128",

            lineColor: "#000",

            width: 4,

            height: 120,

            fontSize: 20,

            margin: 15,

            displayValue: true

        }
    );

}

function salvarBarraPNG() {

    const svg =
        $("barcode");

    if (!svg.innerHTML) {

        alerta(
            "Gere um código primeiro."
        );

        return;

    }

    const dados =
        new XMLSerializer()
        .serializeToString(svg);

    const blob =
        new Blob(
            [dados],
            {
                type: "image/svg+xml"
            }
        );

    const url =
        URL.createObjectURL(blob);

    const img =
        new Image();

    img.onload = function () {

        const canvas =
            document.createElement("canvas");

        canvas.width =
            img.width;

        canvas.height =
            img.height;

        const ctx =
            canvas.getContext("2d");

        ctx.fillStyle =
            "#FFFFFF";

        ctx.fillRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

        ctx.drawImage(
            img,
            0,
            0
        );

        baixarArquivo(
            "codigo-barras.png",
            canvas.toDataURL("image/png")
        );

        URL.revokeObjectURL(url);

    };

    img.src = url;

}

function imprimirCodigoBarras() {

    const container =
        document.querySelector(
            ".barcode-container"
        );

    if (
        !$("barcode").innerHTML
    ) {

        alerta(
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

function limparBarra() {

    $("textoBarra").value = "";

    $("barcode").innerHTML = "";

}

// =====================================
// IMPRESSÃO (MODAL)
// =====================================

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
