//resolve o problema dentro das paginas dos produtos que não da para acessar o jQuery pelo $
(typeof $.fn == 'undefined') ? $ = jQuery.noConflict() : null;


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$( document ).ready(function() {
    //$("body").append(     $("<script>").attr("src", "https://images.tcdn.com.br/files/805466/themes/143/js/gerenciador_novo.js?" + rand() )     );//sem cache
    $("body").append(     $("<script>").attr("src", "https://cdn.jsdelivr.net/gh/penelopeescandalosa/e-commerce@9110652/js/gerenciador_novo.js" )     );//com cache
});

//gera um numero randomico para contornar caches
function rand() {
    const agora = new Date();
    return Math.floor(agora.getTime() * Math.random());
}