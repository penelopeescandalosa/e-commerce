var intervalo_animacao_wpp = null;

add_on_load_all(function() {

    $('body').append(
        `<div class="fixed-contact right-position">
        <a id="balaowpp" class="whats" href="https://api.whatsapp.com/send?l=pt&phone=5532988355311" target="_blank">
            <img src="https://images.tcdn.com.br/files/805466/themes/143/img/whatsapp.svg?220.67235201412194" width="30" height="30" />
        </a>
    </div>`
    );

    aguardaElemento('div[data-checkout-event-tracker="forma_de_pagamento"]', modifica_rodape);

});

function modifica_rodape(){

    $('.footer p[class="ch-contact-item ch-contact-phone ch-vspace-sm"] .ch-icon').remove();
    $('.ch-link-default').attr(
        {
            'href': $('#balaowpp').attr('href'),
            'target': '_blank'
        }
    );

    $('.ch-link-default').before(
        $('#balaowpp > img').clone().css(
            {
                'width': '22px',
                'height': '22px',
                'margin-right': '3px'
            }
        )
    );
    $('#balaowpp').parent().removeClass('right-position');
    anima_wpp();
    intervalo_animacao_wpp = setTimeout(anima_wpp ,6000);

}

function anima_wpp(){

    clearTimeout(intervalo_animacao_wpp);
    intervalo_animacao_wpp = setTimeout(anima_wpp ,6000);

    if(document.hidden){
        console.log('pulo');
        return; 
     }

	$('#balaowpp > img').animate({  height: "33px", width: "33px" },100)
    .delay(300)
    .animate({  height: "30px", width: "30px" },100);

    

  }

