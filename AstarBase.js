// import
// {
//     mapWidth,
//     mapHeight,
// }from "./Constraint"
let mapWidth = 30;
let mapHeight = 25;
class ANode {
  constructor(x, y) {
    this.parent = null
    this.x = x;
    this.y = y;
    this.f = null;
    this.g = null;
  }
}
class Astar {
  constructor(x, y, targetX, targetY) {
    this.x = x;
    this.y = y;
    this.targetX = targetX;
    this.targetY = targetY;
    this.grid = this._generateGridOfNodes();
  }
  _generateGridOfNodes() {
    let grid = [];
    for (let i = 0; i < mapWidth; i++) {
      grid[i] = [];
      for (let j = 0; j < mapHeight; j++) {
        grid[i][j] = new ANode(i, j);
      }
    }
    return grid;
  }
  getPath() {
    let path = [];
    let current = this.grid[this.targetX][this.targetY];
    while (current.parent) {
      path.push(current);
      current = current.parent;
    }
    path.reverse();
    return path;
  }
  isOutOfBounds(x,y) {
    if (x < 0 || x >= mapWidth || y < 0 || y >= mapHeight) return true;
    return false;
  }
  getNeighbors(node) {
    let neighbors = [];
    let x = node.x;
    let y = node.y;
    let dirX = [-1, 0, 1, -1, 1, -1, 0, 1];
    let dirY = [-1, -1, -1, 0, 0, 1, 1, 1];
    // console.log("is out of bounds check")
    for (let i = 0; i < dirX.length; i++) {
      let newX = x + dirX[i];
      let newY = y + dirY[i];
      if (!this.isOutOfBounds(newX, newY)) {
        // console.log(newX,newY)
        neighbors.push(this.grid[newX][newY]);
      }
    }
    return neighbors;
  }
  euclidDistance(nodeA, nodeB) {
    let distX = nodeA.x - nodeB.x;
    let distY = nodeA.y - nodeB.y;
    return Math.sqrt(distX * distX + distY * distY);
  }
  getLowestFScore(openList) {
    let lowest = 0;
    for (let i = 1; i < openList.length; i++) {
      if (openList[i].f < openList[lowest].f) {
        lowest = i;
      }
    }
    return lowest;
  }
  generatePath() {
    let openList = [];
    let closedList = [];
    this.grid[this.x][this.y].g = 0;
    this.grid[this.x][this.y].f = 0;
    this.grid[this.x][this.y].h = 0;
    let start = this.grid[this.x][this.y];
    let end = this.grid[this.targetX][this.targetY];
    openList.push(start);
    while (openList.length > 0) {
      let lowest = this.getLowestFScore(openList);
      let current = openList[lowest];

      // ketika sampai tujuan
      if (current.x == end.x && current.y == end.y) {
        return this.getPath(current);
      }
      //pop dan masukan ke closedList
      openList.splice(lowest, 1);
      closedList.push(current);
      let neighbors = this.getNeighbors(current);
      // console.log(neighbors);
      for (let i = 0; i < neighbors.length; i++) {
        let neighbor = neighbors[i];
        // jika sudah visited diskip
        if (current.x == end.x && current.y == end.y) {
          return this.getPath(current);
        }

        if (closedList.indexOf(neighbor) > -1) {
          continue;
        }

        //dapatkan gscore
        let gScore = (current.g+1) + this.euclidDistance(current,end);
        let gScoreIsBest = false;
        // console.log(gScore);
        //jika belum ada di open list
        if (openList.indexOf(neighbor) === -1) {
          // console.log("ini baru");
          gScoreIsBest = true;
          neighbor.h = this.euclidDistance(neighbor, end);
          openList.push(neighbor);

        }
        //jika sudah ada di open list maka kita cek lebih bagus atau tidak dari yang di open list
        else if (gScore < neighbor.g) {
          gScoreIsBest = true;
        }
        //jika iya maka kita update gscore
        if (gScoreIsBest) {
          neighbor.parent = current;
          neighbor.g = gScore;
          neighbor.f = neighbor.g + neighbor.h;
        }
      }
    }
    return [];
  }
}

let aStar = new Astar(0, 0, mapWidth - 1, mapHeight - 1);
let path = aStar.generatePath();
console.log(path);