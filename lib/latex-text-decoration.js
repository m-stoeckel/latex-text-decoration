const {
  CompositeDisposable
} = require('atom')

module.exports = {
  subscriptions: null,

  activate() {
    this.subscriptions = new CompositeDisposable()
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'latex-text-decoration:textbf': () => this.decorate("textbf"),
      'latex-text-decoration:textit': () => this.decorate("textit"),
      'latex-text-decoration:textsl': () => this.decorate("textsl"),
      'latex-text-decoration:textsc': () => this.decorate("textsc"),
      'latex-text-decoration:textsf': () => this.decorate("textsf"),
      'latex-text-decoration:texttt': () => this.decorate("texttt"),
      'latex-text-decoration:mathit': () => this.decorate("mathit"),
      'latex-text-decoration:mathbf': () => this.decorate("mathbf"),
      'latex-text-decoration:textmd': () => this.decorate("textmd"),
      'latex-text-decoration:textlf': () => this.decorate("textlf"),
      'latex-text-decoration:emph': () => this.decorate("emph"),
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
