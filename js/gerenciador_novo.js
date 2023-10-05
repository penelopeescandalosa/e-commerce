//resolve o problema dentro das paginas dos produtos que não dava para acessar o jQuery pelo $
if(typeof $.fn == 'undefined'){

    console.log('jQuery.noConflict()');
    var $ = jQuery.noConflict();
    
}

//VARIÁVEIS RESPONSÁVEIS POR GERENCIAR O CARREGAMENTO DOS ARQUIVOS
var ARQUIVOS = {};
var AGUARDAR_CARREGAMENTO = [];
var ARQUIVOS_CARREGADOS = false;
var FN_ON_LOAD_ALL_EXECUTADA = false;

var FUNCOES_ON_LOAD_ALL = [];

//classes observadoras
var OBSERVADOR = null;//Observa quando um novo elemento aparece no DOM
var OBSERVADOR_MODIFICACOES = null;//Observa modificações em elementos e seus filhos

//url base dos arquivos
const URL_BASE = 'https://cdn.jsdelivr.net/gh/penelopeescandalosa/e-commerce@latest/';



//URLS PARA VERIFICAR EM QUAL PÁGINA ESTÁ
const url_carrinho = 'https://www.penelopeescandalosa.com.br/checkout';



///////////////////////////////////////////////////////////////////////
$( document ).ready(function() {

    

    //add('js/verificar_mudancas_na_url.js', 'js');
    add('js/pageview.js', 'js');
    add('js/classes/Observar.js', 'js');
    add('js/classes/ObservarModificacoes.js', 'js');

    if (window.location.href.includes(url_carrinho)) {
        add('css/carrinho.css', 'css');
        add('js/carrinho/carrinho.js', 'js');
        
        //add('js/carrinho/temporario.js', 'js');
        //add('js/carrinho/valor_minimo_pedido.js', 'js');
        //add('js/carrinho/modificacoes_checkout.js', 'js');
        //add('js/carrinho/pedido_finalizado.js', 'js');
        add('js/carrinho/valor_minimo_pedido1.js', 'js');
        add('js/carrinho/modificacoes_checkout1.js', 'js');
        add('js/carrinho/temporario1.js', 'js');
        add('js/carrinho/pedido_finalizado1.js', 'js');

        add('js/carrinho/rodape.js', 'js');

        add('css/pedido_finalizado.css', 'css');

    }else{

        //remover após promoção
        //add('js/remover-cache.js', 'js');
        //console.log('Fora do carrinho.');
    }

    executar();// fn_load_all() será executada ao carregar todos

});

function fn_load_all(){
    
    //console.log('fn_load_all()');

    OBSERVADOR = new Observar();
    OBSERVADOR_MODIFICACOES = new ObservarModificacoes();

    for(var fn of FUNCOES_ON_LOAD_ALL){
        fn();
    }

    FN_ON_LOAD_ALL_EXECUTADA = true;
}




function add(url,tipo, esperarCarregar=true){

    const id = 'item' + randInt();

    ARQUIVOS[id] = {'id':id, 'url':url, 'tipo':tipo, 'aguardarCarregar':esperarCarregar};

    esperarCarregar ? AGUARDAR_CARREGAMENTO.push(id) : null;

    return id;

}

function executar(){
    
    for(var item in ARQUIVOS){
        carregarItem(ARQUIVOS[item]);
    }
}

function carregarItem(item){

    if(item['tipo'] === 'js'){

        $.getScript( URL_BASE + item['url'] + '?' + randInt() + '&', function() {
            itemCarregado(item['id']);
        });

    }else if(item['tipo'] === 'css'){

        $("head").append(   $("<link>").attr({"rel":"stylesheet", "href": URL_BASE + item['url'] + "?" + randInt()})   );
        itemCarregado(item['id']);

    }else{
        console.log(item['url'] + 'Não pôde ser carregado, tipo: ' + item['tipo'] + ' não é válido.');
    }

}

function itemCarregado(id){

    //console.log(ARQUIVOS[id]['url'] + ' Carregado...');

    //indice do item na lista de espera
    const indice = jQuery.inArray( id, AGUARDAR_CARREGAMENTO );

    //remove o item da lista de espera
    AGUARDAR_CARREGAMENTO.splice(indice, 1);

    //se a função load_all ainda não tiver sido executada, a lista de espera estiver vazia, e fn_load_all estiver setada, executa o código. 
    if(AGUARDAR_CARREGAMENTO.length === 0){
        fn_load_all();
        ARQUIVOS_CARREGADOS = true;
    }

}


function randInt() {

    const agora = new Date();
    const timestamp = agora.getTime();
    
    return Math.floor(  Math.random() * timestamp );

}

function add_on_load_all(fn){

    //executa a função caso a função on_load_all já tenha sido executada
    FN_ON_LOAD_ALL_EXECUTADA ? fn() : null;

    FUNCOES_ON_LOAD_ALL.push(fn);
}

//descontinuada
async function aguardaCarregamento(fn_load) {
    
    while (true) {
        
        if (ARQUIVOS_CARREGADOS === true) {
            fn_load();
            break;
        }
        
        // Aguarda um tempo antes de verificar novamente
        await new Promise(resolve => setTimeout(resolve, 50));
    }
}