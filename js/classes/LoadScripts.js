//essa classe ainda precisa ser corrigida
let LoadScripts = class LoadScripts
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