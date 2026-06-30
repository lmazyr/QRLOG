function abrirTela(id){

    document
        .querySelectorAll("section")
        .forEach(sec => sec.classList.remove("active"));

    document
        .getElementById(id)
        .classList.add("active");

}


function gerarQR(){

    const texto =
        document.getElementById("textoQR").value;

    const qr =
        document.getElementById("qrcode");

    qr.innerHTML = "";

    new QRCode(qr,{
        text:texto,
        width:220,
        height:220
    });

}


function gerarCracha(){

    const nome =
        document.getElementById("nome").value;

    const login =
        document.getElementById("loginUser").value;

    const senha =
        document.getElementById("senha").value;


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
            text:login,
            width:80,
            height:80
        }
    );


    new QRCode(
        document.getElementById("qrSenha"),
        {
            text:senha,
            width:80,
            height:80
        }
    );

}


function gerarBarra(){

    const texto =
        document.getElementById("textoBarra").value;

    JsBarcode(
        "#barcode",
        texto,
        {
            format:"CODE128",
            displayValue:true,
            lineColor:"#000",
            width:2,
            height:80
        }
    );

}