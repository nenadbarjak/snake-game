'use strict'

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

let dx = 1
let dy = 1

document.getElementById('speed-slider').addEventListener('change', (e) => {
    switch (e.target.value) {
        case '1':
            dx = 1
            dy = 1
            break
        case '2':
            dx = 2
            dy = 2
            break
        case '3':
            dx = 4
            dy = 4
            break
        case '4':
            dx = 5
            dy = 5
            break
        case '5':
            dx = 10
            dy = 10
            break
    }
})

const onKeyDown = (e) => {
    switch (e.keyCode) {
      case 37:
      case 65:
        snake[snake.length - 1].direction === 'right' ? gameOver() : direction = 'left'
        break
      case 38:
      case 87:
        snake[snake.length - 1].direction === 'down' ? gameOver() : direction = 'up'
        break
      case 39:
      case 68:
        snake[snake.length - 1].direction === 'left' ? gameOver() : direction = 'right'
        break
      case 40:
      case 83:
        snake[snake.length - 1].direction === 'up' ? gameOver() : direction = 'down'
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
        y: 160,
        direction: 'right',
        breakpoints: []
    }, {
        x: 20,
        y: 160,
        direction: 'right',
        breakpoints: []
    }, {
        x: 40,
        y: 160,
        direction: 'right',
        breakpoints: []
    }
]

let apple = getRandomPosition()

let direction = 'right'

const wallsTemplate = {
    level_1: [],
    level_2: [
        {
            xStart: 0, 
            xEnd: 150,
            yStart: 0,
            yEnd: 0
        }, {
            xStart: canvas.width - 150, 
            xEnd: canvas.width,
            yStart: 0,
            yEnd: 0
        }, {
            xStart: 0, 
            xEnd: 0,
            yStart: 0,
            yEnd: 150
        }, {
            xStart: canvas.width, 
            xEnd: canvas.width,
            yStart: 0,
            yEnd: 150
        }, {
            xStart: 0, 
            xEnd: 0,
            yStart: canvas.height - 150,
            yEnd: canvas.height
        }, {
            xStart: canvas.width, 
            xEnd: canvas.width,
            yStart: canvas.height - 150,
            yEnd: canvas.height
        }, {
            xStart: 0, 
            xEnd: 150,
            yStart: canvas.height,
            yEnd: canvas.height
        }, {
            xStart: canvas.width - 150, 
            xEnd: canvas.width,
            yStart: canvas.height,
            yEnd: canvas.height
        }
    ],
    level_3: [
        {
            xStart: 0,
            xEnd: canvas.width,
            yStart: 0,
            yEnd: 0
        }, {
            xStart: canvas.width,
            xEnd: canvas.width,
            yStart: 0,
            yEnd: canvas.height
        }, {
            xStart: 0,
            xEnd: 0,
            yStart: 0,
            yEnd: canvas.height
        }, {
            xStart: 0,
            xEnd: canvas.width,
            yStart: canvas.height,
            yEnd: canvas.height
        }
    ]
}

let walls = wallsTemplate.level_2

let score = 0

const moveSquare = (square) => {
    if (square.breakpoints.length && square.x === square.breakpoints[0].x && square.y === square.breakpoints[0].y) {
        square.direction = square.breakpoints[0].direction
        square.breakpoints.shift()
    }

    switch (square.direction) {
        case ('right'):
            square.x = square.x + dx

            if (walls.length && walls.some(wall => (square.x + 20 >= canvas.width && square.y + 20 >= wall.yStart && square.y <= wall.yEnd) || (((square.y <= 5) || (square.y + 20 >= canvas.height - 5)) && (square.x + 20 >= wall.xStart && square.x + 20 <= wall.xEnd)))) {
                gameOver()
            } else if (square.x >= canvas.width) {
                square.x = 0 + square.x - canvas.width
            }
            break

        case ('left'):
            square.x = square.x - dx

            if (walls.length && walls.some(wall => (square.x <= 0  && square.y + 20 >= wall.yStart && square.y <= wall.yEnd) || (square.x >= wall.xStart && square.x <= wall.xEnd && ((square.y + 20 >= canvas.height - 5) || (square.y <= 5))))) {
                gameOver()
            } else if (square.x <= 0) {
                square.x = canvas.width + square.x
            }
            break

        case ('down'):
            square.y = square.y + dy

            if (walls.length && walls.some(wall => (square.x + 20 >= wall.xStart && square.x <= wall.xEnd && square.y + 20 >= canvas.height) || (((square.x <= 5) || (square.x + 20 >= canvas.width - 5)) && (square.y + 20 >= wall.yStart && square.y <= wall.yEnd)))) {
                gameOver()
            } else if (square.y >= canvas.height) {
                square.y = 0 + square.y - canvas.height
            }
            break
        
        case ('up'):
            square.y = square.y - dy

            if (walls.length && walls.some(wall => (square.x + 20 >= wall.xStart && square.x <= wall.xEnd && square.y <= 0) || (((square.x <= 5) || (square.x + 20 >= canvas.width - 5)) && (square.y >= wall.yStart && square.y <= wall.yEnd)))) {
                gameOver()
            } else if (square.y <= 0) {
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

    for (let i = 0; i < squares.length -2; i++) {
        if (head.x + 20 >= squares[i].x && head.x <= squares[i].x + 20 && head.y + 20 >= squares[i].y && head.y <= squares[i].y +20) {
            alert('game over!!!')
        }
    }
}

const didSnakeEatApple = () => {
    let head = snake[snake.length - 1]

    if (head.x + 20 >= apple.x && head.x <= apple.x + 20 && head.y + 20 >= apple.y && head.y <= apple.y + 20) {
        snake.unshift({
            x: (snake[0].direction === 'right') ? (snake[0].x - 20) : ((snake[0].direction === 'left') ? (snake[0].x + 20) : (snake[0].x)),
            y: (snake[0].direction === 'down') ? (snake[0].y - 20) : ((snake[0].direction === 'up') ? (snake[0].y + 20) : (snake[0].y)),
            direction: snake[0].direction,
            breakpoints: [...snake[0].breakpoints]
        })

        apple = getRandomPosition()
        score++
        document.getElementById('scoreboard').innerHTML = score
    }
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
    didSnakeEatApple()
}

const draw = (ctx, location, w, h, color) => {
    ctx.fillStyle = color || 'red'
    ctx.fillRect(location.x, location.y, w, h)
    ctx.strokeStyle = '#fff'
    ctx.lineWidth = 2
    ctx.strokeRect(location.x, location.y, w, h)
}

const drawWalls = (location) => {
    ctx.beginPath()
    ctx.lineWidth = 10
    ctx.strokeStyle = '#000'
    ctx.moveTo(location.xStart, location.yStart)
    ctx.lineTo(location.xEnd, location.yEnd)
    ctx.stroke()
}

const update = () => {
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.height)

    walls.forEach(wall => drawWalls(wall))

    draw(ctx, { x: apple.x, y: apple.y}, 20, 20)

    snake.forEach(square => {           
        draw(ctx, { x: square.x, y: square.y }, 20, 20, '#000')
    })

    moveSnake()

    requestAnimationFrame(update)
}

update()
