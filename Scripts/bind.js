var formulario = {};

function bind(nomeDoFormulario) {
    var campos = nomeDoFormulario == "" || nomeDoFormulario == null ? $("input") : $("#" + nomeDoFormulario + " input");

    $.each(campos, function () {
        var nomeDoCampo = $(this).attr("id");
        var valorDoCampo = $(this).val();

        formulario[nomeDoCampo] = valorDoCampo;
    });
}