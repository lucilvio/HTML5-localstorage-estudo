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

    usuarios.push(usuario);

    localStorage.setItem(chaveUsuarios, JSON.stringify(usuarios));
}