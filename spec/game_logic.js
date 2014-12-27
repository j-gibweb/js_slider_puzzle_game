/* global game_logic, describe, it, expect, should */

describe('Matrix Class', function () {
  'use strict';

  var n = 4;
  var matrix = new Matrix(n);
    

  beforeEach(function() {
    
  });

  it('exists', function () {
    expect(matrix).to.be.a('object');
  });

  it('creates a new grid of n by n size', function () {
    expect(matrix.initialize().length).to.equal(n*n);
  });

  it('initializes X cells as expected', function () {
    var testArrayX = [0,100,200,300,0,100,200,300,0,100,200,300,0,100,200,300];    
    matrix.grid.forEach(function(item, i) {
      expect(item.x).to.equal(testArrayX[i]); 
    });  
  });

  it('initializes Y cells as expected', function () {
    var testArrayY = [0,0,0,0,100,100,100,100,200,200,200,200,300,300,300,300];    
    matrix.grid.forEach(function(item, i) {
      expect(item.y).to.equal(testArrayY[i]); 
    });  
  });

  it('initializes open property as expected', function () {
    var testArrayOpen = [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,true];    
    matrix.grid.forEach(function(item, i) {
      expect(item.open).to.equal(testArrayOpen[i]); 
    });  
  });


  
});


describe('Cell Class', function () {
  'use strict';

  var cell;

  beforeEach(function() {
    cell = new Cell(0, 0, false);
  });

  it('exists', function () {
    expect(cell).to.be.a('object');
  });

  it('returns false if cell is not open', function () {
    expect(cell.open).to.equal(false);
  });

  it('does something else', function () {
    expect(true).to.equal(false);
  });

  // Add more assertions here
});











// var request = require('request');
// describe('visiting the supplied game link should render the game page',function(){
//   it("should return a valid url for an image", function(done) {
//     request("http://localhost:3000", function(error, response, body){
//       expect(body).toEqual("hello world");
//       done();
//     });
//   });
// });