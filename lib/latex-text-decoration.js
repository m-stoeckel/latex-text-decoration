const {
  CompositeDisposable
} = require('atom')

module.exports = {
  subscriptions: null,

  activate() {
    this.subscriptions = new CompositeDisposable()
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'latex-text-decoration:mathit': () => this.decorate("mathit"),
      'latex-text-decoration:emph': () => this.decorate("emph"),
      'latex-text-decoration:textbf': () => this.decorate("textbf"),
      'latex-text-decoration:texttt': () => this.decorate("texttt")
    }))
  },

  deactivate() {
    this.subscriptions.dispose()
  },

  decorate(cmd) {
    const editor = atom.workspace.getActiveTextEditor()
    const selections = editor.getSelections()
    selections.forEach(selection => {
      let text = selection.getText();
      selection.insertText(`\\${cmd}{${text}}`);
      if (text == "") {
        selection.cursor.moveLeft(1);
      }
    })
  }
}
