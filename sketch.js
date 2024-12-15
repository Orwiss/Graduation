let images = [], grid = [], cols, rows, seed
let cellSize = 100 / 4, sizes = [1, 2, 2, 2, 4, 4, 4]

function preload() {
  for (let i = 1; i <= 5; i++)  images.push(loadImage(`${i}.png`))
}

function setup() {
  createCanvas(3200 / 2, 1600 / 2)
  imageMode(CENTER)
  noLoop()
  randomSeed(0)

  cols = width / cellSize
  rows = height / cellSize

  for (let i = 0; i < cols; i++) {
    grid[i] = []
    for (let j = 0; j < rows; j++) grid[i][j] = false
  }
  
  for (let i = 0; i < 10; i++) fillGrid()
}

function draw() {
  background(255)
  drawBlocks()
}

function fillGrid() {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (!grid[x][y]) {
        let size = random(sizes)
        if (canPlace(x, y, size)) placeBlock(x, y, size)
      }
    }
  }
}

function canPlace(x, y, size) {
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (x + i >= cols || y + j >= rows || grid[x + i][y + j]) return false;
    }
  }
  return true;
}

function placeBlock(x, y, size) {
  let img = random(images)
  let px = x * cellSize
  let py = y * cellSize
  let rotation = int(random(4)) * 90

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) grid[x + i][y + j] = { size: size,
                                                          img: img,
                                                          px: px,
                                                          py: py,
                                                          rotation: rotation }
  }
}

function drawBlocks() {
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      let cell = grid[x][y]
      if (cell && cell.img) {
        push()
        translate(cell.px + (cell.size * cellSize) / 2, cell.py + (cell.size * cellSize) / 2)
        rotate(radians(cell.rotation))
        image(cell.img, 0, 0, cell.size * cellSize, cell.size * cellSize)
        pop()
      }
    }
  }
}