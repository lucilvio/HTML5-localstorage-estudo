var usuario = {};

$(document).ready(function () {
    $("#frmLogin").submit(function (e) {
        bind("frmLogin");
        
        if (!loginPermitido(formulario.txtEmail, formulario.txtSenha)) {
            alert("Usuário ou senha inválido.");

            e.preventDefault();
            return false;
        }

        limparAutorizacao();
        autorizar(usuario);

        return true;
    });
});

function loginPermitido(email, senha) {
    var usuarioValidado = false;

    var usuarios = buscarUsuarios();
    
    if (usuarios != null) {
        $.each(usuarios, function(i, valor) {
            if (valor.email === email) {
                if (valor.senha === senha) {
                    usuarioValidado = true;
                    usuario = new Usuario(valor.nome, valor.email, valor.senha);
                }
            }
        });
    }
    
    return usuarioValidado;
}