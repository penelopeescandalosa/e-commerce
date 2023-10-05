//const url_carrinho = 'https://www.penelopeescandalosa.com.br/checkout';
///////////////////////////////////////////////////////////////////////



$( document ).ready(function() {

    inclui_arquivo_head('js', "https://images.tcdn.com.br/files/805466/themes/139/js/gerenciador_novo.js");

    /* if (window.location.href.includes(url_carrinho)) {
        inclui_arquivo_head('js', "https://images.tcdn.com.br/files/805466/themes/139/js/classes.js");
        inclui_arquivo_head('css', "https://images.tcdn.com.br/files/805466/themes/139/css/carrinho.css");
        inclui_arquivo_head('js', "https://images.tcdn.com.br/files/805466/themes/139/js/carrinho/carrinho.js");
        
        
        inclui_arquivo_head('js', "https://images.tcdn.com.br/files/805466/themes/139/js/carrinho/valor_minimo_pedido.js");
        inclui_arquivo_head('js', "https://images.tcdn.com.br/files/805466/themes/139/js/carrinho/modificacoes_checkout.js");
        inclui_arquivo_head('js', "https://images.tcdn.com.br/files/805466/themes/139/js/carrinho/pedido_finalizado.js");
        inclui_arquivo_head('css', "https://images.tcdn.com.br/files/805466/themes/139/css/pedido_finalizado.css");

    }else{
        console.log('Fora do checkout.');
    } */

        




});












async function verificaCarregamento(fn_load) {
    
    while (true) {

        const verifica_arquivo1 = (typeof arq_classes_load !== 'undefined' && arq_classes_load === true);

        if (verifica_arquivo1) {
            fn_load();
            break;
        }
        
        // Aguarda um tempo antes de verificar novamente
        await new Promise(resolve => setTimeout(resolve, 50));
    }
}


function inclui_arquivo_head(tipo, url){

    if(tipo == 'js'){
        $("head").append(   $("<script>").attr("src", url + "?" + rand())   );
    }else if(tipo == 'css'){
        $("head").append(   $("<link>").attr({"rel":"stylesheet", "href": url + "?" + rand()})   );
    }else{
        console.log('Não foi possível incluir no html o arquivo', url);
    }

    

}