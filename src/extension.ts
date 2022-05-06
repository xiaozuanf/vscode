import * as vscode from 'vscode';
import genFile from './getFiles';
export function activate(context: vscode.ExtensionContext) {
	let createdirindexCommand = vscode.commands.registerCommand('createHooks.createFile', async(uri: vscode.Uri) => {
		const fileName = await vscode.window.showInputBox({prompt: '文件名称（不需要输入后缀名）', placeHolder: '输入文件名称'});
		const dirPath = uri.fsPath;
		genFile(dirPath, fileName);
	});

	context.subscriptions.push(createdirindexCommand);
}

// this method is called when your extension is deactivated
export function deactivate() {}
