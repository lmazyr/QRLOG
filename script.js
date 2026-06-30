// ======================
// NAVEGAÇÃO
// ======================

function abrirTela(id) {

    document
        .querySelectorAll("section")
        .forEach(sec => sec.classList.remove("active"));

    document
        .getElementById(id)
        .classList.add("active");

}

// ======================
// QR SIMPLES
// ======================

function gerarQR() {

    const texto =
        document.getElementById("textoQR").value;

    if (!texto) {
        alert("Digite um texto ou link.");
        return;
    }

    const qr =
        document.getElementById("qrcode");

    qr.innerHTML = "";

    new QRCode(qr, {
        text: texto,
        width: 220,
        height: 220
    });

}

// ======================
// QR COLABORADOR
// ======================

function gerarCracha() {

    const nome =
        document.getElementById("nome").value;

    const login =
        document.getElementById("loginUser").value;

    const senha =
        document.getElementById("senha").value;

    if (!nome || !login || !senha) {

        alert("Preencha todos os campos.");

        return;

    }

    document
        .getElementById("nomeCard")
        .innerText = nome;

    document
        .getElementById("qrLogin")
        .innerHTML = "";

    document
        .getElementById("qrSenha")
        .innerHTML = "";

    new QRCode(
        document.getElementById("qrLogin"),
        {
            text: login,
            width: 80,
            height: 80
        }
    );

    new QRCode(
        document.getElementById("qrSenha"),
        {
            text: senha,
            width: 80,
            height: 80
        }
    );

}

// ======================
// CÓDIGO DE BARRAS
// ======================

function gerarBarra() {

    const texto =
        document.getElementById("textoBarra").value;

    if (!texto) {

        alert("Digite um código.");

        return;

    }

    JsBarcode(
        "#barcode",
        texto,
        {
            format: "CODE128",
            lineColor: "#000",
            width: 3,
            height: 90,
            displayValue: true
        }
    );

}

// ======================
// MODAL DE IMPRESSÃO
// ======================

function abrirImpressao() {

    document
        .getElementById("modalPrint")
        .style.display = "flex";

}

function fecharImpressao() {

    document
        .getElementById("modalPrint")
        .style.display = "none";

}

// ======================
// EXPORTAR PNG
// ======================

function salvarQRPNG() {

    const img =
        document.querySelector("#qrcode img");

    if (!img) {

        alert("Gere um QR primeiro.");

        return;

    }

    const link =
        document.createElement("a");

    link.href = img.src;

    link.download = "qrcode.png";

    link.click();

}

function salvarBarraPNG() {

    const svg =
        document.getElementById("barcode");

    const data =
        new XMLSerializer()
        .serializeToString(svg);

    const canvas =
        document.createElement("canvas");

    const ctx =
        canvas.getContext("2d");

    const img =
        new Image();

    img.onload = function () {

        canvas.width = img.width;

        canvas.height = img.height;

        ctx.drawImage(img, 0, 0);

        const link =
            document.createElement("a");

        link.download =
            "codigo_barras.png";

        link.href =
            canvas.toDataURL();

        link.click();

    };

    img.src =
        "data:image/svg+xml;base64," +
        btoa(data);

}

// ======================
// PDF
// ======================

function exportarPDF() {

    window.print();

}

// ======================
// IMPORTAR EXCEL
// ======================

document
    .getElementById("arquivoExcel")
    ?.addEventListener(
        "change",
        importarExcel
    );

function importarExcel(e) {

    const arquivo =
        e.target.files[0];

    if (!arquivo) return;

    const leitor =
        new FileReader();

    leitor.onload = function (evt) {

        const dados =
            new Uint8Array(
                evt.target.result
            );

        const workbook =
            XLSX.read(
                dados,
                {
                    type: "array"
                }
            );

        const aba =
            workbook.Sheets[
                workbook.SheetNames[0]
            ];

        const json =
            XLSX.utils.sheet_to_json(aba);

        console.table(json);

        alert(
            `${json.length} registros importados!`
        );

        // FUTURO:
        // gerar crachás automaticamente
        // gerar etiquetas
        // exportar PDF em lote

    };

    leitor.readAsArrayBuffer(arquivo);

}

// ======================
// PERMISSÕES
// ======================

const permissoes = {

    imprimir: true,

    importarExcel: true,

    excluirHistorico: false,

    criarModelos: true

};

function verificarPermissao(tipo) {

    if (!permissoes[tipo]) {

        alert(
            "Você não possui permissão."
        );

        return false;

    }

    return true;

}

// ======================
// HISTÓRICO LOCAL
// ======================

function salvarHistorico(tipo, valor) {

    let historico =
        JSON.parse(
            localStorage.getItem(
                "qrlog_historico"
            )
        ) || [];

    historico.push({

        tipo,

        valor,

        data:
            new Date()
            .toLocaleString()

    });

    localStorage.setItem(
        "qrlog_historico",
        JSON.stringify(historico)
    );

}

// ======================
// IMPRESSÃO FUTURA
// ======================

const formatosImpressao = {

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

    "a4": {
        largura: "21cm",
        altura: "29.7cm"
    }

};

// ======================
// INICIALIZAÇÃO
// ======================

console.log("QR.LOG iniciado com sucesso!");