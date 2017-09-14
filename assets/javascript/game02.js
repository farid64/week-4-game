
//List of Hero Objects

var characters = {

    Arnold: {
    	name : "Arnold",
        health: 400,
        attack: 20,
        counterAttack: 17,
        color: "black",
        image: "assets/images/Arnold.jpg"
    },

    Rocky: {
    	name : "Rocky",
        health: 350,
        attack: 17,
        counterAttack: 10,
        color: "red",
        image: "assets/images/Rocky.jpg"
    },

    Rambo: {
    	name: "Rambo",
        health: 325,
        attack: 15,
        counterAttack: 10,
        color: "purple",
        image: "assets/images/Rambo.jpg"
    },

    Franky: {
    	name : "Franky",
        health: 250,
        attack: 10,
        counterAttack: 9,
        color: "blue",
        image: "assets/images/Franky.jpg"
    }

}

var myGame = {

    Arnold : $.extend(true,{}, characters.Arnold),
    Rocky : $.extend(true,{}, characters.Rocky),
    Rambo : $.extend(true,{}, characters.Rambo),
    Franky : $.extend(true,{}, characters.Franky),

    Heros : [],

    enemySelected : false, //this bolean is used to prevent multiple selection of enemies to fight
    gameOver : false,
    enemyCounter : 3,
    isFightingEnemyGone : false,



}

myGame.starter = function(){


    //putting the clones of objects of characters into array "Heros". For some reason, i couldn't do it inside the object.

    this.Heros[0] = this.Arnold; 
    this.Heros[1] = this.Rocky;
    this.Heros[2] = this.Rambo;
    this.Heros[3] = this.Franky;

    this.enemySelected = false;

    $(".instruction").text("Click on the character you want to fight as:");


    for(var i = 0; i<4; i++){ //this loop will create divs and img tags and put them in exhibition section

        var characterContainer = $("<div>");
        var characterImg = $("<img />").attr("src", this.Heros[i].image);
        var characterHealth = $("<p>").text(this.Heros[i].health);
        characterContainer.append(characterImg);
        characterContainer.append(characterHealth);
        $(".hero-exhibition").append(characterContainer);
        characterImg.addClass("img-fluid");
        characterContainer.addClass("hero");
        characterContainer.attr("data-heroName" , this.Heros[i].name);
    }
}

myGame.enemyLister = function(){ //this method will move the enemies to the Enemies section

    for(var i=0;i<3;i++){

            //using Child selector in jQuery to select all the divs with class "hero" and append them to Enemies

            var enemy = $(".hero-exhibition > .hero"); 
            $(".Enemies").append(enemy);
    }

    $(".hero-exhibition").empty();
    $(".instruction").text("choose the enemy you want to fight from the left side:");
    $(".fightingEnemy").text("The current enemy goes here:");


}

myGame.attack = function(enemy){


    var hero = $(".selectedHero > .hero").attr("data-heroName");
    this[enemy].health -= this[hero].attack;
    $(".fightingEnemy > .hero > p").text(this[enemy].health);
    this[hero].attack += 10;
    // console.log(this[enemy].health);

}

myGame.counterAttack = function(enemy){

    var hero = $(".selectedHero > .hero").attr("data-heroName");
    this[hero].health -= this[enemy].counterAttack;
    $(".selectedHero > .hero > p").text(this[hero].health);
    // console.log(this[hero].health);


}

myGame.status = function(enemy){

    
  
    this.isEnemyDead(enemy);

    var heroDead = this.isHeroDead();

    // console.log($(".fightingEnemy").is(':empty') + " " + $(".Enemies").is(':empty'));

    if(this.enemyCounter == 0 && !this.gameOver){

        this.gameOver = true
        var resetBtn = $("<button>");
        resetBtn.html("Click to Reset");
        resetBtn.addClass("reset");
        $(".container").append(resetBtn);

        resetBtn.on('click' , function(){
            myGame.reset();
        })

        $(".WinLose").text("You Won Man. Congradulations!")
    }

    if(heroDead && !this.gameOver){

        this.gameOver = true
        var resetBtn = $("<button>");
        resetBtn.html("Click to Reset");
        resetBtn.addClass("reset");
        $(".container").append(resetBtn);

        resetBtn.on('click' , function(){
            myGame.reset();
        });

        $(".WinLose").text("You Lost Bro! You Suck!")


    }

}

myGame.isEnemyDead = function(enemy){

    console.log(this.isFightingEnemyGone);

    if(this[enemy].health <= 0 && this.isFightingEnemyGone === false){

        $(".fightingEnemy").empty();
        this.isFightingEnemyGone = true;
        this.enemyCounter --;
        this.enemySelected = false;
        console.log(this.enemyCounter);
        console.log(this.isFightingEnemyGone);
    }


}

myGame.isHeroDead = function(){

    var hero = $(".selectedHero > .hero").attr("data-heroName");

    if(this[hero].health <= 0){

        return true;
    }
}

myGame.reset = function(){

    // this.Arnold.health = characters.Arnold.health;
    // this.Arnold.attack = characters.Arnold.attack;
    // this.Arnold.counterAttack = characters.Arnold.counterAttack;

    // this.Rocky.health = characters.Rocky.health;
    // this.Rocky.attack = characters.Rocky.attack;
    // this.Rocky.counterAttack = characters.Rocky.counterAttack;

    // this.Rambo.health = characters.Rambo.health;
    // this.Rambo.attack = characters.Rambo.attack;
    // this.Rambo.counterAttack = characters.Rambo.counterAttack;

    // this.Franky.health = characters.Franky.health;
    // this.Franky.attack = characters.Franky.attack;
    // this.Franky.counterAttack = characters.Franky.counterAttack;

    this.Arnold = $.extend(true,{}, characters.Arnold);
    this.Rocky = $.extend(true,{}, characters.Rocky);
    this.Rambo = $.extend(true,{}, characters.Rambo);
    this.Franky = $.extend(true,{}, characters.Franky);

    $(".fightingEnemy").empty();
    $(".selectedHero").empty();
    $(".Enemies").empty();
    $(".reset").remove();
    $(".WinLose").empty();
    this.enemyCounter = 3;
    this.gameOver = false;
    this.isFightingEnemyGone = false;

    this.starter();
}

$(".hero-exhibition").on('click', '.hero' , function(){

    var selectedHero = $(this);
    $(".selectedHero").append(selectedHero);
    var selectedHeroIndex = $(this).attr("data-index");
    myGame.enemyLister();

    
})

$(".Enemies").on('click' , '.hero' , function(){

    if(myGame.enemySelected === false){

        var selectedEnemy = $(this);
        $(".fightingEnemy").append(selectedEnemy);
        myGame.isFightingEnemyGone = false;
        myGame.enemySelected = true;
    }
})

$(".fightingEnemy").on('click' , '.hero' , function(){


    var nameOfEnemy = $(this).attr("data-heroName");

    myGame.attack(nameOfEnemy);
    myGame.status(nameOfEnemy);
    myGame.counterAttack(nameOfEnemy);
    myGame.status(nameOfEnemy);
})


myGame.starter();