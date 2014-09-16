(function(dados, $, undefined) {
    var chaveTarefas = "_tarefas";
    
    dados.Tarefa = function (descricao, concluida) {
        this.descricao = descricao;
        this.concluida = concluida;
        this.usuario = seguranca.pegarUsuarioAutorizado();
    };
    
    dados.buscarTarefas = function() {
        var tarefas = localStorage.getItem(chaveTarefas);

        return tarefas != null ? JSON.parse(tarefas) : new Array();
    };

    dados.buscarTarefasPorUsuario = function() {
        var tarefas = localStorage.getItem(chaveTarefas);

        if (tarefas == null)
            return new Array();

        var usuario = seguranca.pegarUsuarioAutorizado();

        if (!usuario)
            return [];

        return $.grep(JSON.parse(tarefas), function(item) {
            return item.usuario.email === usuario.email;
        });
    };

    dados.buscarTarefasPendentesDoUsuario = function() {
        var tarefasDoUsuario = dados.buscarTarefasPorUsuario();

        return $.grep(tarefasDoUsuario, function(item) {
            return item.concluida == false;
        });
    };

    dados.cadastrarTarefa = function(novaTarefa) {
        var tarefa = novaTarefa;

        var tarefas = dados.buscarTarefas();

        if (tarefaJaExiste(tarefa, tarefas)) {
            alert("Já existe uma tarefa com a mesma descrição.");
            return false;
        }

        tarefas.push(tarefa);

        localStorage.setItem(chaveTarefas, JSON.stringify(tarefas));

        return true;
    };

    dados.atualizarTarefa = function(tarefa) {
        var tarefas = dados.buscarTarefas();

        var indiceDaTarefa = -1;

        var usuario = seguranca.pegarUsuarioAutorizado();
        
        $.each(tarefas, function(indice, item) {
            if (item.descricao.trim() === tarefa.descricao.trim() && item.usuario.email === usuario.email) {
                indiceDaTarefa = indice;
                return;
            }
        });

        if (indiceDaTarefa < 0)
            return;

        tarefas[indiceDaTarefa].concluida = tarefa.concluida;

        localStorage.setItem(chaveTarefas, JSON.stringify(tarefas));
    };

    function tarefaJaExiste(tarefa, tarefas) {
        var usuario = seguranca.pegarUsuarioAutorizado();

        var tarefaEncontrada = $.grep(tarefas, function (item) {
            return item.descricao.trim() === tarefa.descricao.trim() && item.usuario.email === usuario.email;
        });

        return tarefaEncontrada.length > 0;
    }    
}(window.dados = window.dados || {}, jQuery));