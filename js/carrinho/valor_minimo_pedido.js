function verifica_valor_minimo_pedido_checkout(){

    //valor mínimo que um pedido deve ter para o usuário conseguir fechar um pedido
    const VL_MINIMO_PEDIDO = 9.99;

    //elementoTotal será em mutationObserver, não pode ser um jquery
    var elementoTotal = $('span[data-bind="price: checkout.subtotal"]');

    //cria a faixa com a msg de valor minimo
    const faixa = $('<div id="mensagem_valor_minimo" class="d-none">PEDIDO MÍNIMO: R$'+(VL_MINIMO_PEDIDO+0.01)+',00 EM PRODUTOS</div>');
    
    //adiciona a faixa com a msg de valor minimo no DOM
    $('main[class="container"]').before( faixa );

    const botoes_next_step = $(".btn-next-step").not(":contains('produtos')");

    const parametros = {
        'childNodes' : ['#text'],
        'config_observer' : {
             childList: true, // Observar adições/remoções de elementos filhos
             //subtree: true, // Observar mudanças em todo o subárvore do elemento
        }
    }

    OBSERVADOR_MODIFICACOES.addItem(elementoTotal, valorminimo, parametros);

    //faz a primeira chamada da função que verifica o valor 
    valorminimo();

    function valorminimo(){
        
        const total = parseFloat( elementoTotal.text().replace("R$ ", "").replace(",", ".") );
        
        if(total < VL_MINIMO_PEDIDO){

            faixa.removeClass('d-none').addClass('animacao_mensagem_valor_minimo');
            botoes_next_step.addClass('btn-off');
            
        } else {

            faixa.removeClass('animacao_mensagem_valor_minimo').addClass('d-none');
            botoes_next_step.removeClass('btn-off');
        }
    }

}




/*
function verifica_valor_minimo_pedido_checkout(){

    //valor mínimo que um pedido deve ter para o usuário conseguir fechar um pedido
    const VL_MINIMO_PEDIDO = 9.99;

    //elementoTotal será em mutationObserver, não pode ser um jquery
    var elementoTotal = document.querySelector('strong[class="ch-cart-total-price"]');

    //adiciona a faixa com a msg de valor minimo
    $('main[class="container"]').before( '<div id="mensagem_valor_minimo" style="display:none;">PEDIDO MÍNIMO: R$'+(VL_MINIMO_PEDIDO+0.01)+',00 EM PRODUTOS</div>' );

    //faz a primeira chamada da função que verifica o valor 
    valorminimo();

    function valorminimo(){
        
        const total = parseFloat( $(elementoTotal).text().replace("R$ ", "").replace(",", ".") );
        
        if(total < VL_MINIMO_PEDIDO){
            $(".btn-next-step").not(":contains('produtos')").attr('style', 'pointer-events: none; cursor: default; opacity: 0.4;');
            $('#mensagem_valor_minimo').attr('style', 'display:block!important; animation-name:abre-msg; animation-duration: 2s; animation-fill-mode: forwards;');
        } else {
            $('.btn-next-step').attr('style', 'pointer-events: ; cursor: ; opacity: 1;');
            $('#mensagem_valor_minimo').attr('style', 'display:none');
        }
    }
    
    var observador_frete = new MutationObserver(valorminimo);
    observador_frete.observe(elementoTotal, { childList: true });

}
*/