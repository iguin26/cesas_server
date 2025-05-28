export const rgUtils = {

    cleanRG: function(rg) {
        return rg.replace(/\D/g, '');
    },

    validateRG: function(rg) {
        const rgLimpo = this.cleanRG(rg);

        if(rgLimpo.length !== 9) {
            return false;
        }

        const digitos = rgLimpo.split('').map(Number);

        let soma = 0
        for (let i =0; i < 8; i++){
            soma += digitos[i] * (2 + i);
        }

        const resto = soma % 11;
        let digitoVerificadorCalculado = 11 - resto;

        if(digitoVerificadorCalculado === 10){
            digitoVerificadorCalculado = 'X';
        }else if (digitoVerificadorCalculado === 11){
            digitoVerificadorCalculado = 0
        }

        const digitoFornecido = rgLimpo.charAt(8).toUpperCase();
        return digitoVerificadorCalculado.toString() === digitoFornecido;
    },

    formataRG: function(rg){
        const rgLimpo = this.cleanRG(rg);
        if (rgLimpo.length === 0) return'';
         let parte1 = rgLimpo.substring(0, 2);
    let parte2 = rgLimpo.substring(2, 5);
    let parte3 = rgLimpo.substring(5, 8);
    let digito = rgLimpo.substring(8, 9);
    
    let rgFormatado = parte1;
    
    if (rgLimpo.length > 2) {
      rgFormatado += `.${parte2}`;
    }
    if (rgLimpo.length > 5) {
      rgFormatado += `.${parte3}`;
    }
    if (rgLimpo.length > 8) {
      rgFormatado += `-${digito}`;
    }
    
    return rgFormatado;
  },

  /**
   * Aplica máscara de RG em um input HTML enquanto o usuário digita
   * @param {HTMLInputElement} input - Elemento input que receberá a máscara
   */
  applyRGMask: function(input) {
    input.addEventListener('input', (e) => {
      // Guarda posição do cursor
      const cursorPosition = input.selectionStart;
      
      // Remove caracteres não numéricos
      let rgValue = this.cleanRG(input.value);
      
      // Limita a 9 caracteres
      if (rgValue.length > 9) {
        rgValue = rgValue.substring(0, 9);
      }
      
      // Aplica formatação
      input.value = this.formatRG(rgValue);
      
      // Ajusta posição do cursor
      let newCursorPosition = cursorPosition;
      
      // Se inseriu um caractere especial, avança o cursor
      if (input.value.length > rgValue.length && 
          (cursorPosition === 3 || cursorPosition === 7 || cursorPosition === 11)) {
        newCursorPosition++;
      }
      
      // Se removeu um caractere especial, retrocede o cursor
      if (input.value.length < cursorPosition) {
        newCursorPosition = input.value.length;
      }
      
      input.setSelectionRange(newCursorPosition, newCursorPosition);
    });
  }
}
