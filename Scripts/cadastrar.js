$(document).ready(function () {
    $("#frmCadastro").submit(function (e) {
        bind("frmCadastro");

        if (!senhasConferem(formulario.txtSenha, formulario.txtConfirmarSenha))
        {
            alert("As senhas não conferem.");
            e.preventDefault();

            return false;
        }

        var usuarioCadastrado = cadastrarUsuario(formulario.txtNome, formulario.txtEmail, formulario.txtSenha);

        return usuarioCadastrado;
    });
});

function senhasConferem(senha, senhaDeConfirmacao) {
    return senha === senhaDeConfirmacao ? true : false;
}