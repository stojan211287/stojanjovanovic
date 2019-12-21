import './styles.scss';

// Import NoiseJS ---> https://github.com/josephg/noisejs.git
import { noise } from './noisejs/perlin.js';

// Define starting seed for Perlin noise
var seed = 567122400;

// Perlin noise params
const perlinScale = 0.01;
const perlinStrength = 20;

// Prepare canvas and context
const canvases = document.getElementsByTagName("canvas") as []HTMLCanvasElement;

const canvas = canvases[0];
const context = canvas.getContext("2d");

context.lineWidth = 20;
context.strokeStyle = "#FF0000";

function updateCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

/* Hexagon drawing function */ 
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
 
  const angle = noise.perlin2(x * perlinScale, y * perlinScale) * Math.PI;

  return {
    x: x + Math.cos(angle) * perlinStrength,
    y: y + Math.sin(angle) * perlinStrength,
  }
}

/* Hexagon shading function */
function shade(x: number, y: number) {
  // noise.perlin2 returns a number in {-1, 1}, so we need to re-scale to {0, 1}
  const shadeValue = ( noise.perlin2(x * perlinScale, y * perlinScale) + 1 ) / 2;
  // Re-scale shade to [0, 255]
  const shadeRGB = 255 - shadeValue*255;
  return "rgb(" + shadeRGB + "," + shadeRGB + "," + shadeRGB + ")";
}

/* Background drawing function */

function drawTiles(seed: number = seed) {

  // Seed the Perlin noise function
  noise.seed(seed);

  updateCanvasSize();

  const radius = 10;
  const ydelta = Math.sin(Math.PI / 3) * radius;
  let even = true;

  for(let y = -ydelta; y < window.innerHeight + ydelta; y += ydelta) {
    let offset = 0;
    let yy = y;
    if(even) {
      offset = radius * 1.5;
    }
    
    for(let x = -radius * 3; x < window.innerWidth + radius *  4; x += radius * 3) {
      context.beginPath();
      hexagon(x + offset, y, radius);
      context.fillStyle = shade(x + offset, y);
      context.fill();
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

