node-webkit-example
===================
This is an example node-webkit app.  It is very bare bones and could be used as a simple boilerplate to get up and running quickly.  A Gulp workflow is provided for CSS/JavaScript development.

<!-- formating of html elements -->
<style>
  table { border: 1px solid #ddd; }
  td { vertical-align: top; padding: 5px; border: 1px solid #ddd; }
  td code { margin: 5px; padding: 1px 3px; line-height: 1.5; }
</style>

<br>
####Requirements
To run this example you will need node-webkit in the root of this project folder.  The easiest was to do this is to download the version that corresponds to your operating system here:<br>
https://github.com/rogerwang/node-webkit#downloads

Once you have node-webkit you can run the example by running the following from your terminal at the project root folder:
````
nw.exe app
````

<br>
####Development
To start making changes to the example app you need to install all Gulp dependencies.  From the Gulp directory in your terminal, run the following:
````
npm install
````
Note that this Gulp workflow is using gulp-ruby-sass, so you will also need the Sass Gem installed if you dont already have it.  You can alternatively use your favorite Sass compiler, but I find Ruby Sass to suite all my needs.

The following Gulp tasks have been defined and can be run from the gulp location in your terminal:

<table>
  <tr>
    <td>`gulp`</td>
    <td>default task that compiles your css and javascript, watches for any css/javascript changes, and runs the example app</td>
  </tr>
  <tr>
    <td>`gulp build`</td>
    <td>compile and minifiy css and javascript files</td>
  </tr>
  <tr>
    <td>`gulp app`</td>
    <td>open the example app by running "nw.exe app" from gulp-shell</td>
  </tr>
</table>

<br>
####Folder Structure
````
Root
> ... extracted node-webkit files (nw.exe, etc.)
> [gulp]
	> [src]
		> [js]
			> script.js (main script file for app)
			> ... (modules like jquery that are included in scripts.js)
		> [scss]
	> gulpfile.js
	> package.json
>  [app]
	> ... app files and folders (index.html, style.css, etc.)
````

<br>
####Resources
Shane Gavin over at nodehead.com has put together a great mini-series on getting started with node-webkit.  Here are links to the six videos

1. http://nodehead.com/node-webkit-introduction-16/
2. http://nodehead.com/node-webkit-custom-window-controls-26/
3. http://nodehead.com/node-webkit-the-manifest-file/
4. http://nodehead.com/node-webkit-context-and-window-menus/
5. http://nodehead.com/node-webkit-using-node-js-modules/
6. http://nodehead.com/node-webkit-wrapping-it-up/