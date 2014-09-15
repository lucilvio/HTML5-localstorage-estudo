var chaveTarefas = "_tarefas";

var Tarefa = function (descricao, concluida) {
    this.descricao = descricao;
    this.concluida = concluida;
    this.usuario = pegarUsuarioAutorizado();
};

function buscarTarefas() {
    var tarefas = localStorage.getItem(chaveTarefas);

    return tarefas != null ? JSON.parse(tarefas) : new Array();
}

function buscarTarefasPorUsuario() {
    var tarefas = localStorage.getItem(chaveTarefas);

    if (tarefas == null)
        return new Array();

    return $.grep(JSON.parse(tarefas), function (item) {
        return item.usuario.email === pegarUsuarioAutorizado().email;
    });    
}

function buscarTarefasPendentesDoUsuario() {
    var tarefasDoUsuario = buscarTarefasPorUsuario();

    return $.grep(tarefasDoUsuario, function(item) {
        return item.concluida == false;
    });
}

function cadastrarTarefa(descricao, concluida) {
    var tarefa = new Tarefa(descricao, concluida);

    var tarefas = buscarTarefas();

    if (tarefaJaExiste(tarefa, tarefas)) {
        alert("Já existe uma tarefa com a mesma descrição.");
        return false;
    }

    tarefas.push(tarefa);

    localStorage.setItem(chaveTarefas, JSON.stringify(tarefas));

    return true;
}

function atualizarTarefa(tarefa) {
    var tarefas = buscarTarefas();

    var indiceDaTarefa = -1;

    $.each(tarefas, function(indice, item) {
        if (item.descricao.trim() === tarefa.descricao.trim() && item.usuario.email === pegarUsuarioAutorizado().email) {
            indiceDaTarefa = indice;
            return;
        }
    });

    if (indiceDaTarefa < 0)
        return;

    tarefas[indiceDaTarefa].concluida = tarefa.concluida;

    localStorage.setItem(chaveTarefas, JSON.stringify(tarefas));
}

function tarefaJaExiste(tarefa, tarefas) {
    var tarefaEncontrada = $.grep(tarefas, function (item) {
        return item.descricao.trim() === tarefa.descricao.trim() && item.usuario.email === pegarUsuarioAutorizado().email;
    });

    return tarefaEncontrada.length > 0;
}