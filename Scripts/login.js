var usuario = {};

$(document).ready(function () {
    $("#frmLogin").submit(function (e) {
        formulario.bind("frmLogin");
        
        if (!loginPermitido(formulario.campos.txtEmail, formulario.campos.txtSenha)) {
            alert("Usuário ou senha inválido.");

            e.preventDefault();
            return false;
        }

        seguranca.limparAutorizacao();
        seguranca.autorizar(usuario);

        return true;
    });
});

function loginPermitido(email, senha) {
    var usuarioValidado = false;

    var usuarios = dados.buscarUsuarios();
    
    if (usuarios != null) {
        $.each(usuarios, function(i, valor) {
            if (valor.email === email) {
                if (valor.senha === senha) {
                    usuarioValidado = true;
                    usuario = new dados.Usuario(valor.nome, valor.email, valor.senha);
                }
            }
        });
    }
    
    return usuarioValidado;
}