
const Tester	= require("../BrowserTester.js");
const path		= require("path");
const expect	= require('chai').expect;

const root_path	= path.join(__dirname, '../..');
const html_path	= '/tests/1/index.html';
const tester	= new Tester(root_path, html_path);

describe("Inner Suite 1", function(){

    before(()=>tester.setup(true, false));
    after(()=>tester.teardown(false));

    it("Regular test", function(){
		expect(true).to.be.true;
    });

	it("Browser test", function(done){
		tester.exec(()=>{
			return typeof calendar;
		}).then(data=>{
			expect(data).to.equal('function');
			done();
		});
    });
	
	it("Async browser test", function(done){
		tester.asyncExec(done=>{
			setTimeout(()=>{
				done(typeof calendar);
			}, 750);
		}).then(data=>{
			expect(data).to.equal('function');
			done();
		});
    });

});
