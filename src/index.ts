import './styles.scss';

// Import NoiseJS ---> https://github.com/josephg/noisejs.git
import { noise } from './noisejs/perlin.js';

// Define starting seed for Perlin noise
var seed = 1337;

const canvases = document.getElementsByTagName("canvas") as []HTMLCanvasElement;

const canvas = canvases[0];
const context = canvas.getContext("2d");

context.lineWidth = 25;
context.strokeStyle = "#FF0000";

function updateCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function hexagon(x: number, y: numer, r: number) {
  let angle = 0;
  for(let i = 0; i < 6; i ++) {
    const p = perlinize(x + Math.cos(angle) * r, y + Math.sin(angle) * r);
    context.lineTo(p.x, p.y);
    angle += Math.PI / 3;
  }
  context.closePath();
}

/* Function that takes a point coordinate and returns a Perlin-noise-perturbed point */
function perlinize(x: number, y: number) {
  const scale = 0.01;
  const strength = 20;
 
  const angle = noise.perlin2(x * scale, y * scale) * Math.PI;

  return {
    x: x + Math.cos(angle) * strength,
    y: y + Math.sin(angle) * strength,
  }
}

/* Background drawing function */

function drawTiles(seed: number = seed) {

  // Seed the Perlin noise function
  noise.seed(seed);

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

function redraw() {
  seed = (seed + 5) % (2**16-1); 
  drawTiles(seed);
}

/* Add event listeners and draw background */
window.addEventListener('click', ()=>redraw());
window.addEventListener('resize', ()=>drawTiles());

drawTiles();

