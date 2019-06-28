const {
  CompositeDisposable
} = require('atom')

module.exports = {
  subscriptions: null,

  activate() {
    console.log("Hello text decoration!");
    this.subscriptions = new CompositeDisposable()
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'latex-text-decoration:mathit': () => this.mathit(),
      'latex-text-decoration:emph': () => this.emph(),
      'latex-text-decoration:textbf': () => this.textbf()
    }))
  },

  deactivate() {
    this.subscriptions.dispose()
  },

  mathit() {
    const editor = atom.workspace.getActiveTextEditor()
    editor.insertText(`\\mathit{${editor.getSelectedText()}}`)
  },
  emph() {
    const editor = atom.workspace.getActiveTextEditor()
    editor.insertText(`\\emph{${editor.getSelectedText()}}`)
  },
  textbf() {
    const editor = atom.workspace.getActiveTextEditor()
    editor.insertText(`\\textbf{${editor.getSelectedText()}}`)
  }
}
