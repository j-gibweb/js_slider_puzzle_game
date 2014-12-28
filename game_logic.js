
  var Matrix = function(n) {
    this.n = n;
    this.array = [];
    this.openCell = null;
  };

  // populate matrix.array with N*N instances of cell class with unique x and y coords
  Matrix.prototype.initialize = function() {
    var n = this.n;
    var index = 0;

    for (var y = 0; y < n; y++) {
      for (var x = 0; x < n; x++) {
        // multiply x and y coords by 100, because they also serve as pixel values
        // this seems like kind of bad design, not sure.
        var xVal = x * 100;
        var yVal = y * 100;
        var cell = new Cell(xVal, yVal, index);
        
        this.array.push(cell);
        index++;
      } 
    }
  };

  var Cell = function(x, y, index) {
    this.x = x;
    this.y = y;
    this.domObject = null;
    this.index = index;
  };


  var Game = function() {};

  Game.prototype.initialize =  function(imageStub) {
    // storing the matrix object as a param on this here client side game object~
    this.matrix = new Matrix(imageStub.n);
    this.matrix.initialize();
    // initialize game pieces in the DOM
    this.assemblePlayArea();
    // figure out which pieces should be movable
    this.getMovablePieces();

    // add special magical glitter
    this.addEventListeners();
  };

  // Here is where we assemble the html for the play area
  // make the Matrix and Cell objects aware of their responsibilities
  // and do that really cool animation thing
  Game.prototype.assemblePlayArea = function() {
    this.matrix.array.forEach(function(item, i, collection) {
      // if we aren't creating the 'last' or bottom, right tile
      if (i !== collection.length-1) {
        var el = $('<div class="puzzlepiece"><span class="position">'+ Number(i + 1) + '</span></div>')
        $('#puzzlearea').append(el);
        // real cool animation thing
        el.animate({
          top: item.y+'px',
          left: item.x+'px',
          'background-position-x': '-' + item.x + 'px',
          'background-position-y': '-' + item.y + 'px',
        }, 1000);
        item.domObject = el;
      // insert empty div with empty class.
      } else {
        var el = $('<div class="empty"></div>')
        $('#puzzlearea').append(el);
        item.domObject = el;
        this.matrix.openCell = item;
      }
      // bind game object to anon function in iterator loop
    }.bind(this));
  };

  Game.prototype.getMovablePieces = function() {
    
    var openCell = this.matrix.openCell;

    // top, right, bottom, left
    this.movables = [ this.matrix.array[openCell.index - 4], 
                      this.matrix.array[openCell.index + 1], 
                      this.matrix.array[openCell.index + 4], 
                      this.matrix.array[openCell.index - 1]
                    ];

    // check right
    if ( (openCell.index + 1) % this.matrix.n === 0 ) { 
      delete this.movables[1];
    }
    // check left
    if ( (openCell.index) % this.matrix.n === 0 ) { 
      delete this.movables[3];
    }
    
    this.movables = this.movables.filter(function(item) {
      if (item !== undefined) {
        return item;
      }
    });

  };


  Game.prototype.addEventListeners = function() {
    this.movables.forEach(function(item) {
      console.log(item);
      // puzzleAreaContents[movables[i]].addEventListener("mouseover", addPuzzlePieceHover, false);
      
      // puzzleAreaContents[movables[i]].addEventListener("mouseout", removePuzzlePieceHover, false);
      // puzzleAreaContents[movables[i]].addEventListener("click", shiftPuzzlePiece);
    }.bind(this));
  }




































