let algo = document.getElementById("algorithm")
const backTrack = (node, {
  x,
  y
}) => {
  // let path = [];
  let current = node;
  // while(current)
  // {
    for(let i = 0; i < 500; i++)
    {
      current.visitedColor = "blue"
      current = current.parent
    }
  // }
  // console.log(x,y)
  // return path;
}
const isOutOfBounds = (x, y, size) => {
  return (x < 0 || x > size || y < 0 || y > size) ? true : false;
}

class Astar {
  constructor(x, y, xTarget, yTarget) {
    this.start = {
      x: x,
      y: y
    };
    this.target = {
      x: xTarget,
      y: yTarget
    };
    this.open_list = [];
    this.closed_list = [];
  }
}

Astar.prototype.meh = () => {
  console.log(this.start.x)
}

const selectAlgo = (obj,x, y, targetx, targety) =>{
  console.log(algo.value)
  if(algo.value=="md")
  {
    return obj.manhattanDistance(x, y, targetx, targety)
  }
  if(algo.value=="dd")
  {
    return obj.diagonalDistance(x, y, targetx, targety)
  }
  if(algo.value=="ed")
  {
    return obj.euclidDistance(x, y, targetx, targety)
  }
}
Astar.prototype.search = (obj, arr) => {
  arr[obj.start.x][obj.start.y].h = 0
  arr[obj.start.x][obj.start.y].g = 0
  arr[obj.start.x][obj.start.y].f = 0
  arr[obj.start.x][obj.start.y].parent = null
  obj.open_list.push(arr[obj.start.x][obj.start.y]);
  let done = false
  let currNode = null;
  while (obj.open_list.length > 0) {
    if (done) {
      break;
    }
    currNode = obj.open_list[0];
    for (let i in obj.open_list) {
      if (obj.open_list[i].f < currNode.f)
        currNode = obj.open_list[i]
    }
    let indexCurr = obj.open_list.findIndex(item => (item.x == currNode.x && item.y == currNode.y))
    obj.open_list.splice(indexCurr, 1);
    let neighbors = obj.getNeighbor(arr, currNode.x, currNode.y)
    // for (let i of neighbors) {
    //   let h = obj.manhattanDistance(i.x, i.y, obj.target.x, obj.target.y)
    //   let g = currNode.g + 1
    //   console.log(h + g)

    // if (i.x == obj.target.x && i.y == obj.target.y) {
    //       console.log("FOUND!!")
    //       break;
    // }
    // }
    for (let i of neighbors) {
      if (i.x == obj.target.x && i.y == obj.target.y) {
        backTrack(i, obj.start)
        console.log("FOUND!!")
        done = true
      } else {
        i.g = currNode.g++
        i.h = selectAlgo(obj,i.x, i.y, obj.target.x, obj.target.y)
        i.f = i.g + i.h
        // if(i.g<currNode.g)
        // {
        let indexInOpenList = obj.open_list.findIndex(item => (item.x == i.x && item.y == i.y));
        if (indexInOpenList != -1) {
          if (i.f > obj.open_list[indexInOpenList].f) {
            return;
          }
        }
        let indexInClosedList = obj.closed_list.findIndex(item => (item.x == i.x && item.y == i.y));
        if (indexInClosedList != -1) {
          if (i.f > obj.closed_list[indexInClosedList].f) {
            return;
          }
        }
        obj.open_list.push(i)

        // }
      }
    }
    obj.closed_list.push(currNode)
  }
}

Astar.prototype.manhattanDistance = (x, y, xTarget, yTarget) => {
  return Math.abs(x - xTarget) + Math.abs(y - yTarget)
}
Astar.prototype.diagonalDistance = (x, y, xTarget, yTarget) => {
  //h = D * (dx + dy) + (D2 - 2 * D) * min(dx, dy)
  let dx = Math.abs(x - xTarget),
    dy = Math.abs(y - yTarget);
  return 1 * (dx + dy) + (Math.sqrt(2) - 2 * 1) * Math.min(dx, dy)
}
Astar.prototype.euclidDistance = (x, y, xTarget, yTarget) => {
  return Math.sqrt((x - xTarget) * (x - xTarget) + (y - yTarget) * (y - yTarget))
}

function random_rgba() {
  var o = Math.round,
    r = Math.random,
    s = 255;
  return 'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ',' + r().toFixed(1) + ')';
}

Astar.prototype.getNeighbor = (arr, i, j) => {
  // console.log("inside getNeighbor")
  // diagonal left
  let successor = []
  if (!isOutOfBounds(i, j - 1, arr.length) && !arr[i][j - 1].visited)
    successor.push(arr[i][j - 1])
  if (!isOutOfBounds(i, j + 1, arr.length) && !arr[i][j + 1].visited)
    successor.push(arr[i][j + 1])

  //center horizontal
  if (!isOutOfBounds(i - 1, j, arr.length) && !arr[i - 1][j].visited)
    successor.push(arr[i - 1][j])
  if (!isOutOfBounds(i + 1, j, arr.length) && !arr[i + 1][j].visited)
    successor.push(arr[i + 1][j])

  var color = "green";
  for (let children of successor) {
    children.parent = arr[i][j];
    children.visitedColor = color
    children.visited = true
  }
  return successor;

}
class Grid {
  constructor(size) {
    this.width = size;
    this.height = size;
    this.nodes = _generateGrid(size)
  }
}
// Grid.prototype._generateGrid = (size) =>{
//   map = []
//   for(let i = 0; i < size; i++)
//   {
//     let i = Array(i)
//     for(let j = 0; j < size; j++)
//     {
//       map.push(i[i][j] = nodes)
//     }
//   }
// }


export {
  Astar
};