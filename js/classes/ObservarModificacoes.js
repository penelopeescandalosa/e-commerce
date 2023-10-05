/**
 * Observa um elemento no DOM para saber quando alteraões são realizadas nele ou em seu filhos
 * @example ObservarModificacoes.addItem($('#meuElemento'), function(){}, {'childNodes':['DIV','FORM']});
 * @example ObservarModificacoes.removeItem(id);
 */
var ObservarModificacoes = class ObservarModificacoes
{
    constructor(){
        this.elementos = [];

        this.config = {
            attributes: true, // Observar mudanças nos atributos do elemento
            childList: true, // Observar adições/remoções de elementos filhos
            subtree: true, // Observar mudanças em todo o subárvore do elemento
        };
    }

    /**
     * Adiciona um novo Observador a um `elemento` do DOM, esse `elemento` deve ser único, `fn` é a função que será executada toda vez que dentro deste elemento, houver uma alteração compatível com as configurações passadas em `parametros`.
     * @param {jQuery} elemento Elemento pai jQuery que terá suas alterações observadas.
     * @param {Function} fn Função que será executada quando for positivo, de acordo com as configurações passadas em `parametros`.
     * @param {Object} parametros Objeto que conterá os parametros do observador: 
     * @param {Object} config_observer Configurações da classe `MutationObserver`. Se este campo não for passado, será usado o config padrão que está dentro de `constructor()`.
     * @param {Array} childNodes Tipos de elementos a serem verificados, exemplo: `DIV`, `FORM`, `SPAN`, etc...  Estes valores devem ser passados dentro de um Array e em letras maiúsculas. Para executar a função `fn` para qualquer novo childNode, este parametro deve receber um array com uma string vazia `['']`, este é o valor padrão.
     * @param {Array} attributes Tipos de attributes a serem verificados, exemplo: `style`, `class`, `data-parametro`, etc... Para executar a função `fn` para qualquer alteração em qualquer stributo, este parametro deve receber um array com uma string vazia `['']`, este é o valor padrão.
     * @example ObservarModificacoes.addItem($('#meuElemento'), function(){}, {'childNodes':['DIV','FORM']});
     * @returns {String} Id do item criado.
     */
    addItem(elemento, fn,parametros={}){

        const classe = this;
        const elem = $(elemento);

        //#region # verificando os dados passados para a função #

            //verifica se o elemento existe ou se ele representa apenas um elemento
            if( !(elem.length === 1) ){
                console.error('addItem() Falhou. O seletor para o elemento informado não existe ou representa mais de um elemento.', elemento);
                return false;
            }

            if(!jQuery.isFunction(fn)){
                console.error('addItem() Falhou. fn não é uma função.', fn);
                return false;
            }

            if(!jQuery.isPlainObject(parametros)){
                console.error('addItem() Falhou. parametros não é um object.', parametros);
                return false;
            }
        
        //#endregion


        const {
            config_observer = classe.config,
            childNodes = [''],
            attributes = [''],
            pause = false
        } = parametros;


        const id = 'item' + classe._randInt();

        classe.elementos[id] = {
            'id'        : id,
            'elemento'  : elem[0],
            'observer'  : new MutationObserver(function(mutationsList){ classe._observadora(mutationsList, id) }),
            'config'    : config_observer,
            'fn'        : fn,
            'childNodes': childNodes,
            'attributes': attributes,
            'pause'     : pause
        }

        //salva o id no elemento
        elem.data('id_class_ObservarModificacoes', id);

        !pause ? classe.elementos[id]['observer'].observe(classe.elementos[id]['elemento'], classe.elementos[id]['config']) : null;

        //console.log('Item: ' + id + ' criado.');

        return id;
    }

    stopItem(id){

        const classe = this;

        if( !(id in classe.elementos) ) {
            console.error('pauseItem() Falhou. O indice ' + id + ' não existe.');
            return false;
        }

        if(classe.elementos[id]['pause'] === true){
            return null;
        }

        classe.elementos[id]['observer'].disconnect();
        classe.elementos[id]['pause'] = true;

        //console.log('Item: ' + id + ' pausado.');

        return id;

    }

    playItem(id){
        const classe = this;

        if( !(id in classe.elementos) ) {
            console.error('playItem() Falhou. O indice ' + id + ' não existe.');
            return false;
        }

        if(classe.elementos[id]['pause'] === false){
            return null;
        }

        classe.elementos[id]['observer'].observe(classe.elementos[id]['elemento'], classe.elementos[id]['config']);
        classe.elementos[id]['pause'] = false;

        //console.log('Item: ' + id + ' iniciado.');

        return id;
    }

    /**
     * 
     * @param {String} id Id do observer a ser removido.
     * @example ObservarModificacoes.removeItem(id);
     * @returns {null} `Null`
     */
    removeItem(id){
        const classe = this;

        if( !(id in classe.elementos) ) {
            console.error('removeItem() Falhou. O indice ' + id + ' não existe.');
            return false;
        }

        //para o observador
        classe.elementos[id]['observer'].disconnect();
        //remove o id do data storage do elemento no DOM
        $(classe.elementos[id]['elemento']).removeData('id_class_ObservarModificacoes');
        //deleta o elemento da classe
        delete classe.elementos[id];

        //console.log('Item: ' + id + ' removido.');

        return null;

    }

    _observadora(mutationsList, id){
        const classe = this;

        //console.log('_observadora()');
        
        for (let item of mutationsList) {

            //caso o observador seja destruído durante a execussão do loop, ele é interrompido, isso pode ocorrer quando a função que é executada ao encontrar a modificação precisa remover o observador antes de realizar novas alterações, afim de evitar um loop infinito.
            if(!(id in classe.elementos)){
                //break;
                return;
            }

            //verifica se o tipo de mudança é um 'childList', e se o obserador tem childNodes para buscar
            if(item.type === 'childList' && classe.elementos[id]['childNodes'].length > 0){
                classe._verificaChildNodes(id, item);
            }

            //fazer o verificador de atributos aqui
            if(item.type === 'attributes' && classe.elementos[id]['attributes'].length > 0){
                //console.log('_observadora() -> attributes');
                classe._verificaAttributes(id, item);
            }

        }
        

    }

    /**
     * Verifica a criação de novos elementos dentro do elemento que está sendo observado
     */
    _verificaChildNodes(id, mutation){
        const classe = this;

        mutation.addedNodes.forEach(function(elem) {

            //caso o observador seja destruído durante a execussão do loop, ele é interrompido, isso pode ocorrer quando a função que é executada ao encontrar a modificação precisa remover o observador antes de realizar novas alterações, afim de evitar um loop infinito.
            if(!(id in classe.elementos)){
                //break;
                return;
            }

            //verifica se o nodeName existe no array childNodes, ou se dentro de childNodes existe um valor vazio ''
            if ( $.inArray('', classe.elementos[id]['childNodes']) !== -1 || $.inArray(elem.nodeName, classe.elementos[id]['childNodes']) !== -1 ) {

                //console.log('Novo item ' + elem.nodeName + ' encontrado.');
                classe.elementos[id]['fn'](elem);

            }
        });


    }

    _verificaAttributes(id, mutation){
        const classe = this;

        //caso o observador seja destruído durante a execussão do loop, ele é interrompido, isso pode ocorrer quando a função que é executada ao encontrar a modificação precisa remover o observador antes de realizar novas alterações, afim de evitar um loop infinito.
        if(!(id in classe.elementos)){
            //break;
            return;
        }

        //verifica se o attribute existe no array attributes, ou se dentro de attributes existe um valor vazio ''
        if ( $.inArray('', classe.elementos[id]['attributes']) !== -1 || $.inArray(mutation.attributeName, classe.elementos[id]['attributes']) !== -1 ) {

            //console.log('Novo item ' + elem.nodeName + ' encontrado.');
            classe.elementos[id]['fn'](classe.elementos[id]['elemento']);

        }


    }

    _randInt() {
    
        // Gera um número aleatório entre 0 (inclusive) e 1 (exclusivo)
        const numeroAleatorio = Math.random();
        
        // Multiplica o número aleatório pelo número base para obter um valor no intervalo desejado
        const numeroFinal = jQuery.now() * numeroAleatorio;
        
        // Arredonda o número para um inteiro, se necessário
        return Math.floor(numeroFinal);
    }

    _randStr(comprimento) {
        const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let resultado = "";
      
        for (let i = 0; i < comprimento; i++) {
          const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
          resultado += caracteres.charAt(indiceAleatorio);
        }
      
        return resultado;
    }
}