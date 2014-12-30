
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
        var xVal = x * 80;
        // var xVal = x * 100;
        var yVal = y * 100;
        // var yVal = y * 100;
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
    this.originalIndex = index;
  };


  var Game = function() {
    this.playable = false;
  };

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

    this.shuffle();
    this.moves = 0;
    this.playable = true;
  };

  // Here is where we assemble the html for the play area
  // make the Matrix and Cell objects aware of their responsibilities
  // and do that really cool animation thing
  Game.prototype.assemblePlayArea = function() {
    this.matrix.array.forEach(function(item, i, collection) {
      
        var el = $('<div class="puzzlepiece"><span class="position">'+ Number(i + 1) + '</span></div>')
        $('#puzzlearea').append(el);
        // real cool animation thing
        el.animate({
          top: item.y+'px',
          left: item.x+'px',
          'background-position-x': '-' + item.x + 'px',
          'background-position-y': '-' + item.y + 'px',
        }, 500);
        // animo tada, so good
        el.animo( { animation: 'tada', duration: 1.0 } );
        
        // 
        // is it stupid to store the domObject in memory like this?
        // 
        item.domObject = el;

        // the 'last' or bottom, right tile is the "empty" space
        if (i === collection.length-1) {
          el.fadeOut();
          this.matrix.openCell = item;
        }

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

      $(item.domObject).animo( { animation: 'pulse', iterate: "infinite" } );

      item.domObject.on('mouseover', function(event) {
        $(this).animo('cleanse');
        $(this).addClass('puzzlepiecehover')
      
      }).on('mouseleave', function(event) {
        $(this).animo( { animation: 'pulse', iterate: "infinite" } );
        $(this).removeClass('puzzlepiecehover')  
      
      }).on('click', item, this.shiftPuzzlePiece.bind(this));

      // swipe listener
      item.domObject.swipe({
            //Generic swipe handler for all directions
            swipe:function(event, direction, distance, duration, fingerCount) {
              $(this).trigger('click');
            },
            //the number of pixels the finger can travel across before triggering the effect
            threshold:0
          });

    }.bind(this));
  };


  // This can be a lot cleaner, I'm just tired
  Game.prototype.shiftPuzzlePiece = function(event) {
    this.playSoundEffect();

    this.cleanUpMovables();

    this.moves++;

    var clickedObject = event.data;
    var oldX = clickedObject.x;
    var oldY = clickedObject.y;
    var oldIndex = clickedObject.index
    
    var openCell = this.matrix.openCell;
    

    clickedObject.x = openCell.x;
    clickedObject.y = openCell.y;
    clickedObject.index = openCell.index;
    this.matrix.array[openCell.index] = clickedObject;
    // change dom object too
    $(clickedObject.domObject).animate({
      left: this.matrix.openCell.x,
      top: this.matrix.openCell.y
    }, 200);

    // set openCell to previously occupied cell coordinates
    this.matrix.openCell.x = oldX;
    this.matrix.openCell.y = oldY;
    this.matrix.openCell.index = oldIndex;
    this.matrix.array[oldIndex] = openCell


    // console.log("\n clickedObject.domObject clicked piece\n");
    // console.log(clickedObject.domObject);
    
    // console.log("\n this.matrix.openCell empty space\n");
    // console.log(this.matrix.openCell);
    
    // console.log("\ngame.movables array\n");
    // console.log(this.movables);
    
    // console.log("\nclickedObject from game.movables from event listener\n")
    // console.log(clickedObject)

    // figure out which pieces should be movable
    this.getMovablePieces();

    // add special magical glitter
    this.addEventListeners();
    
    if (this.checkForCompleteness() === true) {
      this.celebrate();
    }
  };

  Game.prototype.playSoundEffect = function() {
    // play the dumb bloop sound
    if (this.moves % 2 === 0) {
      $("#audio1").trigger('play');  
    } else {
      $("#audio2").trigger('play');  
    }
    // $("#audio1").trigger('play');  
    // $("#audio1").prop("currentTime",0);

    
  };


  Game.prototype.cleanUpMovables = function() {
    this.movables.forEach(function(item) {
      item.domObject.off('click');
      item.domObject.off('mouseover');
      item.domObject.off('mouseleave');
      item.domObject.animo('cleanse');
      item.domObject.removeClass('puzzlepiecehover');
    });
  };

  Game.prototype.shuffle = function() {
    for (var i = 0; i < 250; i++) {
      var randomElement = this.movables[Math.floor(Math.random() * this.movables.length)];
      $(randomElement.domObject).trigger('click');
    }
  };

  Game.prototype.checkForCompleteness = function() {
    if (this.playable === false) {return false;}

    var finished = true;

    this.matrix.array.forEach(function(item) {
      // console.log("item index  " + item.index  + " item originalIndex " + item.originalIndex);

      if (item.index !== item.originalIndex) {
        finished = false;
      } 

    });
    return finished;
    
  };


  Game.prototype.celebrate = function() {

    this.cleanUpMovables();

    this.matrix.openCell.domObject.fadeIn();

    var animation = setInterval(function(){
      var item = this.matrix.array.pop();
      item.domObject.animo({ animation: 'bounceOutRight', keep: true });

      if (!this.matrix.array.length) {
        clearInterval(animation)  
        $("#puzzlearea").animo({ animation: 'bounceOutRight', keep: true });
        $("#puzzlearea").html("<div><img src='/images/anchorman.jpg'/></div><br /><h1>Yay For You!</h1>");
        $("#puzzlearea").animo({ animation: 'bounceInLeft', keep: true });
      }

    }.bind(this), 200)

  };





























