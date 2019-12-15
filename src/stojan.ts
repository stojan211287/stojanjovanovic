import './styles.scss';

const seedButton = document.getElementById('seed') as HTMLDivElement;

const canvases = document.getElementsByTagName("canvas") as []HTMLCanvasElement;

const canvas = canvases[0];
const context = canvas.getContext("2d");

context.lineWidth = 25;
context.strokeStyle = "#FF0000";

function updateCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function hexagon(x, y, r) {
  let angle = 0;
  for(let i = 0; i < 6; i ++) {
    context.lineTo(x + Math.cos(angle) * r, y + Math.sin(angle) * r);
    angle += Math.PI / 3;
  }
  context.closePath();
}

/* MAIN */

function main() {

  updateCanvasSize();

  const radius = 10;
  const ydelta = Math.sin(Math.PI / 3) * radius;
  let even = true;

  for(let y = 0; y < window.innerHeight; y += ydelta) {
    let offset = 0;
    let yy = y;
    if(even) {
      offset = radius * 1.5;
    }
    
    for(let x = 0; x < window.innerWidth; x += radius * 3) {
      context.beginPath();
      hexagon(x + offset, y, radius);
      context.stroke();
    }
    even = !even;
  }
}

window.addEventListener('resize', ()=>main());
main();
