class Point{
  constructor(x, y){
    this.x = x;
    this.y = y
  }

  translate(x , y){
    this.x += x;
    this.y += y;
  }

  transform(x, y){
    this.x *= x;
    this.y *= y;
  }
}

const w = 800, h = 600; // width and lenght of the canvas

let 
  game_state,
  logo,
  grass,
  center,
  main_trainer,
  lab,
  pokeball;

function preload() {
  logo = loadImage('assets/logo.png');
  grass = loadImage('assets/grass.jpeg');
  main_trainer = loadImage('assets/pokemon-trainer.png')

  // lab assets
  lab = loadImage('assets/lab.jpeg');
  pokeball = loadImage('assets/poke.png')
}

function setup() {
  createCanvas(w, h);
  center = new Point(w/2, h/2);
  game_state = 0;
}

function draw(){
  labPage();
  // make switch for states of the game
  // switch(game_state){
  //   case 0:
  //     startPage();
  //     if (keyIsPressed & key=="Enter"){ game_state+= 1; }
  //     break;
  //   case 1:
  //     labPage();
  //     break;
  // }
}

function startPage(){
  background(grass);
  image(logo, center.x/2, 0, center.x, center.y/2);
  // button create 
  let title = createDiv('Press Enter').addClass('main-action').center();
  image(main_trainer, center.x-100, center.y/2+30, 180, 200);
}

function labPage(){
  background(lab);

  push();
  translate(160, -65);
  let water_pokemon = image(pokeball, center.x, center.y, 50, 50);
  let grass_pokemon = image(pokeball, center.x+40, center.y, 50, 50);
  let fire_pokemon = image(pokeball, center.x+80, center.y, 50, 50);
  pop(); 
}
