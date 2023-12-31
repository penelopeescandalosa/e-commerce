
/////////////////////////////////////////////////////////////////////////////////////////////////////
//VARIÁVEIS DE CONTROLE
const MINIFIER = true;
const NOCACHE = true;
/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////

//VARIÁVEIS RESPONSÁVEIS POR GERENCIAR O CARREGAMENTO DOS ARQUIVOS
var ARQUIVOS = {};
var AGUARDAR_CARREGAMENTO = [];
var ARQUIVOS_CARREGADOS = false;
var FN_CARREGAR_ARQUIVOS_EXECUTADA = false;
var FN_ON_LOAD_ALL_EXECUTADA = false;
var FUNCOES_ON_LOAD_ALL = [];

//classes observadoras
var OBSERVADOR = null;//Observa quando um novo elemento aparece no DOM
var OBSERVADOR_MODIFICACOES = null;//Observa modificações em elementos e seus filhos
/////////////////////////////////////////////////////////////////////////////////////////////////////

//URLS PARA VERIFICAR EM QUAL PÁGINA ESTÁ
const url_checkout = 'https://www.penelopeescandalosa.com.br/checkout';

/////////////////////////////////////////////////////////////////////////////////////////////////////

//resolve o problema dentro das paginas dos produtos que não da para acessar o jQuery pelo $
(typeof $.fn == 'undefined') ? $ = jQuery.noConflict() : null;

/////////////////////////////////////////////////////////////////////////////////////////////////////
$( document ).ready(function() {

    add('js/pageview.js', 'js');
    add('js/classes/Observar.js', 'js');
    add('js/classes/ObservarModificacoes.js', 'js');

    if (window.location.href.includes(url_checkout)) {

        //CSS
        add('css/carrinho.css', 'css');
        add('css/pedido_finalizado.css', 'css');

        //JS
        add('js/carrinho/temporario.js', 'js');
        add('js/carrinho/valor_minimo_pedido.js', 'js');
        add('js/carrinho/modificacoes_checkout.js', 'js');
        add('js/carrinho/pedido_finalizado.js', 'js');
        add('js/carrinho/rodape.js', 'js');


    }else{

        add('https://www.penelopeescandalosa.com/site/js/gerenciador_saldao.js', 'js', false);
        //remover após promoção
        //add('js/remover-cache.js', 'js');
        //console.log('Fora do carrinho.');
    }

    carregar_arquivos();// fn_load_all() será executada após carregar todos os arquivos

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

    ARQUIVOS[id] = {'id':id, 'url':url, 'tipo':tipo, 'aguardarCarregar':esperarCarregar, 'incluido':false};

    esperarCarregar ? AGUARDAR_CARREGAMENTO.push(id) : null;

    FN_CARREGAR_ARQUIVOS_EXECUTADA ? carregarItem(ARQUIVOS[id]) : null;

    return id;

}

function carregar_arquivos(){

    FN_CARREGAR_ARQUIVOS_EXECUTADA = true;
    
    for(var item in ARQUIVOS){
        !ARQUIVOS[item]['incluido'] ? carregarItem(ARQUIVOS[item]) : null;
    }
}

function carregarItem(item){

    let url = item['url'].includes('http') ? item['url'] : URL_RAIZ + item['url'];

    if(MINIFIER && url.includes('jsdelivr')){

            const extencao = '.'+ item['tipo'];
            url = url.slice(0, url.lastIndexOf(extencao)) + '.min' + extencao;

    }

    if(NOCACHE){

            url = url + '?nocache=' + randInt() + '&';

    }

    //confirma que o carregamento do arquivo já foi chamado
    ARQUIVOS[ item['id'] ]['incluido'] = true;

    if(item['tipo'] === 'js'){

            $.getScript( url, function() {
                itemCarregado(item['id']);
            });

    }else if(item['tipo'] === 'css'){

            $("head").append(   $("<link>").attr({"rel":"stylesheet", "href": url})   );
            itemCarregado(item['id']);

    }else{
            console.log(item['url'] + 'Não pôde ser carregado, tipo: ' + item['tipo'] + ' não é válido.');
    }

}

function itemCarregado(id){

    //console.log(ARQUIVOS[id]['url'] + ' Carregado...');

    if(ARQUIVOS[id]['aguardarCarregar']){

            //indice do item na lista de espera
            const indice = jQuery.inArray( id, AGUARDAR_CARREGAMENTO ); 
            //remove o item da lista de espera
            AGUARDAR_CARREGAMENTO.splice(indice, 1);

    }

    //se a função load_all ainda não tiver sido executada, a lista de espera estiver vazia, e fn_load_all estiver setada, executa o código. 
    if(AGUARDAR_CARREGAMENTO.length === 0 && !ARQUIVOS_CARREGADOS){
        ARQUIVOS_CARREGADOS = true;
        fn_load_all();
    }

}


function randInt() {

    const agora = new Date();
    const timestamp = agora.getTime();
    
    return Math.floor(  Math.random() * timestamp );

}

function add_on_load_all(fn){

    //executa a função caso a função on_load_all já tenha sido executada
    if(FN_ON_LOAD_ALL_EXECUTADA){
        fn();
    }else{
        FUNCOES_ON_LOAD_ALL.push(fn);
    }

}


async function aguardaElemento(elemento, fn_load, paramentros={}) {

    let {
        tempo=1000,
        tempo_maximo=0,
        tempo_acumulado=0,
        parametros_fn={},
    } = paramentros;
    
    while (true) {
        
        //verifica se o elemento já existe no DOM
        if ($(elemento).length > 0) {
            fn_load(parametros_fn);
            break;
        }

        //Verifica um tempo máximo foi atribuído
        if(tempo_maximo > 0){

            //Verifica se o tempo máximo foi excedido
            if(tempo_acumulado >= tempo_maximo){
                //console.log('Tempo ' + tempo_maximo + ' esgotado.');
                break;
            }else{
                tempo_acumulado += tempo;
            }

        }

        //console.log('aguardar mais ' + tempo + ' milésimos para executar.');
        
        //Gera uma pausa na execussão do script no tempo determinado nos parametros
        await new Promise(resolve => setTimeout(resolve, tempo));

    }
}