jQuery( document ).ready(function() {
        jQuery("body").append(     jQuery("<script>").attr("src", "https://images.tcdn.com.br/files/805466/themes/139/js/gerenciador_novo.js?" + rand() )     );
});

//gera um numero randomico para contornar caches
function rand() {

    const agora = new Date();
    const timestamp = agora.getTime();

    // Gera um número aleatório entre 0 (inclusive) e 1 (exclusivo)
    const numeroAleatorio = Math.random();
    
    // Multiplica o número aleatório pelo número base para obter um valor no intervalo desejado
    const numeroFinal = timestamp * numeroAleatorio;
    
    // Arredonda o número para um inteiro, se necessário
    return Math.floor(numeroFinal);
}
