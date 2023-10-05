$( document ).ready(function() {


    $(window).on('popstate', function(event) {
        // A função a ser executada quando a URL for alterada
        console.log('A URL foi alterada:', window.location.href);
        // Execute sua função aqui
    });
    
    $(window).on('hashchange', function() {
        // A função a ser executada quando o fragmento de URL for alterado
        console.log('O fragmento de URL foi alterado:', window.location.hash);
        // Execute sua função aqui
    });




});