// ===================================
// == app entry point (main script) ==
// ===================================


/*
 * Node WebKit object reference to "nw.gui"
 * has been created in the main html file
 * as variable "nw" and is in scope for
 * use here.
 */


// ---------------------------
// -- main required modules --
// ---------------------------
// require jQuery
var $ = require('./_jquery.min');
var jQuery = $;
// require jQuery RegEx Selector plugin
require('./_jquery-regex-selector');


// ----------------------
// -- main script code --
// ----------------------
$(document).ready(function() {
	// your main app code goes here
	var $context = $('[data-js="container"]');
	init();
	

	function init() {
		console.log("Welcome to NODE-WEBKIT");

		// bind events
		bindEvents();

		// create context menu
		createContextMenu();
	}

	function bindEvents(){
		// bind reload button
		$context.find('[data-js="reload-page"]').on('click', function reloadPage(){
			if (location) {
				location.reload();	
			}
		});

		// bind opening dev tools
		$context.find('[data-js="open-devtools"]').on('click', function openDevTools(){
			nw.Window.get().showDevTools();
		});
	}

	function createContextMenu(){
		// Context menu
		var contextMenu = new nw.Menu();

		// [entry] Reload Page
		contextMenu.append(new nw.MenuItem({
			label: 'Reload Page',
			icon: 'icons/reload.png',
			click: function reloadPage() {
				if (location) {
					location.reload();
				}
			}
		}));

		// Separator
		contextMenu.append(new nw.MenuItem({
			type: 'separator'
		}));

		// [entry] Dev Tools
		contextMenu.append(new nw.MenuItem({
			label: 'Dev Tools',
			icon: 'icons/devtools.png',
			click: function openDevTools() {
				nw.Window.get().showDevTools();
			}
		}));

		// init context menu
		document.body.addEventListener('contextmenu', function(e){
			e.preventDefault();
			contextMenu.popup(e.x, e.y);
		});
	}
}); 