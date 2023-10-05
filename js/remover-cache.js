//verifica se a página atual tem o parametro nocache=1
reloadNoCache();

//add em todos os links o nocache=1
jQuery( document ).ready(function() {

        //altera todos 
        jQuery('a[href]:not(.link-cart, .botao-commerce)').each(function(){
            addNocacheLink(this);
        });

});

// Função para verificar e adicionar o parâmetro "nocache=1" à URL atual
function reloadNoCache() {
    // Obter a URL atual
    var url = window.location.href;
  
    // Verificar se a URL já contém o parâmetro "nocache=1"
    if (url.indexOf("nocache=1") === -1) {
      // Se não contiver, adicionar o parâmetro à URL
      if (url.indexOf("?") !== -1) {
        // Se já houver outros parâmetros na URL, adicione "&nocache=1"
        url += "&nocache=1";
      } else {
        // Se não houver outros parâmetros na URL, adicione "?nocache=1"
        url += "?nocache=1";
      }
  
      // Redirecionar para a nova URL com o parâmetro adicionado
      window.location.href = url;
    }
}
  
// Função para adicionar o parâmetro "nocache=1" à URLs
function addNocacheLink(elem){

    var url = jQuery(elem).attr('href');

    //exclui todos os links que sejam completos "http:// ou https://" mas que não sejam links da loja, exemplo 'https://instagram.com/penelopeescandalosa', deixando apenas os links relativos exemplo '/rubyrose', e links completos exemplo 'https://www.penelopeescandalosa.com.br/boca'.
    if(url.includes("http") && !url.startsWith("https://www.penelopeescandalosa.com.br")){
        return false;
    }

    // Exclui URL que já contém o parâmetro "nocache=1"
    if (url.includes("nocache=1")) {
        return false;
    }

    // Se não contiver, adicionar o parâmetro à URL
    if (url.includes("?")) {
        // Se já houver outros parâmetros na URL, adicione "&nocache=1"
        url += "&nocache=1";
    } else {
        // Se não houver outros parâmetros na URL, adicione "?nocache=1"
        url += "?nocache=1";
    }

    //altera o href
    jQuery(elem).attr('href', url);


}