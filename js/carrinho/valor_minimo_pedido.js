add_on_load_all(() => {
    window.location.href.includes('https://www.penelopeescandalosa.com.br/checkout/cart?') ? aguardaElemento('span[data-bind="price: checkout.subtotal"]', verifica_valor_minimo_pedido_checkout) : null;
});

function verifica_valor_minimo_pedido_checkout(){

    console.log('verifica_valor_minimo_pedido_checkout() executado.');

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

    const aa = OBSERVADOR_MODIFICACOES.addItem(elementoTotal, valorminimo, parametros);
    console.log(aa);

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