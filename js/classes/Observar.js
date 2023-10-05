class Observar
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

        //console.log('add('+elemento+')');

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
