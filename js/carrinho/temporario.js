add_on_load_all(function() {
        if(window.location.hash != '#carrinho'){
            aguardaElemento('#payment', temporario);
            aguardaElemento('#order-customer-note', inicia_copiar_texto_observacoes);
            aguardaElemento('div[data-checkout-template="shipping"]', inicia_alteracao_no_envio);
        }
});



function temporario(){

var rolagem = 0;

var alterado = 'outro';

var frete = document.querySelector("td[class='col-xs-8 ch-text-right']>p>small");

var div_obs = $("div[data-bind='ifnot: data.checkout.lastStep']");

var frasenova = '<div class="msg_entrega_muriae"> <h3>Deixe uma observação:</h3></div>';

var placeholderoriginal = 'Adicione informações relacionadas ao seu pedido';

var placeholdernovo = 'Nos informe tudo que precisamos saber aqui.';

var fretemuriae = false;

/////////////////////////////////////////////////////////////////////////////////////////////////

div_obs.eq(0).attr('id', 'div_mobile');
div_obs.eq(1).attr('id', 'div_desktop');

div_obs.eq(0).find('label').before( frasenova );
div_obs.eq(1).find('label').before( frasenova );

/////////////////////////////////////////////////////////////////////////////////////////////////

function f_fretemuriae(){
    
    alterado = 'muriae';
    $('textarea[class="ch-input ch-input-no-icon"]').attr('placeholder', placeholdernovo);

}

////////////////////////////////////////////

function f_freteoutros(){
    
    alterado = 'outro';
    $('textarea[class="ch-input ch-input-no-icon"]').attr('placeholder', placeholderoriginal);

}


////////////////////////////////////////////////////

function altera_campo(){
    
        rolagem = 0;
        
        if(frete.innerHTML == "(Entrega Penélope (Muriaé))" || frete.innerHTML == "(Frete grátis)" || frete.innerHTML == "(FRETE GRÁTIS)"){
            fretemuriae = true;
        } else {
            fretemuriae = false;
        }
        
        ///////
        
        if (fretemuriae === true && alterado == "outro"){
            
            f_fretemuriae();
            
        } else if (fretemuriae !== true && alterado == "muriae") {
            
            f_freteoutros();
            
        }

    
}


/////////////////////////////////////////////////////////////////////////////////////////////////





altera_campo();

var observador_nome_frete = new MutationObserver(function() {
    altera_campo();
});



observador_nome_frete.observe(frete, {
attributes: true,
characterData: true,
childList: true,
subtree: true,
attributeOldValue: true,
characterDataOldValue: true
});











var campo_obs_alternativa = $('<textarea></textarea>').attr({
id: 'campo_obs_alternativa',
cols: '30',
rows: '10',
    placeholder: $('#order-customer-note').attr('placeholder'),
class: 'ch-input ch-input-no-icon'
})
.on('keyup',function(){
$('#order-customer-note').val( $(this).val() ).trigger('change');
});

var div_obs_alternativa = $('<div></div>')
.attr('id', 'obs_alternativa')
//.text('Observações do pedido:')
.append(campo_obs_alternativa)
.prepend(frasenova);


$('#payment').before(div_obs_alternativa);


/////////////////////////////////////////////////////////////////////
div_obs_alternativa
.css('display', 'none')
    .find('div[class="msg_entrega_muriae"]').css("opacity", "0");


$(document).on('click resize', function(){
    
    if($(window).width() < 975){
    
        if($('#payment').is(':visible') == true){
        
        div_obs_alternativa
            .css('display', 'block')
            .find('div[class="msg_entrega_muriae"]')
            .delay(500)
            .animate({opacity: '1'},500);
        
        }else{
        
        div_obs_alternativa
            .css('display', 'none')
            .stop()
            .find('div[class="msg_entrega_muriae"]')
            .css("opacity", "0");
        
        }
    
    }else{
    
    div_obs_alternativa
        .css('display', 'none')
        .stop()
        .find('div[class="msg_entrega_muriae"]')
        .css("opacity", "0");
    
    }

});
}


function inicia_copiar_texto_observacoes(){

    $('#order-customer-note').data('clonar_para', '#campo_obs_alternativa');
    $('#campo_obs_alternativa').data('clonar_para', '#order-customer-note');
    
    $('textarea').on('keyup focus blur',function(){
            $(    $(this).data('clonar_para')    ).val(  $(this).val()  );
    });
    
}


function inicia_alteracao_no_envio(){
    
    const elem_observar = $('div[data-checkout-template="shipping"]').parent();
    const config = {'config_observer':{'childList': true,'subtree': true},'childNodes':['DIV']};

    var id_obs = OBSERVADOR_MODIFICACOES.addItem(elem_observar, observa_complemento, config);

    function observa_complemento(elem){
        
        if('data-checkout-template' in elem.attributes && elem.attributes['data-checkout-template'].value == 'shipping'){
            OBSERVADOR_MODIFICACOES.stopItem(id_obs);
            complemento_opicional();
            OBSERVADOR_MODIFICACOES.playItem(id_obs);
        }

        
    }

    complemento_opicional();
}


function complemento_opicional(){
    var msg_complemento = $('label[for="customer-address-complement"] > span[class="ch-label-content"]');
    msg_complemento.html('<span style="color: red; font-size: 12px;">(!) </span> <strong>Complemento e Referência</strong> <small class="ch-label-sample" style="color: #cb3e5f;">Importante!</small>');
}