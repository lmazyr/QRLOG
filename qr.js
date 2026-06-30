// ======================================
// QR.LOG v4.0
// qr.js
// ======================================

// ======================
// QR SIMPLES
// ======================

function gerarQR() {

    const texto =
        $("textoQR")?.value.trim();

    if (campoVazio(texto)) {

        mostrarAlerta(
            "Digite um texto ou link."
        );

        return;

    }

    const qrContainer =
        $("qrcode");

    if (!qrContainer) return;

    limparElemento("qrcode");

    new QRCode(qrContainer, {

        text: texto,

        width: 220,

        height: 220,

        colorDark: "#000000",

        colorLight: "#FFFFFF",

        correctLevel:
            QRCode.CorrectLevel.H

    });

}

// ======================
// SALVAR QR SIMPLES
// ======================

function salvarQRPNG() {

    const imagem =
        document.querySelector(
            "#qrcode img"
        );

    const canvas =
        document.querySelector(
            "#qrcode canvas"
        );

    let origem = "";

    if (imagem) {

        origem = imagem.src;

    }

    else if (canvas) {

        origem =
            canvas.toDataURL(
                "image/png"
            );

    }

    if (!origem) {

        mostrarAlerta(
            "Gere um QR Code primeiro."
        );

        return;

    }

    baixarArquivo(
        "qrcode.png",
        origem
    );

}

// ======================
// QR COLABORADOR
// ======================

function gerarCracha() {

    const nome =
        $("nome")?.value.trim();

    const login =
        $("loginUser")?.value.trim();

    const senha =
        $("senha")?.value.trim();

    if (
        campoVazio(nome) ||
        campoVazio(login) ||
        campoVazio(senha)
    ) {

        mostrarAlerta(
            "Preencha todos os campos."
        );

        return;

    }

    $("nomeCard").innerText =
        nome;

    limparElemento(
        "qrLogin"
    );

    limparElemento(
        "qrSenha"
    );

    new QRCode(

        $("qrLogin"),

        {

            text: login,

            width: 80,

            height: 80,

            correctLevel:
                QRCode.CorrectLevel.H

        }

    );

    new QRCode(

        $("qrSenha"),

        {

            text: senha,

            width: 80,

            height: 80,

            correctLevel:
                QRCode.CorrectLevel.H

        }

    );

}

// ======================
// SALVAR CRACHÁ
// ======================

function salvarCrachaPNG() {

    const cracha =
        $("cardColaborador");

    if (!cracha) {

        mostrarAlerta(
            "Gere um crachá primeiro."
        );

        return;

    }

    salvarElementoPNG(

        "cardColaborador",

        "cracha.png"

    );

}

// ======================
// LIMPAR FORMULÁRIO
// ======================

function limparCracha() {

    $("nome").value = "";

    $("loginUser").value = "";

    $("senha").value = "";

    $("nomeCard").innerText = "";

    limparElemento(
        "qrLogin"
    );

    limparElemento(
        "qrSenha"
    );

}

// ======================
// IMPRESSÃO DO CRACHÁ
// ======================

function imprimirCracha() {

    const cracha =
        $("cardColaborador");

    if (!cracha) {

        mostrarAlerta(
            "Gere um crachá primeiro."
        );

        return;

    }

    cracha.classList.add(
        "print-area"
    );

    window.print();

    setTimeout(() => {

        cracha.classList.remove(
            "print-area"
        );

    }, 500);

}

// ======================
// LOG
// ======================

console.log(
    "qr.js carregado!"
);