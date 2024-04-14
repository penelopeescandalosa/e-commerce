typeof FRASES == 'undefined' ? FRASES = [ 'FRETE GRÁTIS P/ MURIAÉ ACIMA DE DE R$99', 'DESCONTO APLICADO NO CARRINHO AUTOMATICAMENTE!' ] : null;

var DELAY_FITA = 4000;


var fita = $("<div><span></span></div>").addClass('fita_topo').html('<span>'+FRASES[0]+'</span>');
$('.header').before(fita);

fita.css('height','0px').animate({height: '25px'}, 350).animate({height: '20px'}, 250);

var FRASE_ATUAL_ID = 0;
setInterval(troca_frase, DELAY_FITA);

function troca_frase(){

      //verifica se a janela está ativa
      if(document.hidden){
      return; 
      }

      FRASE_ATUAL_ID < FRASES.length-1 ? FRASE_ATUAL_ID++ : FRASE_ATUAL_ID = 0;

      fita.animate({'height': '30px'}, 250).animate({'height': '20px'}, 250);

      fita.find('span').fadeTo(250, 0, function(){
      $(this).html(FRASES[FRASE_ATUAL_ID]).fadeTo(750,1);
      });

}