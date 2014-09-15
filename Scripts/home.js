$(document).ready(function() {
    recuperarNomeDoUsuarioLogado();
    atualizarQuantidadeDeTarefasPendentes();

    listarTarefas();

    $("#frmTarefa").submit(function(e) {
        bind();

        var tarefaCadastrada = cadastrarTarefa(formulario.txtDescricaoTarefa, false);

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

        atualizarTarefa(new Tarefa(descricao.html(), concluida));
        atualizarQuantidadeDeTarefasPendentes();
    });

    $("a#sair").click(limparAutorizacao);    
});

function recuperarNomeDoUsuarioLogado() {
    $("#nomeDoUsuario").html($("#nomeDoUsuario").html() + pegarUsuarioAutorizado().nome);
}

function listarTarefas() {
    var tarefas = buscarTarefasPorUsuario();

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
    var quantidadeDeTarefasPendentes = buscarTarefasPendentesDoUsuario().length;    

    $("#tarefasPendentes").html(quantidadeDeTarefasPendentes);
}