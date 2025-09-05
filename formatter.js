/**
 * Formata uma string de objeto Java aninhado em um formato legível, semelhante a JSON.
 * Aprimorado para lidar com delimitadores dentro de strings de valor.
 * @param {string} text A string do objeto Java a ser formatada.
 * @returns {string} A string formatada.
 */
function formatJavaObjectString(text) {
  let indent = 0;
  let formatted = '';
  let inString = false; // Flag para rastrear se estamos dentro de uma string

  // Substitui quebras de linha existentes e remove espaços extras
  const cleanText = text.replace(/\n\s*/g, '');

  for (let i = 0; i < cleanText.length; i++) {
    const char = cleanText[i];

    // Inverte a flag 'inString' ao encontrar aspas duplas, exceto se for um caractere de escape
    if (char === '"' && (i === 0 || cleanText[i - 1] !== '\\')) {
      inString = !inString;
    }

    // Se estiver dentro de uma string, adiciona o caractere e continua para o próximo
    if (inString) {
      formatted += char;
      continue;
    }

    // Lógica de formatação para delimitadores
    if (char === '(' || char === '{' || char === '[') {
      formatted += char + '\n' + '  '.repeat(++indent);
    } else if (char === ')' || char === '}' || char === ']') {
      formatted += '\n' + '  '.repeat(--indent) + char;

      // Adiciona uma vírgula e quebra de linha se o próximo caractere for uma vírgula
      if (cleanText[i + 1] === ',') {
        formatted += ',';
        formatted += '\n' + '  '.repeat(indent);
        i++; // Pula o próximo caractere (a vírgula)

        // Verifica se há espaço(s) depois da vírgula
        while (cleanText[i + 1] === ' ') {
          i++;  // Pula o próximo caractere (espaço)
        }
      }
    } else if (char === ',') {
      formatted += char + '\n' + '  '.repeat(indent);

      // Verifica se há espaço(s) depois da vírgula
      while (cleanText[i + 1] === ' ') {
        i++;  // Pula o próximo caractere (espaço)
      }
    } else {
      formatted += char;
    }
  }

  // Finaliza a formatação limpando espaços extras no início e fim
  return formatted.trim();
}

module.exports = {
  formatJavaObjectString
};