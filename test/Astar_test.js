const manhattanDistance = (x, y, xTarget, yTarget) => {
  return Math.abs(x - xTarget) + Math.abs(y - yTarget)
}

//center
console.log(manhattanDistance(1,2,6,7))

console.log(manhattanDistance(0,2,6,7))
console.log(manhattanDistance(2,2,6,7))

console.log(manhattanDistance(1,1,6,7))
console.log(manhattanDistance(1,3,6,7))

console.log(manhattanDistance(0,0,6,7))

