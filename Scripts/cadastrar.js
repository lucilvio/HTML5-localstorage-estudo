$(document).ready(function () {
    $("#frmCadastro").submit(function (e) {
        formulario.bind("frmCadastro");

        var usuario = new dados.Usuario(formulario.campos.txtNome, formulario.campos.txtEmail, formulario.campos.txtSenha);

        if (!senhasConferem(usuario.senha, formulario.campos.txtConfirmarSenha))
        {
            alert("As senhas não conferem.");
            e.preventDefault();

            return false;
        }

        var usuarioCadastrado = dados.cadastrarUsuario(usuario);

        return usuarioCadastrado;
    });

    $("#voltar").click(function() {
        history.back(1);
    });
});

function senhasConferem(senha, senhaDeConfirmacao) {
    return senha === senhaDeConfirmacao ? true : false;
}