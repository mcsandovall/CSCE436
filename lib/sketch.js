let button, img;

function preload() {
  img = loadImage('assets/dog.jpeg');
}

function setup() {
  createCanvas(400, 800);
  button = createButton('click me');
  button.position(19, 19);
  button.mousePressed(loadCamera);
}

function loadCamera(){
  image(img, 100, 0);
}

