/**
 * @description Created by wulunyi on 16/12/2.
 * @author wulunyi
 */
'use strict';
import chai from 'chai';
// import jsdom from 'mocha-jsdom';
import preView from '../src/pre-view';
import util from '../src/util';

require('jsdom-global')();

describe('pre-view', ()=> {

	it('show is object', ()=> {
		chai.expect(preView).to.be.a('object');
		chai.expect(preView).to.have.property('show');
		chai.expect(preView).to.have.property('hide');
	});

	describe('show param', ()=>{
		it('show srcArr', ()=>{
			var param = preView.show('src').srcArr;
			chai.expect(param).to.be.a('array');
		});

		it('show index', ()=>{
			var param = preView.show('src','fasfdasdf').index;
			chai.expect(param).to.be.a('number');
			chai.expect(param).to.be.equal(0);
		});
	});

	describe('pannel', ()=>{
		it('pannel', ()=>{
			chai.expect(preView.panel).to.be.a('object');
			chai.expect(preView.panel.className).to.be.equal('pre-pannel');
			chai.expect(preView.panel.id).to.be.equal('pre_pannel');
		})
	})
});

describe('util',()=>{
	describe('createDom',()=>{
		it('none praram and options',()=>{
			chai.expect(util.createDom().tagName).to.be.equal('DIV');
		})
	})
})
