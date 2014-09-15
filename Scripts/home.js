$(document).ready(function() {
    recuperarNomeDoUsuarioLogado();

    listarTarefas();

    $("#adicionarTarefa").click(function() {
        bind();

        cadastrarTarefa(formulario.txtDescricaoTarefa, false);

        formulario.txtDescricaoTarefa = "";

        listarTarefas();
    });

    $("input[type='checkbox']").click(function() {
        var descricao = $(this).find("+ span").html();
        var concluida = $(this).prop("checked");

        if ($(this).prop("checked")) {
            $(this).find("+ span").css("text-decoration", "line-through");
        }
        else {
            $(this).find("+ span").css("text-decoration", "none");
        }

        atualizarTarefa(new Tarefa(descricao, concluida));
    });

    $("a#sair").click(sair);    
});

function recuperarNomeDoUsuarioLogado() {
    $("#nomeDoUsuario").html($("#nomeDoUsuario").html() + pegarUsuarioAutorizado().nome);
}

function listarTarefas() {
    var tarefas = buscarTarefas();

    var listaDeTarefas = $("#listaDeTarefas");

    $("#listaDeTarefas li").remove();

    $.each(tarefas, function (chave, valor) {
        var checkbox = valor.concluida ? ' CHECKED ' : '';
        var tarefaConcluida = valor.concluida ? ' style="text-decoration: line-through" ' : '';
        var linha = '<li> <input id="check-' + chave + '" type="checkbox" ' + checkbox + ' />' + '<span' + tarefaConcluida + '> ' + valor.descricao + '</span> <li>';
        
        listaDeTarefas.append(linha);
    });
}

function sair() {
    limparAutorizacao();
}