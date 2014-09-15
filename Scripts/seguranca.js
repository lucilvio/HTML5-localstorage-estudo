var paginasLivreDeAutorizacao = ["/index.html", "/cadastro.html"];

var chaveSessaoAutorizacao = "_autorizacao";
var autorizacao = { usuario: {}, autorizado: false };

$(document).ready(function () {
    if (!paginaExigeAutorizacao())
        return;

    var sessaoAutorizado = sessionStorage.getItem(chaveSessaoAutorizacao);

    if (sessaoAutorizado == null)
        redirecionarParaLogin();

    autorizacao = JSON.parse(sessaoAutorizado);

    if (autorizacao.autorizado == false)
        redirecionarParaLogin();
});

function autorizar(usuario) {
    autorizacao.usuario = new Usuario(usuario.nome, usuario.email);
    autorizacao.autorizado = true;

    sessionStorage.setItem(chaveSessaoAutorizacao, JSON.stringify(autorizacao));
}

function limparAutorizacao() {
    sessionStorage.removeItem(chaveSessaoAutorizacao);
}

function pegarUsuarioAutorizado() {
    if (!autorizacao.autorizado)
        return null;

    return autorizacao.usuario;
}

function paginaExigeAutorizacao() {
    var pagina = window.location.pathname;

    if ($.inArray(pagina, paginasLivreDeAutorizacao) == -1)
        return true;

    return false;
}

function redirecionarParaLogin() {
    window.location.replace("index.html");
}