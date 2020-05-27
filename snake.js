'use strict'

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

const snake = [
    [0, 160],
    [20, 160],
    [40, 160]
]

const draw = (ctx, location, w, h, color) => {
    ctx.fillStyle = color || 'red'
    ctx.fillRect(location.x, location.y, w, h)
    ctx.strokeStyle = '#fff'
    ctx.lineWidth = 2
    ctx.strokeRect(location.x, location.y, w, h)
}

const update = () => {
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.height)

    snake.forEach(square => {           
        draw(ctx, { x: square[0], y: square[1] }, 20, 20, '#000')
    })

    snake.forEach(square => square[0] = square[0] + 3)

    requestAnimationFrame(update)
}

update()
