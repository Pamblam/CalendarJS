var webdriver = require('selenium-webdriver');
var chrome = require('selenium-webdriver/chrome');
require('chromedriver');

var driver = new webdriver.Builder()
	.setChromeOptions() // or for headless use: .setChromeOptions(new chrome.Options().headless())
	.forBrowser('chrome')
	.build();


//driver.get('http://localhost/CalendarJS/tests/1/'); //__dirname+"/index.html");
driver.get(__dirname+"/index.html");
	
	
	
//
//describe("Inner Suite 1", function(){
//
//    before(function(){
//
//        // do something before test suite execution
//        // no matter if there are failed cases
//
//    });
//
//    after(function(){
//
//        // do something after test suite execution is finished
//        // no matter if there are failed cases
//
//    });
//
//    beforeEach(function(){
//
//        // do something before test case execution
//        // no matter if there are failed cases
//
//    });
//
//    afterEach(function(){
//
//        // do something after test case execution is finished
//        // no matter if there are failed cases
//
//    });
//
//    it("Test-1", function(){
//
//        // test Code
//        // assertions
//
//    });
//
//    it("Test-2", function(){
//
//        // test Code
//        // assertions
//
//    });
//
//    it("Test-3", function(){
//
//        // test Code
//        // assertions
//
//    });
//
//});
