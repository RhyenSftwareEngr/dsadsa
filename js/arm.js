const root = document.querySelector(":root")
var armOrigin = document.querySelector("#arm").getBoundingClientRect()
const width = armOrigin.right - armOrigin.left
const height = armOrigin.bottom - armOrigin.top

const xOrigin = armOrigin.left + .177083333333 * width
const yOrigin = armOrigin.top + .638888888889 * height

let xPos
let yPos
let theta

window.addEventListener("mousemove", e => {
    x = e.clientX
    y = e.clientY

    var dx = x - xOrigin
    var dy = y - yOrigin

    theta = Math.atan2(dy, dx)
    theta *= 180 / Math.PI

    // console.log(x + ", " + y)
    // console.log(dx + ", " + dy)
    // console.log(theta)

    root.style.setProperty("--arm-rotation", theta + "deg")
})