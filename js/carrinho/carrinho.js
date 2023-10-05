add_on_load_all(function(){
    
    //console.log('add_on_load_all() no carrinho.js executado!');

    OBSERVADOR.add('h2[class="order-id"]', finalizado);
    //OBSERVADOR.add('strong[class="ch-cart-total-price"]', verifica_valor_minimo_pedido_checkout);
    //OBSERVADOR.add('h3[data-toggle="#facilitator"]', modificacoes_box_pagamento);
    //OBSERVADOR.add('#payment', modificacoes_box_pagamento);

});



/* async function verificaCarregamento(fn_load) {
    
    while (true) {

        const verifica_arquivo1 = (typeof arq_classes_load !== 'undefined' && arq_classes_load === true);//classes
        const verifica_arquivo2 = (typeof arq_pedido_finalizado_load !== 'undefined' && arq_pedido_finalizado_load === true);//pedidos finalizados
        const verifica_arquivo3 = (typeof arq_valor_minimo_pedido_load !== 'undefined' && arq_valor_minimo_pedido_load === true);//valor minimo para pedidos no checkout

        if (verifica_arquivo1 && verifica_arquivo2 && verifica_arquivo3) {
            fn_load();
            break;
        }

        console.log('carregando...');
        
        // Aguarda um tempo antes de verificar novamente
        await new Promise(resolve => setTimeout(resolve, 50));
    }
} */



function finalizado(){

    pedido_finalizado();

}