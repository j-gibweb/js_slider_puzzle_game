  
  var Matrix = function(n) {
    this.n = n;
    this.grid = [];
  };

  Matrix.prototype.initialize = function() {
    var n = this.n;
    
    for (var y = 0; y < n; y++) {
      for (var x = 0; x < n; x++) {
        // multiply x and y coords by 100, because they also serve as pixel values
        // this seems like kind of bad design, not sure.
        var xVal = x * 100;
        var yVal = y * 100;
        // if this is the bottom, right position in the grid, open = true
        var open = (y === n-1 && x === n-1 ? true : false);
        var cell = new Cell(xVal, yVal, open);   
        this.grid.push(cell);
      } 
    }
    return this.grid;
  };

  var Cell = function(x, y, open) {
    this.x = x;
    this.y = y;
    this.open = open;
  };




