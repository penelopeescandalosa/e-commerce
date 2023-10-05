$( document ).ready(function() {

    //novo_pageview('load page');
    var TIMEOUT_PAGEVIEW = setTimeout(() => novo_pageview('loadPage'), 100);

    $(window).on('popstate', function(event) {

        clearTimeout(TIMEOUT_PAGEVIEW);
        TIMEOUT_PAGEVIEW = setTimeout(() => novo_pageview('popstate'), 100);
        
    });
    
    $(window).on('hashchange', function() {
        
        clearTimeout(TIMEOUT_PAGEVIEW);
        TIMEOUT_PAGEVIEW = setTimeout(() => novo_pageview('hashchange'), 100);

    });
    
    //verifica se está dentro da página de um produto, e se esse produto tem variantes
    if($('#selectedVariant').length > 0){

        add_on_load_all(function(){

                //quando o loading esconde, a url já foi alterada e o pageview pode ser salvo
                OBSERVADOR_MODIFICACOES.addItem('#loading-product-container',function () {
                    
                        if($('#loading-product-container').attr('style') == 'display: none;'){

                            clearTimeout(TIMEOUT_PAGEVIEW);
                            TIMEOUT_PAGEVIEW = setTimeout(() => novo_pageview('varianteSelecionada'), 100);

                        }
                    
                }, {'config_observer':{ attributes: true }, 'attributes': ['style']});

        });
    }

});










function novo_pageview(evento=null){

    const dados = {
        'url': window.location.href,
        'acesso_loja': typeof ACESSO_LOJA_PAGEVIEW !== 'undefined' && ACESSO_LOJA_PAGEVIEW === true ? 1 : 0,
        'evento': evento
    }

    $.ajax({
        type: "POST",
        url: "https://www.penelopeescandalosa.com/pageviews/ajax/pageview.php",
        data: dados,
        success: sucesso,
        error: erro
    });

    function sucesso(resposta){
        if(resposta != 'sucesso'){
            console.error('## Não foi possível computar o pageview. ##');
            console.log(resposta);
        }
    }

    function erro(xhr){
        console.error('## Não foi possível computar o pageview. Erro Ajax. ##');
        console.error(xhr);
    }
}