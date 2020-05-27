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
        y: 160
    }, {
        x: 20,
        y: 160
    }, {
        x: 40,
        y: 160
    }
]

const apple = getRandomPosition()

let direction = 'right'

const moveSnake = () => {
    let head = snake[snake.length - 1]
    switch (direction) {
        case ('right'):
            if (head.x === canvas.width -20) {
                head = { x: 0, y: head.y}
            } else {
                head = { x: head.x + 20, y: head.y}
            }
            break

        case ('left'):
            if (head.x === 0) {
                head = { x: canvas.width -20, y: head.y}
            } else {
                head = { x: head.x - 20, y: head.y}
            }
            break

        case ('down'):
            if (head.y === canvas.height - 20) {
                head = { x: head.x, y: 0}
            } else {
                head = { x: head.x , y: head.y + 20}
            }
            break

        case ('up'):
            if (head.y === 0) {
                head = { x: head.x, y: canvas.height - 20}
            } else {
                head = { x: head.x , y: head.y - 20}
            }
            break
    }
    snake.push(head)
    snake.shift()
}

const draw = (ctx, location, w, h, color) => {
    ctx.fillStyle = color || 'red'
    ctx.fillRect(location.x, location.y, w, h)
    ctx.strokeStyle = '#fff'
    ctx.lineWidth = 2
    ctx.strokeRect(location.x, location.y, w, h)
}

let counter = 1
let speed = 0

const update = () => {
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.height)

    draw(ctx, { x: apple.x, y: apple.y}, 20, 20)

    snake.forEach(square => {           
        draw(ctx, { x: square.x, y: square.y }, 20, 20, '#000')
    })

    if (counter === 1 || counter % (10 - speed) === 0) {
        moveSnake()
    }
    counter++

    requestAnimationFrame(update)
}

update()
