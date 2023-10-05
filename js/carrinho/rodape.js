add_on_load_all(function() {

    OBSERVADOR.add('#balaowpp > img', function(){

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
        var intervalo_animacao_wpp = setInterval(anima_wpp ,4000);

    });

});

function anima_wpp(){
	$('#balaowpp > img')
      .animate({  height: "70px", width: "70px" },50)
      .delay(300)
      .animate({  height: "50px", width: "50px" },50);
   
  $('#balaowpp').parent()
      .animate({  right: "5px", bottom: "30px" },50)
      .delay(300)
      .animate({  right: "15px", bottom: "40px" },50);
  }

