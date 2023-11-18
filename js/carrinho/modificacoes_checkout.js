add_on_load_all(() => {
     window.location.hash != '#carrinho' ? aguardaElemento('#payment span:contains("Maquina de cartão (Motoboy)")', modificacoes_box_pagamento) : null;
});

function modificacoes_box_pagamento(){

     const parametros = {
          'childNodes'      : ['FORM'],
          'pause'           : true,
          'config_observer' : {
               childList: true, // Observar adições/remoções de elementos filhos
               subtree: true, // Observar mudanças em todo o subárvore do elemento
          }
     }
     
     
     const seletor_maquina = '#payment span:contains("Maquina de cartão (Motoboy)")';
     const seletor_dinheiro = '#payment span:contains("Dinheiro (Motoboy)")';
     const span_motoboy = '<small class="rotulo-motoboy">(Motoboy)</small>';

     const label_maquina = $(seletor_maquina).html();
     const label_dinheiro = $(seletor_dinheiro).html();

     $('#payment p:contains("Selecione uma forma de pagamento para finalizar seu pedido:")').text('Como você quer pagar?');//.css('display', 'none');
     $('h3[data-toggle="#facilitator"]').first().css('display', 'none');
  
    
    //essa função é executada toda vez que o elemento #payment tem um novo elemento FORM criado
    //Quando é necessário refazer a modificação, o observador é removido, a alteração é feita e o modificador é criado novamente
    function modifica_label_motoboy(){

          //remove o observer do elemento #payment se existir
          OBSERVADOR_MODIFICACOES.stopItem(id_observador);

          //abre o box pagamento
          const elem_box_pagamento = $('[data-toggle="#facilitator"]').first().parent();
          !elem_box_pagamento.hasClass('active') ? elem_box_pagamento.addClass('active selected') : null;

          //altera o texto (Motoboy) nos dois itens
          $(seletor_maquina).html( label_maquina.replace('(Motoboy)', span_motoboy) );
          $(seletor_dinheiro).html( label_dinheiro.replace('(Motoboy)', span_motoboy) );

          //adiciona novamente o observer do elemento #payment
          OBSERVADOR_MODIFICACOES.playItem(id_observador);
      
    }

    //faz a primeira chamada da fundção
    var id_observador = OBSERVADOR_MODIFICACOES.addItem($('#payment'), modifica_label_motoboy, parametros);
    modifica_label_motoboy();

}