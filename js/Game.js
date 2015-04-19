
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
        map.addTilesetImage('carpet1');
        
        //create layer
        sollayer = map.createLayer('sol');
        murLayer = map.createLayer('mur');
        tapisLayer = map.createLayer('tapis');

        //collision on blockedLayer
        map.setCollisionBetween(1, 200, true, 'mur');
        
        //create player
        player = this.game.add.sprite(260, 200, 'player');
        player.anchor.set(0.5,0.5);
        player.direction=6;

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

        //  Our controls.
        cursors = this.game.input.keyboard.createCursorKeys();

 
    
        /*
        //test parquet 
        for (var i=0;i<20;i++) {
            for (var j=0;j<20;j++) {
                var parquet = this.game.add.sprite(i*30, j*30, 'parquet');

            }
        }

        //test murs
        for (var i=0;i<20;i++) { 
            var mur = this.game.add.sprite(15+i*30, 15, 'mur');
            mur.anchor.setTo(0.5,0.5);
            var mur2 = this.game.add.sprite(15+i*30, 15+570, 'mur');
            mur2.anchor.setTo(0.5,0.5);
            mur2.rotation = Math.PI;
            if (i==0 || i==19) {
                mur.animations.add('angle',[1]);
                mur.play('angle');
                mur2.animations.add('angle',[1]);
                mur2.play('angle');
                mur2.rotation = Math.PI/2;
                if(i==0) {
                    mur.rotation = Math.PI /2*3;
                    mur2.rotation = Math.PI;
                }
            } else {
                // côtés
                var mur3 = this.game.add.sprite(15, 15+i*30, 'mur');
                var mur4 = this.game.add.sprite(585, 15+i*30, 'mur');
                mur3.anchor.setTo(0.5,0.5);
                mur4.anchor.setTo(0.5,0.5);
                mur3.rotation = Math.PI/2*3;
                mur4.rotation = Math.PI/2;
            }
        }

        // test carpet
        this.carpets=[];
        this.compteur=0;
        for (var i=0;i<10;i++) {
            var carpet = this.game.add.sprite(108, 100+i*30, 'carpet');
            carpet.animations.add('normal',[0]);
            carpet.animations.add('vague',[1]);
            carpet.play('normal')
            //carpet.scale.setTo(2,2);
            //carpet.smoothed = false;
            this.carpets.push(carpet);
        }
        for (var i=0;i<10;i++) {
            var carpet = this.game.add.sprite(408, 100+i*30, 'carpet');
            carpet.animations.add('normal',[0]);
            carpet.play('normal')
            //carpet.scale.setTo(2,2);
            //carpet.smoothed = false;
        }

        this.time.events.loop(Phaser.Timer.SECOND/8 , function() {
            this.carpets[this.compteur].play('vague');
            if (this.compteur==0) {
                this.carpets[this.carpets.length-1].play('normal');
            } else this.carpets[this.compteur-1].play('normal');
            this.compteur++;
            if (this.compteur==this.carpets.length) this.compteur=0;
        }, this);
       
       //  test animations player
        for (var i=0;i<4;i++) {
             var player = this.game.add.sprite(100+100*i, 200, 'player');
             player.animations.add('face',[0,1,2,3,4,5,4,3,2,1]);
             player.animations.add('dos',[6,7,8,9,10,11,10,9,8,7]);
             player.animations.add('profil',[12,13,14,15,16,17]);
             player.animations.add('dead',[18,19,20,21]);

             switch (i) {
                case 0:
                     player.animations.play('face', 20, true);
                     break;
                case 1:
                    player.animations.play('profil', 15, true);
                    break;
                case 2:
                    player.animations.play('dos', 20, true);
                    break;
                case 3:
                    player.animations.play('dead', 20, true);
                    break;
                default:
             }
             player.scale.setTo(1.5,1.5);
             player.smoothed = false
        }*/

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

    if (cursors.left.isDown&&!stop)
    {
        //  Move to the left
        player.direction=9; //heure sur une horloge
        player.body.velocity.x = -150;
        player.animations.play('profil');
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

        player.animations.play('profil');

    }

    if (cursors.down.isDown)
    {
        //  Move down
        player.direction=6;
        player.body.velocity.y = 150;
        player.animations.play('face');
    }
    else if (cursors.up.isDown)
    {
        //  Move up
        player.direction=0;
        player.body.velocity.y = -150;

        player.animations.play('dos');
    }
    


    },

    render: function (pointer){

    this.game.debug.body(player);

    },

    quitGame: function (pointer) {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        this.state.start('MainMenu');

    }

};
