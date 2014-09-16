$(document).ready(function () {
    seguranca.verificarAutorizacao();

    preencherNomeDoUsuarioLogado();
    atualizarQuantidadeDeTarefasPendentes();

    listarTarefas();

    $("#frmTarefa").submit(function(e) {
        formulario.bind();

        var tarefa = new dados.Tarefa(formulario.campos.txtDescricaoTarefa, false);

        var tarefaCadastrada = dados.cadastrarTarefa(tarefa);

        if (!tarefaCadastrada) {
            e.preventDefault();
            return false;
        }
        
        listarTarefas();

        return tarefaCadastrada;
    });

    $("input[type='checkbox']").click(function() {
        var descricao = $(this).find("+ span");
        var concluida = $(this).prop("checked");

        if ($(this).prop("checked")) {
            descricao.css("text-decoration", "line-through");
        }
        else {
            descricao.css("text-decoration", "none");
        }

        dados.atualizarTarefa(new dados.Tarefa(descricao.html(), concluida));
        atualizarQuantidadeDeTarefasPendentes();
    });

    $("a#sair").click(seguranca.limparAutorizacao);    
});

function preencherNomeDoUsuarioLogado() {
    $("#nomeDoUsuario").html($("#nomeDoUsuario").html() + seguranca.pegarUsuarioAutorizado().nome);
}

function listarTarefas() {
    var tarefas = dados.buscarTarefasPorUsuario();

    var listaDeTarefas = $("#listaDeTarefas");

    $("#listaDeTarefas li").remove();

    $.each(tarefas, function (chave, valor) {
        var checkbox = valor.concluida ? ' CHECKED ' : '';
        var tarefaConcluida = valor.concluida ? ' style="text-decoration: line-through" ' : '';
        var linha = '<li> <input id="check-' + chave + '" type="checkbox" ' + checkbox + ' />' + '<span' + tarefaConcluida + '> ' + valor.descricao + '</span> <li>';
        
        listaDeTarefas.append(linha);
    });
}

function atualizarQuantidadeDeTarefasPendentes() {
    var quantidadeDeTarefasPendentes = dados.buscarTarefasPendentesDoUsuario().length;    

    $("#tarefasPendentes").html(quantidadeDeTarefasPendentes);
}