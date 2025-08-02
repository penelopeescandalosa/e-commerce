///////////////////////////////////////////////////////////////////////////////////////////////
//VARIAVEIS DE CONFUGURACAO
var DELAY_FITA = 4000;
//const URL_SALDAO = 'https://www.penelopeescandalosa.com.br/loja/busca.php?order=4&nocache=' + Math.floor(( new Date() ).getTime() * Math.random());
const URL_SALDAO = 'https://www.penelopeescandalosa.com.br/loja/busca.php?order=5&nocache=' + Math.floor(( new Date() ).getTime() * Math.random());

typeof FRASES == 'undefined' ? FRASES = [ 'VEM PRO SALDÃO PENELOPE ESCANDALOSA!', 'DIVERSOS PRODUTOS COM SUPER DESCONTO' ] : null;
typeof NOME_SALDAO == 'undefined' ? NOME_SALDAO = 'SALDÃO' : null;

///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////// ALTERAÇÕES LAYOUT ////////////////////////////////////////////////

//##ALTERAR ORDEM DE AMOSTRAGEM DOS PRODUTOS NOS LINKS 'TODOS OS PRODUTOS DE LANÇAMENTO PARA DESTAQUES##
$('a[href="/loja/busca.php?order=5"]').attr('href',URL_SALDAO);
//
//
//ATIVAR QUANDO QUISER QUE A ABA OUTLET ABRA TODOS OS PROSUTOS COM O SALDÃO CONFIGURADO.
$('a[href="https://www.penelopeescandalosa.com.br/promocao"]').attr('href',URL_SALDAO);


$('.featured:contains("Destaque"), .featured:contains("DESTAQUE")').text(NOME_SALDAO).css('background-color', '#000').css('border','none').css('font-weight',600);

//TROCA TITULO 'DESTAQUES DA LOJA' NA HOME PARA O NOME DO SALDÃO
$('h2[class="title-section"] span:contains("Destaques da loja")').html(NOME_SALDAO + ' <a href="'+URL_SALDAO+'">(Veja todos)</a>');


//MOVE O CONTAINER SALDÃO PARA CIMA DE NOVIDADES
//var containerSaldao = $('h2:contains('+NOME_SALDAO+')').parent().parent().parent();
//var containerNovidades = $('h2:contains("Novidades")').parent().parent().parent();
//containerNovidades.before(containerSaldao);

//REMOVENDO TODO O CONTEÚDO DA HOME ABAIXO DO BANNER
$('div[class="content-home"]').remove();
$('div[class="banner-info container"]').remove();
$('div[class="newsletter flex color_true align-center justify-between"]').remove();

///////////////////////////////////////////////////////////////////////////////////////////////

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