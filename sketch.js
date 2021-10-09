var Trex1, Trex;
var Suelo1, Suelo;
var pisoinvisible;
var Nube1, Nube;
var Obstaculo;
var GrupoNubes, GrupoCactus, GrupoObstaculos;
var O1, O2, O3, O4, O5, O6;
var Etapa = "Play";
var Puntaje = 0,PuntajeFinal = 0;
var TrexChoque,Trex2;
var GameOver,GameO;
var Reset,Restart;
var Jump;
var Die;
var AumentoV;

function preload() {
  Trex1 = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  Suelo1 = loadImage("ground2.png");
  Nube1 = loadImage("cloud.png");
  O1 = loadImage("obstacle1.png");
  O2 = loadImage("obstacle2.png");
  O3 = loadImage("obstacle3.png");
  O4 = loadImage("obstacle4.png");
  O5 = loadImage("obstacle5.png");
  O6 = loadImage("obstacle6.png");
  Trex2=loadImage("trexFin.png");
  GameO=loadImage("gameOver.png");
  Restart=loadImage("restart.png");
  Jump=loadSound("jump.mp3");
  Die=loadSound("die.mp3");
  AumentoV=loadSound("checkPoint.mp3");
}
function setup() {
  createCanvas(600, 200);
  pisoinvisible = createSprite(50, 189, 50, 5);
  pisoinvisible.visible = false;
  Suelo = createSprite(600, 165);
  Suelo.addImage("Suelo", Suelo1);
  Suelo.velocityX = -5;

  //Suelo.scale=1.35;
  Trex = createSprite(50, 100);
  Trex.addAnimation("correr", Trex1);
  Trex.scale = 0.6;

  //Se establece el area de choque de Trex.
  Trex.setCollider("circle", 0, 0, 40);
  Trex.debug = false;

  //Trex al chocar
  TrexChoque=createSprite(50,150);
    TrexChoque.addImage("Chocar",Trex2);
  TrexChoque.scale = 0.6;
  TrexChoque.visible=false;
  
  GameOver=createSprite(300,100);
 GameOver.addImage("Fin",GameO);
  GameOver.scale = 0.8;
  GameOver.visible=false;
  
   Reset=createSprite(300,130);
 Reset.addImage("Reiniciar",Restart);
  Reset.scale = 0.6;
  Reset.visible=false;
  GrupoNubes = new Group();
  GrupoCactus = new Group();
}

function draw() {
  background("white");

  if (Etapa == "Play") {
    Nubes();
    Cactus();
    Score();
    //suelo infinito
    if (Suelo.x < 0) Suelo.x = 300;
    //salto de Trex
    if (Trex.collide(pisoinvisible))
      if (keyDown("space")) {
        Trex.velocityY = -12;
        Jump.play();
      }
    if (GrupoCactus.isTouching(Trex)) {
     Die.play();
      PuntajeFinal = Puntaje;
      Etapa = "final";
    }
    //grvedad de trex
    Trex.velocityY = Trex.velocityY + 0.5;
  } //Se cierra la etapa inicial

  if (Etapa == "final") {
    Suelo.velocityX = 0;
    GrupoCactus.setVelocityXEach(0);
    GrupoNubes.setVelocityXEach(0);
    GrupoCactus.setLifetimeEach(-1);
    GrupoNubes.setLifetimeEach(-1);
    fill("gray");
    textSize(20);
    text("Puntaje: " + PuntajeFinal, width / 2 - 55, 50);
    Puntaje = 0;
    Trex.velocityY=0;
    TrexChoque.y=Trex.y
    TrexChoque.visible=true;
    Trex.visible=false;
    GameOver.visible=true
    Reset.visible=true
    if (mousePressedOver(Reset)){ 
       Suelo.velocityX = -5;
      TrexChoque.visible=false;
    Trex.visible=true;
    GameOver.visible=false
    Reset.visible=false
   GrupoNubes.destroyEach();
      GrupoCactus.destroyEach();
      Etapa = "Play";
    }//Se cierra Reset
  } //Se cierra etapa final
  Trex.collide(pisoinvisible);

  //instruccion para que todo se muestre en el canvas
  drawSprites();
  console.log(Suelo.velocityX);
} //Se cierra function.draw

function Nubes() {
  if (frameCount % 50 === 0) {
    Nube = createSprite(600, Math.round(random(20, 90)));
    Nube.addImage("cielo", Nube1);
    Nube.velocityX = -5;
    Nube.lifetime = 150;
    GrupoNubes.add(Nube);
  }
}

function Cactus() {
  var tipo_obstaculo;
  tipo_obstaculo = Math.round(random(1, 6));
  if (frameCount % 55 === 0) {
    Obstaculo = createSprite(600, Math.round(random(140, 170)));
    Obstaculo.velocityX = -(5 + Puntaje / 100);
    Suelo.velocityX = Obstaculo.velocityX;
    Obstaculo.scale = 0.7;
    Obstaculo.debug = false ;
    switch (tipo_obstaculo) {
      case 1:
        Obstaculo.addImage(O1);
        break;
      case 2:
        Obstaculo.addImage(O2);
        break;
      case 3:
        Obstaculo.addImage(O3);
        break;
      case 4:
        Obstaculo.addImage(O4);
        break;
      case 5:
        Obstaculo.addImage(O5);
        break;
      case 6:
        Obstaculo.addImage(O6);
        break;
    }
    Obstaculo.lifetime = 150;
    GrupoCactus.add(Obstaculo);
    GrupoCactus.setDepthEach(0);
  }
}
function Score() {
  Puntaje = Puntaje + Math.round(getFrameRate() / 60);
  fill("gray");
  textSize(20);
  text("Puntaje: " + Puntaje, width / 2 - 55, 50);
  if (Puntaje > 0 && Puntaje%100==0) { 
AumentoV.play();
  }
}