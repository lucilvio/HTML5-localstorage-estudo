var chaveTarefas = "_tarefas";

var Tarefa = function (descricao, concluida) {
    this.descricao = descricao;
    this.concluida = concluida;
};

function buscarTarefas() {
    var tarefas = localStorage.getItem(chaveTarefas);
    return tarefas != null ? JSON.parse(tarefas) : new Array();
}

function cadastrarTarefa(descricao, concluida) {
    var tarefa = new Tarefa(descricao, concluida);

    var tarefas = buscarTarefas();

    tarefas.push(tarefa);

    localStorage.setItem(chaveTarefas, JSON.stringify(tarefas));
}

function atualizarTarefa(tarefa) {
    var tarefas = buscarTarefas();

    var indiceDaTarefa = -1;

    $.each(tarefas, function(indice, item) {
        if (item.descricao.trim() === tarefa.descricao.trim()) {
            indiceDaTarefa = indice;
            return;
        }
    });

    if (indiceDaTarefa < 0)
        return;

    tarefas[indiceDaTarefa].concluida = tarefa.concluida;

    localStorage.setItem(chaveTarefas, JSON.stringify(tarefas));
}