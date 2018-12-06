
// https://github.com/gotwarlost/istanbul/issues/132
// https://seleniumhq.github.io/selenium/docs/api/javascript/index.html

require('chromedriver');

const webdriver = require('selenium-webdriver');
const chrome	= require('selenium-webdriver/chrome');
const express	= require('express');
const path		= require("path");

class BrowserTester{
	
	constructor(root_path, html_path, port=3000){
		this.port = port;
		this.root_path = root_path;
		this.html_path = html_path;
		this.server = new TestServer(port, this.root_path);
		this.driver = undefined;
	}
	
	setup(coverage=true, headless=true){
		return new Promise(done=>{
			this.server.do_coverage = coverage;
			this.server.start();
			var opts = headless ? new chrome.Options().headless() : undefined;
			this.driver = new webdriver.Builder().setChromeOptions(opts).forBrowser('chrome').build();
			this.driver.get(`http://127.0.0.1:${this.port}${this.html_path}`);
			this.driver.wait(()=>{
				return this.driver.executeScript('return document.readyState').then(readyState=>{
					return readyState === 'complete';
				});
			}).then(done);
		});
	}
	
	teardown(autoCloseBrowser=true){
		if(autoCloseBrowser) this.driver.quit();
        this.server.stop();
	}
	
	exec(){
		var args = Array.from(arguments);
		var funct = args.shift();
		return this.driver.executeScript(funct, ...args);
	}
	
	asyncExec(){
		var args = Array.from(arguments);
		var funct = args.shift();
		return this.driver.executeAsyncScript(funct, ...args);
	}
	
}

class TestServer{
	
	constructor(port, root){
		this.app = express();
		this.port = port;
		this.do_coverage = false;		
		this.app.use(this.serveFile.bind(this));
		this.app.use(express.static(root));
		this._server = undefined;
	}
	
	isJSRequest(req){
		var filename = path.basename(req.url);
		var extension = path.extname(filename).toLowerCase();
		return extension === '.js';
	}
	
	serveFile(req, res, next){
		if (!this.do_coverage || !this.isJSRequest(req)) return next();
		// manually instrument the code and send it here....
		return res.send("console.log('farts'); window.calendar = function(){};");
	}
	
	start(){
		if(!this._server){
			this._server = this.app.listen(this.port);
		}
		return this;
	}
	
	stop(){
		if(this._server){
			this._server.close();
		}
		return this;
	}
}

module.exports = BrowserTester;