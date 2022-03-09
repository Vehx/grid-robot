
// robot needs to be placed on grid (x,y) and face a direction ("north")
// robot takes movement in the form of a string? "fflff"
// for each step it needs to check if it can move in the indicated direction
// if not it should say it encountered an obstacle

class Robot {
    constructor(x, y, facing) {
        this.x = x;
        this.y = y;
        this.facing = facing.toUpperCase();
        this.ranIntoObstacle = false;
        this.isOutOfBounds = false;
        this.status = 'Idle';
    };

    move(moveString, grid) {
        const moveArray = moveString.split('');
        let nextPosition;
        for (let i = 0; i < moveArray.length; i++) {
            const currentMove = moveArray[i];

            if (currentMove == 'l' || currentMove == 'r') {
                this.changeFacing(currentMove);
            } else {
                nextPosition = this.calculateNextMove(currentMove);
                this.checkOutOfBounds(nextPosition.x, nextPosition.y, grid);
                this.checkForObstacle(nextPosition.x, nextPosition.y, grid);
    
                if (this.isOutOfBounds == false && this.ranIntoObstacle == false) {
                    this.x = nextPosition.x;
                    this.y = nextPosition.y;
                } else {
                    if (this.ranIntoObstacle == true) {
                        this.status = `Robot ran into obstacle located at y:${nextPosition.y}, x:${nextPosition.x}. Robot stopped at: ${this.position()}`;
                    } else {
                        this.status = `Robot ran out of bounds. Robot stopped at: ${this.position()}`;
                    }
                    break;
                }
            };
            this.status = `Robot finished command sequence. Robot stopped at: ${this.position()}`;
        };
        return true;
    };

    calculateNextMove(move) {
        let nextX = this.x;
        let nextY = this.y;

        if (move == 'f') {
            switch (this.facing) {
                case 'NORTH':
                    nextX = nextX - 1;
                    break;
                case 'EAST':
                    nextY = nextY + 1;
                    break;
                case 'SOUTH':
                    nextX = nextX + 1;
                    break;
                default:
                    nextY = nextY - 1;
                    break;
            };
        } else {
            switch (this.facing) {
                case 'NORTH':
                    nextX = nextX + 1;
                    break;
                case 'EAST':
                    nextY = nextY - 1;
                    break;
                case 'SOUTH':
                    nextX = nextX - 1;
                    break;
                default:
                    nextY = nextY + 1;
                    break;
            };
        };
        return {x: nextX, y: nextY};
    };

    changeFacing(directionChange) {
        switch (directionChange) {
            case 'l':
                switch (this.facing) {
                    case 'NORTH':
                        this.facing = 'WEST';
                        break;
                    case 'EAST':
                        this.facing = 'NORTH';
                        break;
                    case 'SOUTH':
                        this.facing = 'EAST';
                        break;
                    default:
                        this.facing = 'SOUTH';
                        break;
                };
                break;
            case 'r':
                switch (this.facing) {
                  case 'NORTH':
                      this.facing = 'EAST';
                      break;
                  case 'EAST':
                      this.facing = 'SOUTH';
                      break;
                  case 'SOUTH':
                      this.facing = 'WEST';
                      break;
                  default:
                      this.facing = 'NORTH';
                      break;
                };
                break;
            default:
                break;
        };
    };

    checkOutOfBounds(x, y, grid) {
        if (x < 0 || x > grid.x || y < 0 || y > grid.y) {
            this.isOutOfBounds = true;
        };
    };

    checkForObstacle(x, y, grid) {
      let obstacles = grid.obstacles;
        if (obstacles && obstacles.length > 0) {
            obstacles.forEach(obstacle => {
                if (obstacle.x == x && obstacle.y == y) {
                    this.ranIntoObstacle = true;
                };
            });
        };
    };

    face() {
        return this.facing;
    };

    position() {
        return `${this.y}, ${this.x}`;
    };
};

module.exports = Robot;