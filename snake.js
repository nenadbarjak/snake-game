'use strict'

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

let dx = 1
let dy = 1
const appleImg = document.getElementById('apple')
const bananaImg = document.getElementById('banana')

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
        case 32:
            playing = !playing
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

const getRandomNumber = () => {
    let min = 1
    let max = 10
    return Math.floor(Math.random() * (max - min + 1) + min)
}

const getFruit = () => {
    const apple = {
        img: appleImg,
        value: 1
    }
    
    const banana = {
        img: bananaImg,
        value: 2
    }

    let randomNum = getRandomNumber()
    let current = randomNum === 1 ? banana : apple
    let coords = getRandomPosition()

    return {
        current,
        x: coords.x,
        y: coords.y
    }

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

// let apple = getRandomPosition()
let fruit = getFruit()

let direction = 'right'

const wallsTemplate = {
    level_1: [],
    level_2: [
        {
            xStart: 0, 
            xEnd: 100,
            yStart: 0,
            yEnd: 0
        }, {
            xStart: canvas.width - 100, 
            xEnd: canvas.width,
            yStart: 0,
            yEnd: 0
        }, {
            xStart: 0, 
            xEnd: 0,
            yStart: 0,
            yEnd: 100
        }, {
            xStart: canvas.width, 
            xEnd: canvas.width,
            yStart: 0,
            yEnd: 100
        }, {
            xStart: 0, 
            xEnd: 0,
            yStart: canvas.height - 100,
            yEnd: canvas.height
        }, {
            xStart: canvas.width, 
            xEnd: canvas.width,
            yStart: canvas.height - 100,
            yEnd: canvas.height
        }, {
            xStart: 0, 
            xEnd: 100,
            yStart: canvas.height,
            yEnd: canvas.height
        }, {
            xStart: canvas.width - 100, 
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

let walls = wallsTemplate.level_1
let level = 1

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

const didSnakeEatFruit = () => {
    let head = snake[snake.length - 1]

    if (head.x + 20 >= fruit.x && head.x <= fruit.x + 20 && head.y + 20 >= fruit.y && head.y <= fruit.y + 20) {
        snake.unshift({
            x: (snake[0].direction === 'right') ? (snake[0].x - 20) : ((snake[0].direction === 'left') ? (snake[0].x + 20) : (snake[0].x)),
            y: (snake[0].direction === 'down') ? (snake[0].y - 20) : ((snake[0].direction === 'up') ? (snake[0].y + 20) : (snake[0].y)),
            direction: snake[0].direction,
            breakpoints: [...snake[0].breakpoints]
        })

        score += fruit.current.value
        document.getElementById('scoreboard').innerHTML = score
        fruit = getFruit()

        // TODO: Prebaciti ovo u posebnu funkciju. Naci resenje za slucaj da se score uveca za 2 na 14 ili 29
        if (score % 15 === 0) {
            let tempSnake = []
            for (let i = snake.length - 1; i >= snake.length - 3; i--) {
                tempSnake.push(snake[i])
            }
            let newSnake = tempSnake.reverse()
            snake = [...newSnake]
            level = level < 3 ? level + 1 : level
            walls = wallsTemplate[`level_${level}`]
        } 
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
    didSnakeEatFruit()
}

const drawSnake = (x, y) => {
    ctx.fillStyle = '#000'
    ctx.fillRect(x, y, 20, 20)
    ctx.strokeStyle = '#fff'
    ctx.lineWidth = 2
    ctx.strokeRect(x, y, 20, 20)
}

const drawWalls = (location) => {
    ctx.beginPath()
    ctx.lineWidth = 10
    ctx.strokeStyle = '#000'
    ctx.moveTo(location.xStart, location.yStart)
    ctx.lineTo(location.xEnd, location.yEnd)
    ctx.stroke()
}

const drawFruit = () => {
    ctx.drawImage(fruit.current.img, fruit.x, fruit.y, 20, 20)
}

let playing = false


const update = () => {
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.height)

    walls.forEach(wall => drawWalls(wall))

    drawFruit()


    snake.forEach(square => {           
        drawSnake(square.x, square.y)
    })

    playing && moveSnake()

    requestAnimationFrame(update)
}

update()
