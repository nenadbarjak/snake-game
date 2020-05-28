'use strict'

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')



const onKeyDown = (e) => {
    switch (e.keyCode) {
      case 37:
      case 65:
        direction = 'left'
        break
      case 38:
      case 87:
        direction = 'up'
        break
      case 39:
      case 68:
        direction = 'right'
        break
      case 40:
      case 83:
        direction = 'down'
        break
    }
}

document.addEventListener('keydown', onKeyDown)

const getRandomPosition = () => {
    const min = 0
    let maxX = canvas.width - 20
    let maxY = canvas.height - 20
    let x = Math.floor((Math.random() * (maxX - min + 1) + min) / 20) * 20
    let y = Math.floor((Math.random() * (maxY - min + 1) + min) / 20) * 20

    return {x, y}
}

let snake = [
    {
        x: 0,
        y: 120,
        direction: 'down',
        breakpoints: []
    }, {
        x: 0,
        y: 140,
        direction: 'down',
        breakpoints: []
    }, {
        x: 0,
        y: 160,
        direction: 'down',
        breakpoints: []
    }
]

const apple = getRandomPosition()

let direction = 'right'

let dx = 2
let dy = 2

const moveSquare = (square) => {
    if (square.breakpoints.length && square.x === square.breakpoints[0].x && square.y === square.breakpoints[0].y) {
        square.direction = square.breakpoints[0].direction
        square.breakpoints.shift()
    }

    switch (square.direction) {
        case ('right'):
            square.x = square.x + dx
            if (square.x >= canvas.width) {
                square.x = 0 + square.x - canvas.width
            }
            break

        case ('left'):
            square.x = square.x - dx
            if (square.x <= 0) {
                square.x = canvas.width + square.x
            }
            break

        case ('down'):
            square.y = square.y + dy
            if (square.y >= canvas.height) {
                square.y = 0 + square.y - canvas.height
            }
            break
        
        case ('up'):
            square.y = square.y - dy
            if (square.y <= 0) {
                square.y = canvas.height + square.y
            }
            break        
    }    
}

const gameOver = () => {
    alert('Game Over!')
    
}

const didSnakeBiteItSelf = () => {
    let squares = [...snake]
    const head = squares.pop()

    squares.forEach(square => {
      if (square.x === head.x && square.y === head.y) {
        alert('game over!!!')
      }
    })
  }

const moveSnake = () => { 
    if (snake[snake.length - 1].direction !== direction) {
        snake[snake.length - 1].direction = direction
        
        snake.forEach((square) => {
            square.breakpoints.push({
                x: snake[snake.length - 1].x,
                y: snake[snake.length - 1].y,
                direction: snake[snake.length - 1].direction
            })
        })
    }

    snake.forEach(square => moveSquare(square))
    didSnakeBiteItSelf()
}

const draw = (ctx, location, w, h, color) => {
    ctx.fillStyle = color || 'red'
    ctx.fillRect(location.x, location.y, w, h)
    ctx.strokeStyle = '#fff'
    ctx.lineWidth = 2
    ctx.strokeRect(location.x, location.y, w, h)
}

const update = () => {
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.height)

    draw(ctx, { x: apple.x, y: apple.y}, 20, 20)

    snake.forEach(square => {           
        draw(ctx, { x: square.x, y: square.y }, 20, 20, '#000')
    })

    moveSnake()

    requestAnimationFrame(update)
}

update()
