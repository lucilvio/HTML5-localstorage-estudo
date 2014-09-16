(function(dados, $, undefined) {
    var chaveUsuarios = "_usuarios";
    
    dados.Usuario = function (nome, email, senha) {
        this.nome = nome;
        this.email = email;
        this.senha = senha;
    };

    dados.buscarUsuarios = function() {
        var usuario = localStorage.getItem(chaveUsuarios);
        return usuario != null ? JSON.parse(usuario) : new Array();
    };

    dados.cadastrarUsuario = function(novoUsuario) {
        var usuario = novoUsuario;

        var usuarios = dados.buscarUsuarios();

        if (usuarioJaExiste(usuario, usuarios)) {
            alert("Já existe um usuário cadastrado com o e-mail informado");
            return false;
        }

        usuarios.push(usuario);

        localStorage.setItem(chaveUsuarios, JSON.stringify(usuarios));

        return true;
    };

    function usuarioJaExiste(usuario, usuarios) {
        var usuarioEncontrado = $.grep(usuarios, function (item) {
            return item.email.trim() === usuario.email.trim();
        });

        return usuarioEncontrado.length > 0;
    }
}(window.dados = window.dados || {}, jQuery));





