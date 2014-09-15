var chaveUsuarios = "_usuarios";

var Usuario = function (nome, email, senha) {
    this.nome = nome;
    this.email = email;
    this.senha = senha;
};

function buscarUsuarios() {
    var usuario = localStorage.getItem(chaveUsuarios);
    return usuario != null ? JSON.parse(usuario) : new Array();
}

function cadastrarUsuario(nome, email, senha) {
    var usuario = new Usuario(nome, email, senha);

    var usuarios = buscarUsuarios();

    if (usuarioJaExiste(usuario, usuarios)) {
        alert("Já existe um usuário cadastrado com o e-mail informado");
        return false;
    }

    usuarios.push(usuario);

    localStorage.setItem(chaveUsuarios, JSON.stringify(usuarios));

    return true;
}

function usuarioJaExiste(usuario, usuarios) {
    var usuarioEncontrado = $.grep(usuarios, function(item, indice) {
        return item.email.trim() === usuario.email.trim();
    });

    return usuarioEncontrado.length > 0;
}