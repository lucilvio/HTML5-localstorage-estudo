$(document).ready(function () {
    $("#frmCadastro").submit(function (e) {
        bind("frmCadastro");

        if (!senhasConferem(formulario.txtSenha, formulario.txtConfirmarSenha))
        {
            alert("As senhas não conferem.");
            e.preventDefault();

            return false;
        }

        cadastrarUsuario(formulario.txtNome, formulario.txtEmail, formulario.txtSenha);

        return true;
    });
});

function senhasConferem(senha, senhaDeConfirmacao) {
    return senha === senhaDeConfirmacao ? true : false;
}