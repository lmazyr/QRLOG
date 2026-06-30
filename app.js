// ======================================
// QR.LOG v4.0
// app.js
// ======================================

// ======================
// NAVEGAÇÃO
// ======================

function abrirTela(id) {

    const secoes =
        document.querySelectorAll("main section");

    secoes.forEach(sec => {

        sec.classList.remove("active");

    });

    const tela = $(id);

    if (tela) {

        tela.classList.add("active");

    } else {

        console.error(
            `Tela "${id}" não encontrada.`
        );

    }

}

// ======================
// MENU MOBILE
// ======================

function toggleMenu() {

    const menu =
        document.querySelector(".sidebar");

    if (!menu) return;

    menu.classList.toggle(
        "menu-open"
    );

}

// ======================
// MODAL DE IMPRESSÃO
// ======================

function abrirImpressao() {

    const modal =
        $("modalPrint");

    if (!modal) return;

    modal.style.display =
        "flex";

}

function fecharImpressao() {

    const modal =
        $("modalPrint");

    if (!modal) return;

    modal.style.display =
        "none";

}

// ======================
// FECHAR MODAL AO CLICAR FORA
// ======================

window.addEventListener(
    "click",
    function (event) {

        const modal =
            $("modalPrint");

        if (
            modal &&
            event.target === modal
        ) {

            fecharImpressao();

        }

    }
);

// ======================
// INICIALIZAÇÃO
// ======================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        abrirTela("home");

        console.log(
            "QR.LOG v4.0 iniciado com sucesso!"
        );

    }
);