// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	const Btt = require('btt').Btt;

	const btt = new Btt({
	domain: '127.0.0.1',
	port: 55934,
	protocol: 'http',
	version: '2.525',
	});

	context.subscriptions.push(
		vscode.debug.onDidStartDebugSession(() => {
			const debuggingOn = btt.Trigger.get({ name: 'debugging_on' });
			debuggingOn.invoke();
		}),
		vscode.debug.onDidTerminateDebugSession(() => {
			const debuggingOff = btt.Trigger.get({ name: 'debugging_off' });
			debuggingOff.invoke();
		})
	);

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "btt-events" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('btt-events.helloWorld', function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from btt_events!');
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
