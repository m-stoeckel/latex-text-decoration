const {
  CompositeDisposable
} = require('atom')

module.exports = {
  subscriptions: null,

  activate() {
    console.log("Hello text decoration!");
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
    editor.insertText(`\\${cmd}{${editor.getSelectedText()}}`)
  }
}
