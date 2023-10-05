class Randomico
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
