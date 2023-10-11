//resolve o problema dentro das paginas dos produtos que não da para acessar o jQuery pelo $
var $ = jQuery.noConflict();


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//url base dos arquivos/////////////////////////////////////////////////////////////////////////////////////////////
const URL_RAIZ = 'https://cdn.jsdelivr.net/gh/penelopeescandalosa/e-commerce@a28c604/';// JSDELIVR
//const URL_RAIZ = 'https://images.tcdn.com.br/files/805466/themes/143/';// TRAY

$( document ).ready(function() {

    //evita alguns erros específicos que estão substituindo o $
    $ = jQuery.noConflict();

    //inclui o gerenciador no DOM
    $("body").append(
        $("<script>").attr("src", URL_RAIZ + "js/gerenciador.js" /* + "?" + rand() */ )
    );
});

//gera um numero randomico para contornar caches
function rand() {
    return Math.floor(( new Date() ).getTime() * Math.random());
}