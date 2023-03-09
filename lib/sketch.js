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

class Pokemon{
  constructor(name, side){
    this.sprite = pokemon_sprites[name][side];
    if (side == 'front'){
      this.x = 450;
      this.y = 100;
    }else{ // back
      this.x = 60;
      this.y = 290;
    }
    this.side = side;
    this.sprite = pokemon_sprites[name][side];
    this.name = name;
    this.life = 100;
    this.moves = pokemon_moves[name];
  }

  render(){
    image(this.sprite, this.x, this.y, 300, 300);
    if (this.side == 'front'){
      this.displayLife(100, 150);
      createP(this.name).style('font-size', '30px').position(this.x-20, this.y+30).style('font-family', 'Pokemon Solid');
    }else{
      this.displayLife(this.x +  350, this.y + 200);
      createP(this.name).style('font-size', '30px').position(this.x + 650, this.y + 170).style('font-family', 'Pokemon Solid');
      createButton(this.moves[1].name).mousePressed(function() {attack(pokemon1, pokemon2, 1)}).position(this.x + 800, this.y + 300);
      createButton(this.moves[2].name).position(this.x + 800, this.y + 340).mousePressed(function() {attack(pokemon1, pokemon2, 2)});
      createButton(this.moves[3].name).position(this.x + 950, this.y + 300).mousePressed(function() {attack(pokemon1, pokemon2, 3)});
      createButton(this.moves[4].name).position(this.x + 950, this.y + 340).mousePressed(function() {attack(pokemon1, pokemon2, 4)});
    }
  }

  displayLife(x , y){
    if (this.life > 30){
      stroke(90, 189, 64);
    }else{
      stroke(182, 54, 64);
    }
    strokeWeight(30);
    line(x, y, x + (2.5*this.life), y);
  }
}


const w = 800, h = 600; // width and lenght of the canvas

var 
  game_state,
  logo,
  grass,
  center,
  main_trainer,
  lab,
  pokeball,
  trainer,
  trainer_sprite,
  battle_backgournd,
  pokemon_sprites,
  pokemon1,
  pokemon2,
  battle_status,
  attack_turn;

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
  };

  pokemon_sprites = {
    'pikachu' : {'back' : loadImage('assets/pikachu-back.png'), 'front' : loadImage('assets/pikachu-front.png') },
    'eevee'   : {'back' : loadImage('assets/eevee-back.png'), 'front' : loadImage('assets/eevee-front.png') },
    'psyduck' : {'back' : loadImage('assets/psyduck-back.png'), 'front' : loadImage('assets/psyduck-front.png') },
  };

  pokemon_moves = {
    'pikachu' : {
      1 : {'name' : "Quick Attack", 'dmg' : 40},
      2 : {'name' : "Feint", 'dmg' : 30},
      3 : {'name' : "Thunderbolt", 'dmg' : 90},
      4 : {'name' : "Spark", 'dmg' : 60},
    },
    'eevee' : {
      1 : {'name' : "Quick Attack", 'dmg' : 40},
      2 : {'name' : "Feint", 'dmg' : 30},
      3 : {'name' : "Thunderbolt", 'dmg' : 90},
      4 : {'name' : "Spark", 'dmg' : 60},
    },
    'psyduck' : {
      1 : {'name' : "Quick Attack", 'dmg' : 40},
      2 : {'name' : "Feint", 'dmg' : 30},
      3 : {'name' : "Thunderbolt", 'dmg' : 90},
      4 : {'name' : "Spark", 'dmg' : 60},
    }
  }

}

function setup() {
  createCanvas(w, h);
  center = new Point(w/2, h/2);
  game_state = 2;
  trainer = new Trariner(350 , 450, 100, 100);
  battle_status = 1;
  attack_turn = 0;
  pokemon1 = new Pokemon('pikachu', 'back');
  pokemon2 = new Pokemon('eevee', 'front');
}

function draw(){
  // labPage();
  // if (keyIsPressed){
  //   trainer.translate(key);
  // }
  switch(game_state){
    case 0:
      startPage();
      if (keyIsPressed & key=="Enter"){ game_state+= 1; }
      break;
    case 1:
      labPage();
      if (keyIsPressed){ trainer.translate(key); }
      break;
    case 2:
      pokemonBattle();
      if (attack_turn == 1){
        attack(pokemon2, pokemon1, Math.ceil(random(1,4)));
      }
      break;
  }
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
  image(pokeball, center.x, center.y, 50, 50);
  image(pokeball, center.x+40, center.y, 50, 50);
  image(pokeball, center.x+80, center.y, 50, 50);
  pop(); 

  trainer.render();
}


function pokemonBattle(){ // 1 trainer 2 wild
  background(battle_backgournd);

  pokemon1.render();
  pokemon2.render();
}

// subfunction for the battle
function showStatus(status){
  battle_status += 1;
  createP(status).style('font-size', '30px').position(1120,(50*battle_status) );
}

function attack(attacker, attacked, move){
  showStatus(attacker.name + ' used ' + attacker.moves[move]['name']);
  attacked.life -= attacker.moves[move]['dmg'];
  if (attacked.life < 0){
    attacked.life = 0;
    showStatus(attacked.name + " fainted.");
  }

  attack_turn = (attack_turn == 0) ? 1 : 0;
}