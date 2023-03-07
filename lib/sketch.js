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

class Trariner{
  constructor(x, y, w, h){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.state = 0;
    this.sprite = trainer_sprite['up'];
  }

  translate(key){
    switch(key){
      case 'w':
        this.sprite = trainer_sprite['up'];
        this.y -= 5;
        break;
      case 's':
        this.sprite = trainer_sprite['down'];
        this.y += 5;
        break;
      case 'a':
        this.sprite = trainer_sprite['left'];
        this.x -= 5;
        break;
      case 'd':
        this.sprite = trainer_sprite['right'];
        this.x += 5;
        break
    }
  }

  render(){
    image(this.sprite, this.x, this.y, this.w, this.h);
  }
}

// define a class for the pokemons


const w = 800, h = 600; // width and lenght of the canvas

let 
  game_state,
  logo,
  grass,
  center,
  main_trainer,
  lab,
  pokeball,
  trainer,
  trainer_sprite,
  battle_backgournd;

function preload() {
  logo = loadImage('assets/logo.png');
  grass = loadImage('assets/grass.jpeg');
  battle_backgournd = loadImage('assets/battle-bkgnd.png')
  main_trainer = loadImage('assets/pokemon-trainer.png')

  // lab assets
  lab = loadImage('assets/lab.jpeg');
  pokeball = loadImage('assets/poke.png');
  trainer_sprite = {
    'down': loadImage('assets/sprite-down.png'),
    'up' : loadImage('assets/trainer-up.png'),
    'right' : loadImage('assets/trainer-right.png'),
    'left' : loadImage('assets/trainer-left.png')
  }
}

function setup() {
  createCanvas(w, h);
  center = new Point(w/2, h/2);
  game_state = 0;
  trainer = new Trariner(350 , 450, 100, 100);
}

function draw(){
  pokemonBattle();
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

  // render the pokeballs
  push();
  translate(160, -65);
  let water_pokemon = image(pokeball, center.x, center.y, 50, 50);
  let grass_pokemon = image(pokeball, center.x+40, center.y, 50, 50);
  let fire_pokemon = image(pokeball, center.x+80, center.y, 50, 50);
  pop(); 

  trainer.render();
}


function pokemonBattle(){
  background(battle_backgournd);
}