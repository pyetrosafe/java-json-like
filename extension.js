const vscode = require('vscode');
const formatter = require('./formatter');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

  console.log('Parceiro de Programação: A extensão "java-object-formatter" está ativa!');

  let formatSelectedDisposable = vscode.commands.registerCommand('java-object-formatter.formatSelectedText', () => {
    const editor = vscode.window.activeTextEditor;

    if (editor) {
      const document = editor.document;
      const selection = editor.selection;

      // Obtém o texto selecionado
      const text = document.getText(selection);

      // Aplica a lógica de formatação
      const formattedText = formatter.formatJavaObjectString(text);

      // Substitui o texto selecionado pelo texto formatado
      editor.edit(editBuilder => {
        editBuilder.replace(selection, formattedText);
      });

      vscode.window.showInformationMessage('Texto do objeto Java formatado com sucesso!');
    }
  });

  let formatDocumentDisposable = vscode.commands.registerCommand('java-object-formatter.formatWholeDocument', () => {
    const editor = vscode.window.activeTextEditor;

    if (editor) {
        const document = editor.document;
        const fullText = document.getText();
        const formattedText = formatter.formatJavaObjectString(fullText);

        const firstLine = document.lineAt(0);
        const lastLine = document.lineAt(document.lineCount - 1);
        const fullRange = new vscode.Range(firstLine.range.start, lastLine.range.end);

        editor.edit(editBuilder => {
            editBuilder.replace(fullRange, formattedText);
        });

        vscode.window.showInformationMessage('Documento formatado com sucesso!');
    }
  });

  context.subscriptions.push(formatSelectedDisposable, formatDocumentDisposable);
}

// Este método é chamado quando sua extensão é desativada
function deactivate() {}

module.exports = {
  activate,
  deactivate
}