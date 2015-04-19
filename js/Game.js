
BasicGame.Game = function (game) {

    //  When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

    this.game;      //  a reference to the currently running game (Phaser.Game)
    this.add;       //  used to add sprites, text, groups, etc (Phaser.GameObjectFactory)
    this.camera;    //  a reference to the game camera (Phaser.Camera)
    this.cache;     //  the game cache (Phaser.Cache)
    this.input;     //  the global input manager. You can access this.input.keyboard, this.input.mouse, as well from it. (Phaser.Input)
    this.load;      //  for preloading assets (Phaser.Loader)
    this.math;      //  lots of useful common math operations (Phaser.Math)
    this.sound;     //  the sound manager - add a sound, play one, set-up markers, etc (Phaser.SoundManager)
    this.stage;     //  the game stage (Phaser.Stage)
    this.time;      //  the clock (Phaser.Time)
    this.tweens;    //  the tween manager (Phaser.TweenManager)
    this.state;     //  the state manager (Phaser.StateManager)
    this.world;     //  the game world (Phaser.World)
    this.particles; //  the particle manager (Phaser.Particles)
    this.physics;   //  the physics manager (Phaser.Physics)
    this.rnd;       //  the repeatable random number generator (Phaser.RandomDataGenerator)

    //  You can use any of these from any function within this State.
    //  But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.

};

BasicGame.Game.prototype = {

    create: function () {
        console.log("lancement du jeu");

        this.game.physics.startSystem(Phaser.Physics.ARCADE);


        //create map
        map = this.game.add.tilemap('map');
        map.addTilesetImage('mur');
        map.addTilesetImage('carrelage');
        tilesetcarpet= map.addTilesetImage('carpet1');
        
        //create layer
        solLayer = map.createLayer('sol');
        murLayer = map.createLayer('mur');
        tapisLayer = map.createLayer('tapis');

        //collision on blockedLayer
        map.setCollisionBetween(1, 200, true, 'mur');
        
        //create player
        player = this.game.add.sprite(260, 200, 'player');
        player.anchor.set(0.5,0.5);
        player.direction=6;
        player.countdown=0;

             //player animations
            player.animations.add('face',[0,1,2,3,4,5,4,3,2,1]);
            player.animations.add('dos',[6,7,8,9,10,11,10,9,8,7]);
            player.animations.add('profil',[12,13,14,15,16,17]);
            player.animations.add('dead',[18,19,20,21]);
        
            //player physics
            this.game.physics.enable(player);
            player.body.bounce.x = 0;
            player.body.bounce.y = 0;
            player.body.setSize(12,6,0,8);

        //essai adversaire
        player2 = this.game.add.sprite(280, 400, 'player');
        player2.anchor.set(0.5,0.5);
        this.game.physics.enable(player2);
        player2.animations.add('dead',[18,19,20,21]);
        player2.body.setSize(12,6,0,8);
        //  Our controls.
        cursors = this.game.input.keyboard.createCursorKeys();

    },

    update: function () {
    var stop =false;
            //collision 
    this.game.physics.arcade.collide(player,murLayer,function(){


        switch (player.direction) {
                case 0:
                     player.frame = 9;
                     break;
                case 3:
                    player.frame = 16;
                    break;
                case 6:
                    player.frame = 3;
                    break;
                case 9:
                    player.frame = 16;
                    break;
                default:
             }
        player.animations.stop();
        stop=true;



    },null,this);

    //player management
    player.body.velocity.x = 0;
    player.body.velocity.y = 0;   

    if (cursors.left.isDown)
    {
        //  Move to the left
        player.direction=9; //heure sur une horloge
        player.body.velocity.x = -150;
        if (!stop) player.animations.play('profil');
        if (player.scale.x < 0)
            {player.scale.x*=-1;}

    }
    else if (cursors.right.isDown)
    {
        //  Move to the right
        player.direction=3;
        player.body.velocity.x = 150;
        if (player.scale.x>0)
           {player.scale.x*=-1;}

        if (!stop) player.animations.play('profil');

    }

    if (cursors.down.isDown)
    {
        //  Move down
        player.direction=6;
        player.body.velocity.y = 150;
        if (!stop) player.animations.play('face');
    }
    else if (cursors.up.isDown)
    {
        //  Move up
        player.direction=0;
        player.body.velocity.y = -150;

        if (!stop) player.animations.play('dos');
    }
    

    //procédure de lancement de tapis avec barre espace
    if(this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).isDown && player.countdown==0)
    {
        var tilex = solLayer.getTileX(player.body.x);
        var tiley = solLayer.getTileY(player.body.y);
        var tileID = tilesetcarpet.firstgid;
        switch (player.direction) {
                case 0:
                     tiley--;
                    tileID+=4;
                     break;
                case 3:
                    tilex++;
                    tileID+=5;
                    break;
                case 6:
                    tiley++;
                    tileID+=2;
                    break;
                case 9:
                    tilex--;
                    tileID+=3;
                    break;
                default:
             }
             //console.log("tileID cherché="+tileID+" tile ID Réel"+map.getTile(tilex,tiley,tapisLayer,true).index);

           if(map.getTile(tilex,tiley,tapisLayer,true).index == tileID)
             {  map.swap(tileID,tileID+6,tilex,tiley,1,1,tapisLayer);
                carpetarray.push({"tilex":tilex,"tiley":tiley,"direction":player.direction,"count":framerate})          
                player.countdown=framerate*6;
            }

    }
    else if (player.countdown>0)
    { 
      player.countdown--;
    }

    // avancée tapis
    for (var i=carpetarray.length-1;i>-1;i--)
        {
            if(carpetarray[i].count==0)
             {
              var ID= map.getTile(carpetarray[i].tilex,carpetarray[i].tiley,tapisLayer,true).index
              map.swap(ID,ID-6,carpetarray[i].tilex,carpetarray[i].tiley,1,1,tapisLayer);
                switch (carpetarray[i].direction) 
                {
                    case 0:
                         carpetarray[i].tiley--;
                        break;
                    case 3:
                        carpetarray[i].tilex++;
                        break;
                    case 6:
                        carpetarray[i].tiley++;
                        break;
                    case 9:
                        carpetarray[i].tilex--;
                        break;
                default:
                }
                ID= map.getTile(carpetarray[i].tilex,carpetarray[i].tiley,tapisLayer,true).index
                if(ID<0||(ID+carpetarray[i].direction)%2==0)
                {
                    carpetarray.splice(i,1);
                }
                else
                {
                    map.swap(ID,ID+6,carpetarray[i].tilex,carpetarray[i].tiley,1,1,tapisLayer);
                    carpetarray[i].count=framerate;
                }    
              }
            else
            {
             carpetarray[i].count--;

             //console.log("rentre dans la boucle "+i+ " reste framerate:"+carpetarray[i].count);
            }
            //carpet.scale.setTo(2,2);
            //carpet.smoothed = false;
        }

    //collision tapis
    console.log(map.getTile(solLayer.getTileX(player2.body.x),solLayer.getTileY(player2.body.y),tapisLayer,true).index)
    if(map.getTile(solLayer.getTileX(player2.body.x),solLayer.getTileY(player2.body.y),tapisLayer,true).index>(tilesetcarpet.firstgid+6-1))

    {
        player2.animations.play('dead');

    }

    },
    render: function (pointer){

    this.game.debug.body(player);
   this.game.debug.body(player2);

    },

    quitGame: function (pointer) {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        this.state.start('MainMenu');

    }

};
