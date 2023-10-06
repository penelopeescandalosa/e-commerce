add_on_load_all(function() {

    if(window.location.hash == '#finalizacao'){
        inicia_finalizacao()
    }

    $(window).on('hashchange', function() {
        if(window.location.hash == '#finalizacao'){
            inicia_finalizacao()
        }
    });

});



var paragrafo_desc_pagamento = null;
var html_paragrafo_desc_pagamento = null;
var finalizacao_executada = false;

function inicia_finalizacao(){

    if(finalizacao_executada){ return; }
    finalizacao_executada = true;

    //aguarda carregamento
    aguardaElemento('div[class="ch-list-text ch-margin-right-one"]', pedido_finalizado,{'tempo':100});
}




function pedido_finalizado(){
    
    console.log('function pedido_finalizado()');

    //SALVA O ELEMENTO ONDE SERÁ APRESENTADO AS INFORMAÇÕES SOBRE O PAGAMENTO
    paragrafo_desc_pagamento = $('div[class="ch-list-text ch-margin-right-one"]');

    //SALVA O HTML PARA CASO PRECISE USAR NA FUNÇÃO pix_alternativo()
    html_paragrafo_desc_pagamento = paragrafo_desc_pagamento.html();

    //VERIFICA SE O PAGAMENTO É DO TIPO PIX
    if(html_paragrafo_desc_pagamento.indexOf("PIX") != -1){

        paragrafo_desc_pagamento.empty();
        paragrafo_desc_pagamento.append( html_loading() );

        inicia_pix();

        // ROLAR A PÁGINA PARA O INICIO DO TEXTO
        var posicao_rolagem = paragrafo_desc_pagamento.offset().top-25;
        $('html, body').animate({ scrollTop: posicao_rolagem }, 1000);

    } else {
        
        //ESSA FUNÇÃO DEVE SER CHAMADA CASO O PAGAMENTO NÃO SEJA PIX POR AQUI, CASO SEJA PIX, ELA SERÁ CHAMADA DENTRO DA FUNÇÃO DE OCULTA O LOADING.
        texto_sobre_entrega_motoboy();

    }

};


//ESSA PARTE DO CÓDIGO É PARA ADICIONAR TEXTO SOBRE O PRAZO DE ENTREGA COM MOTOBOY////
function texto_sobre_entrega_motoboy(){

    //VERIFICA SE A ENTREGA É VIA MOTOBOY
    if($( "small:contains('(Entrega Penélope (Muriaé))')" ).length >= 1) {

            var html_msg_Entrega = $('<div />', {id: 'div_msg_entregador'}).attr('style', 'display: none');

            html_msg_Entrega.html("<h3> O PRAZO PARA ENTREGA VIA MOTOBOY </h3> \n A entrega será realizada no mesmo dia caso o pagamento tenha sido confirmado até 16:50h (segunda a sexta) e Sábado até 11:50h.<br>Após este horário seu pedido poderá sair para entrega no dia útil seguinte.<br>Se você tiver qualquer dúvida, clique no botão do WhatsApp e fale com a gente! =)");

            $('section[data-checkout-template="finalize"]').append(html_msg_Entrega);
            html_msg_Entrega.delay(1000).show( 2000 );

    }

}

function inicia_pix(){
    
    var id_pedido = $('h2[class="order-id"]').text();
    var regex = /^\d{6}$/;
    if(regex.test(id_pedido)){

            busca_pix(id_pedido,pixQrCode,pix_alternativo);

    } else {

            pix_alternativo();

    }
    
}

function busca_pix(id_pedido, sucesso, erro){
    
    $.ajax(
        {
            method: 'GET',
            data: { 'id_pedido': id_pedido },
            url: 'https://www.penelopeescandalosa.com/pix-v2/ajax/novo-pix.php',
            success: function(retorno) {
                sucesso($.parseJSON(retorno));
            },
            error: function(retorno){
                console.log('Não foi possível exibir o Pix QrCode.');
                erro();
            }
        }
    );
}

function pixQrCode(dados){
    
    //VERIFICA SE AJAX RETORNOU ERRO
    if('erro' in dados){

        pix_alternativo();
        return false;
    }

    //VERIFICA SE AJAX RETORNOU copiaecola E qrcode E GERA O RESULTADO
    if('copiaecola' in dados && 'qrcode' in dados){

        paragrafo_desc_pagamento.append( 
            html_pix( dados['copiaecola'], dados['qrcode'] )
        );
        oculta_loadind();
        evento_copiar("Código PIX copiado!\n\nNo app do seu banco cole no local escrito 'Pix Copie e cola'.");

    }else{

        pix_alternativo();
        return false;

    }

}

function html_loading(){

    var str_html = '';
    str_html += '    <div class="lds-ring"><div></div><div></div><div></div><div></div></div>';
    str_html += '    <h4>Aguarde... Carregando Qr Code</h4>';

    var html = $('<div>').html( str_html );
    html.addClass('loading-pix');

    return html;

}

function html_pix(copiaECola, base64QrCode){

    var str_html = '';
        str_html += '    <div class="div-copiaECola">';
        str_html += '    <h2>Use código \'Pix Copia e Cola\' abaixo no app do seu banco:</h2>';
        str_html += '    <textarea id="chave" rows="2" readonly>';
        str_html += '        aguarde...';
        str_html += '    </textarea>';
        str_html += '    <input id="copiarChave" type="button" value="COPIAR">';
        str_html += '    <div class="descricao-pix">No app do seu banco, selecione a opção Pix Copia e Cola.</div>';
        str_html += '    </div>';
        str_html += '    <div class="div-qrCode">';
        str_html += '    <h2>Ou escaneie o Pix QR CODE abaixo:</h2>';
        str_html += '    <img class="img-pix" src="#">';
        str_html += '    <br>';
        str_html += '    <div class="descricao-pix">No app do seu banco, selecione a opção Pix Qr Code.</div>';
        str_html += '    </div>';
        str_html += '    <div class="div-em-caso-de-duvida">Em caso de dúvida, entre em contato conosco!</div>';
    

    var html = $('<div>').html( str_html );
    
    html.find('.img-pix').attr('src', base64QrCode);
    html.find('#chave').text(copiaECola);

    return html;
    
}

function evento_copiar(msg){
    $('#copiarChave').click(function(){
            navigator.clipboard.writeText( $('#chave').val() );
            window.alert(msg);
    });
}


function oculta_loadind(){

    $('.loading-pix').remove();
    texto_sobre_entrega_motoboy();

}

function pix_alternativo() {

    var arr_paragrafo = html_paragrafo_desc_pagamento.split('<br>');

    var texto_superior_sem_chave = arr_paragrafo[0].split(': ')[0];
    var chavePIX = arr_paragrafo[0].split(': ')[1];

    var texto_inferior = arr_paragrafo[2];

    var texto_novo = texto_superior_sem_chave+':';
    texto_novo += '<br><br>';
    texto_novo += '<input type="text" name="chave" id="chave" readonly=""><br>';
    texto_novo += '<input id="copiarChave" type="button" value="COPIAR"><br><br>';
    texto_novo += 'Você deve acessar a área PIX em seu aplicativo de banco, e selecionar a opção chave PIX (Ou transferência).<br><br>' + texto_inferior;


    paragrafo_desc_pagamento.html(texto_novo)

    paragrafo_desc_pagamento.attr('style','font-size: 15px;');

    $('#chave').attr('value', chavePIX);
    evento_copiar("Chave PIX copiada!\n\nNo app do seu banco cole no local escrito 'Chave pix' (selecione a opção e-mail).");
    oculta_loadind();
  
}