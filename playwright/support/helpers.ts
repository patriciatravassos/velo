 export function gerarCodigoPedido() {
    // Primeira parte: 3 letras maiúsculas
    const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let primeiraParte = '';
    for (let i = 0; i < 3; i++) {
        primeiraParte += letras.charAt(Math.floor(Math.random() * letras.length));
    }
    
    // Segunda parte: 6 caracteres (letras + números)
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let segundaParte = '';
    for (let i = 0; i < 6; i++) {
        segundaParte += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    
    return `${primeiraParte}-${segundaParte}`;
  }