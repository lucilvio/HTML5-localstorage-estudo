var Usuario = function(nome, email, senha) {
    this.nome = nome;
    this.email = email;
    this.senha = senha;
};

function buscarUsuarios() {
    var usuario = localStorage.getItem("usuarios");
    return usuario != null ? JSON.parse(usuario) : new Array();
}

function cadastrarUsuario(nome, email, senha) {
    var usuario = new Usuario(nome, email, senha);
    var usuarios = [];

    var usuariosRecuperados = localStorage.getItem("usuarios");
    
    if (usuariosRecuperados != null) {
        usuarios = JSON.parse(usuariosRecuperados);
    }

    usuarios.push(usuario);

    localStorage.setItem("usuarios", JSON.stringify(usuarios));
}