class Grid {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.obstacles = [];
    }
    
    addObstacle(x,y) {
        this.obstacles.push([x,y]);
    }

    obstacles() {
        return this.obstacles;
    }
  }

module.exports = Grid;
  