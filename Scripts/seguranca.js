(function(seguranca, $, undefined) {
    var paginasLivreDeAutorizacao = ["/index.html", "/cadastro.html"];

    var chaveSessaoAutorizacao = "_autorizacao";
    var autorizacao = { usuario: {}, autorizado: false };

    seguranca.verificarAutorizacao = function () {
        if (!paginaExigeAutorizacao())
            return;

        var sessaoAutorizado = sessionStorage.getItem(chaveSessaoAutorizacao);

        if (sessaoAutorizado == null)
            redirecionarParaLogin();

        autorizacao = JSON.parse(sessaoAutorizado);

        if (autorizacao.autorizado == false)
            redirecionarParaLogin();
    };

    seguranca.autorizar = function (usuario) {
        autorizacao.usuario = new dados.Usuario(usuario.nome, usuario.email);
        autorizacao.autorizado = true;

        sessionStorage.setItem(chaveSessaoAutorizacao, JSON.stringify(autorizacao));
    };

    seguranca.limparAutorizacao = function () {
        sessionStorage.removeItem(chaveSessaoAutorizacao);
    };

    seguranca.pegarUsuarioAutorizado = function () {
        if (!autorizacao.autorizado)
            return null;

        return autorizacao.usuario;
    };

    function paginaExigeAutorizacao() {
        var pagina = window.location.pathname;

        if ($.inArray(pagina, paginasLivreDeAutorizacao) == -1)
            return true;

        return false;
    }

    function redirecionarParaLogin() {
        window.location.replace("index.html");
    }
}(window.seguranca = window.seguranca || {}, jQuery));