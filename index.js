import {
  Astar
} from "./utils.js";
/** @type {HTMLCanvasElement} */
(function () {

  let canvas = document.getElementById('canvas');
  let sp = document.getElementById("sp");
  let ep = document.getElementById("ep");
  let drawPath = document.getElementById("drawPath");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const ctx = canvas.getContext('2d');

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.fillStyle = "white";
    Mouse = new UserInput();
    update();
  });

  const mapSize = 255
  const cubeSize = 40;

  class node {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.color = "white";
      this.visitedColor = "red";
      this.visited = false;
      this.parent = null;
      this.g = 0
      this.h = 0
      this.f = 0
    }
    draw() {
      if (this.visited) {
        ctx.fillStyle = this.visitedColor;
      } else {
        ctx.fillStyle = this.color;
      }
      ctx.fillRect(cubeSize * this.x, cubeSize * this.y, cubeSize - 1, cubeSize - 1);
      ctx.fill();
    }
  }


  let map = [];

  function makeMap() {
    for (let i = 0; i <= mapSize; i++) {
      for (let j = 0; j <= mapSize; j++) {
        map[i][j].draw();
      }
    }
  }


  class UserInput {
    constructor() {
      this.state = "drawing";
      this.hold = false;
      this.startingNode = new Set()
      // this.endNodes = []
      this.endNodes = new Set()
      this.sp_color = sp.value
      this.ep_color = ep.value
    }
    recolor(e, x = 0, y = 0) {
      //custom location -> brush tool
      if (Mouse.state == "sp" || Mouse.state == "ep") {
        if (Mouse.state == "sp") {
          if (!Mouse.startingNode.size) {
            // Mouse.startingNode  = {x:Math.floor(x / cubeSize),y:Math.floor(y/ cubeSize)}
            Mouse.startingNode = {
              x: Math.floor(e.offsetX / cubeSize),
              y: Math.floor(e.offsetY / cubeSize)
            }
            map[Math.floor(e.offsetX / cubeSize)][Math.floor(e.offsetY / cubeSize)].color = Mouse.sp_color
          }
        } else {
          Mouse.endNodes={
            x: Math.floor(e.offsetX / cubeSize),
            y: Math.floor(e.offsetY / cubeSize)
          }
          map[Math.floor(e.offsetX / cubeSize)][Math.floor(e.offsetY / cubeSize)].color = Mouse.ep_color;
        }
        return;
      }
      if (x != 0 && y != 0) {
        map[Math.floor(x / cubeSize)][Math.floor(y / cubeSize)].visited = (Mouse.state == "drawing") ? true : false;
        return;
      }
      //1 dot tool
      if (Mouse.state == "drawing" || Mouse.state == "erasing") {
        map[Math.floor(e.offsetX / cubeSize)][Math.floor(e.offsetY / cubeSize)].visited = (Mouse.state == "drawing") ? true : false;
        return;
      }

      if (Mouse.state == "move") {
        map[Mouse.x][Mouse.y].visited = false
        map[Math.floor(e.offsetX / cubeSize)][Math.floor(e.offsetY / cubeSize)].visited = true;
        return;
      }

    }
    checkInput() {
      // console.log(this.state)
      canvas.onclick = this.recolor;
      canvas.onmousedown = (e) => {
        this.hold = true;
      }
      canvas.onmousemove = (e) => {
        if (this.hold) {
          if (this.state == "move") {
            Mouse.x = Math.floor(e.offsetX / cubeSize);
            Mouse.y = Math.floor(e.offsetY / cubeSize);
            return;
          }
          this.recolor(1, e.offsetX, e.offsetY);
        }

      }
      canvas.onmouseup = (e) => {
        this.hold = false;
      }
      window.onkeydown = (e) => {
        //e.keycode =
        if (e.keyCode == 66) {
          Mouse.state = "drawing";
        } else if (e.keyCode == 69) {
          Mouse.state = "erasing";
        } else if (e.keyCode == 86) {
          Mouse.state = "move"
        } else if (e.keyCode == 74) {
          Mouse.state = "sp"
          this.sp_color = sp.value
        } else if (e.keyCode == 75) {
          Mouse.state = "ep"
          this.ep_color = ep.value
        }
        // console.log(e.keyCode)
        // console.log(map.length)
      }
      drawPath.onclick=()=>
      {
        console.log("draw running")
        let findPath = new Astar(this.startingNode.x, this.startingNode.y, this.endNodes.x,this.endNodes.y)
        console.log("searching")
        // findPath.meh();
        findPath.search(findPath,map);
      }

    }
  }

  let Mouse = new UserInput();



  function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    makeMap();
    Mouse.checkInput();
    // console.log(map[5][4].x)
    requestAnimationFrame(update);
  }

  function init() {
    for (let i = 0; i <= mapSize; i++) {
      map[i] = Array(mapSize);
      for (let j = 0; j <= mapSize; j++) {
        map[i][j] = new node(i, j);
      }
    }
    update();
  }
  init()
})()