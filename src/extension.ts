import * as vscode from 'vscode';

type Lines = {
    ne: number;
    e: number;
    c: number;
};
let statusBar: vscode.StatusBarItem;
const defaultFormat = 'Lns: {t} ({ne} + {e}e + {c}c)';

function text(lines: Lines) {
    const format = vscode.workspace.getConfiguration('simple-lines-count').get<string>('format');

    let text = (format ?? defaultFormat).replaceAll('{t}', (lines.ne + lines.e + lines.c).toString());
    text = text.replaceAll('{ne}', lines.ne.toString());
    text = text.replaceAll('{e}', lines.e.toString());
    text = text.replaceAll('{c}', lines.c.toString());

    return text;
}

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

function getSelectedLinesInfo(editor: vscode.TextEditor | undefined): Lines {
    let lines: Lines = {ne: 0, e: 0, c: 0};
    if (editor) {
        editor.selections.forEach(selection => {
            let text = editor.document.getText(new vscode.Range(selection.start, selection.end));
            let rows = text.split('\n');
            lines.e += rows.filter(row => row.trim() === '').length;
            lines.c += rows.filter(row => row.trim().startsWith('//')).length;
            lines.ne += rows.length - lines.e - lines.c;
        });
    }
    return lines;
}
