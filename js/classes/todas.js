var Randomico = class Randomico
{
    static randInt() {

        const agora = new Date();
        const timestamp = agora.getTime();
        
        return Math.floor(  Math.random() * timestamp );

    }

    static randStr(comprimento) {
        const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let resultado = "";
      
        for (let i = 0; i < comprimento; i++) {
          const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
          resultado += caracteres.charAt(indiceAleatorio);
        }
      
        return resultado;
      }
}

var Observar = class Observar
{
    constructor(elementoRaiz=null) {
        this.observers = [];
        this.elementoRaiz = elementoRaiz;
      this.init();
    }

    init() {
        //console.log('Observar->init()');

        if(this.elementoRaiz === null){
            this.elementoPai = document.querySelector("body");
        }else{
            this.elementoPai = document.querySelector(this.elementoRaiz);
        }
        

        // Cria uma instância do MutationObserver
        const observer = new MutationObserver(this.monitoramento.bind(this));
        // Configura a observação para adições de nós
        const config = { childList: true/* , subtree: true */ };
        // Inicia a observação no elemento pai
        observer.observe(this.elementoPai, config);

    }


    monitoramento(mutationsList) {

        var classe = this;

        for (let mutation of mutationsList) {
                if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
                    
                        Object.keys(classe.observers).forEach(i => {

                                const item = classe.observers[i];

                                if ($(item.elemento).length) {
                                    // O elemento foi adicionado

                                    item.fn();

                                    if(item.removerOnComplete){
                                        classe.remove(i);
                                    }

                                }
                                
                        });
                    
                }
        }
    }

    add(elemento, fn, removerOnComplete=true){

        console.log('add('+elemento+')');

        const agora = new Date();
        const timestamp = agora.getTime();
        const rand = this.gerarNumeroRandomico(timestamp) + this.gerarNumeroRandomico(timestamp);

        this.observers['item'+rand] = {'elemento': elemento, 'fn': fn, 'removerOnComplete': removerOnComplete};
    }


    remove(i){
        //console.log('remover('+i+');');
        
        delete this.observers[i];
        //console.log('itens restantes',this.observers);
        //this.observers.splice(i, 1);
    }


    gerarNumeroRandomico(numeroBase) {
        // Gera um número aleatório entre 0 (inclusive) e 1 (exclusivo)
        const numeroAleatorio = Math.random();
        
        // Multiplica o número aleatório pelo número base para obter um valor no intervalo desejado
        const numeroFinal = numeroBase * numeroAleatorio;
        
        // Arredonda o número para um inteiro, se necessário
        return Math.floor(numeroFinal);
    }

    itens(){
        return this.observers;
    }
}


var LoadScripts = class LoadScripts
{
    constructor() {
        this.arquivos = [];
        this.aguardarCarregamento = [];
        this.fn_load_all = null;
        this.fn_load_all_executada = false;
    }

    add(url,tipo,aguardarCarregar=true){

        const classe = this;

        const id = 'item' + classe.randInt();
        classe.arquivos[id] = {'id':id, 'url':url,'aguardarCarregar':aguardarCarregar};
        aguardarCarregar ? classe.aguardarCarregamento.push(id) : null;

    }

    executar(parametros={}){

        const classe = this;

        const {
            fn_load_all = null
        } = parametros;

        classe.fn_load_all = fn_load_all;
        
        for(var item in classe.arquivos){
            classe.carregarItem(classe.arquivos[item]);

        }
    }

    carregarItem(item){

        const classe = this;

        $.getScript( item['url'], function() {
            classe.itemCarregado(item['id']);
        });

    }

    itemCarregado(id){

        const classe = this;

        //indice do item na lista de espera
        const indice = jQuery.inArray( id, classe.aguardarCarregamento );

        //remove o item da lista de espera
        classe.aguardarCarregamento.splice(indice, 1);

        //se a função load_all ainda não tiver sido executada, a lista de espera estiver vazia, e fn_load_all estiver setada, executa o código. 
        if(!classe.fn_load_all_executada && classe.aguardarCarregamento.length === 0 && classe.fn_load_all !== null){
            classe.fn_load_all();
        }

    }


    randInt() {

        const agora = new Date();
        const timestamp = agora.getTime();
        
        return Math.floor(  Math.random() * timestamp );

    }
}