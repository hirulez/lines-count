import * as vscode from 'vscode';

let statusBar: vscode.StatusBarItem;
const text = (lines: {ne: number; e: number}) => `Lns: ${lines.ne + lines.e} (${lines.ne} + ${lines.e}e)`;

export function activate({subscriptions}: vscode.ExtensionContext) {
    const commandID = 'simple-lines-count.selected';
    subscriptions.push(
        vscode.commands.registerCommand(commandID, () => {
            let lines = getSelectedLinesInfo(vscode.window.activeTextEditor);
            vscode.window.showInformationMessage(text(lines));
        })
    );

    statusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 500);
    statusBar.command = commandID;

    subscriptions.push(
        statusBar,
        vscode.window.onDidChangeActiveTextEditor(updateStatusBar),
        vscode.window.onDidChangeTextEditorSelection(updateStatusBar)
    );

    updateStatusBar();
}

function updateStatusBar(): void {
    const lines = getSelectedLinesInfo(vscode.window.activeTextEditor);
    const textStr = text(lines);

    statusBar.text = textStr;
    statusBar.tooltip = textStr;

    lines.ne + lines.e > 1 ? statusBar.show() : statusBar.hide();
}

function getSelectedLinesInfo(editor: vscode.TextEditor | undefined): {ne: number; e: number} {
    let lines = {ne: 0, e: 0};
    if (editor) {
        editor.selections.forEach(selection => {
            let text = editor.document.getText(new vscode.Range(selection.start, selection.end));
            let rows = text.split('\n');
            lines.e += rows.filter(row => row.trim() === '').length;
            lines.ne += rows.length - lines.e;
        });
    }
    return lines;
}
