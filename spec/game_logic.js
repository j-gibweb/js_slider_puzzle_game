
/* global game_logic, describe, it, expect, should */

describe('Game object', function () {
  'use strict';

  var n = 4;
  var matrix = new Matrix(n);
  
  var imageStub = {
    width: 400,
    n: 4,
  };
  var game = new Game();
  game.initialize(imageStub);  

  beforeEach(function() {});

  it('exists', function () {
    expect(game.matrix).to.be.a('object');
  });

  it('creates a new array of n by n size', function () {
    expect(game.matrix.array.length).to.equal(n*n);
  });

  it('initializes X cells as expected', function () {
    var testArrayX = [0,100,200,300,0,100,200,300,0,100,200,300,0,100,200,300];    
    matrix.array.forEach(function(item, i) {
      expect(item.x).to.equal(testArrayX[i]); 
    });  
  });

  it('initializes Y cells as expected', function () {
    var testArrayY = [0,0,0,0,100,100,100,100,200,200,200,200,300,300,300,300];    
    matrix.array.forEach(function(item, i) {
      expect(item.y).to.equal(testArrayY[i]); 
    });  
  });

  it('initializes the open cell object to be the last cell in the array', function () {
    expect(game.matrix.openCell.x).to.equal((n-1)*100); 
    expect(game.matrix.openCell.y).to.equal((n-1)*100); 
    expect(game.matrix.openCell.domObject.hasClass('empty')).to.equal(true); 
  });

  it('should contain valid cells in the game.movables array', function () {
    expect(game.movables).to.contain(11);
    expect(game.movables).to.contain(14); 
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