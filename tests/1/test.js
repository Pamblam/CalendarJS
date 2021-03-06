
const Tester	= require("browser-tester");
const path		= require("path");
const expect	= require('chai').expect;

const tester	= new Tester({
	root_path: path.join(__dirname, '../..'), 
	html_path: '/tests/1/index.html',
	omit: ['index.js'],
	append_coverage: true
});

describe("Inner Suite 1", function(){

    before(()=>tester.setup());
    after(()=>tester.teardown());

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
