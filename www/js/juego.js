var app={
  inicio: function(){
    DIAMETRO_BOLA = 50;
    dificultad = 0;
    velocidadX = 0;
    velocidadY = 0;
    puntuacion = 0;
    segundosrestantes = 60;
    
    alto  = document.documentElement.clientHeight;
    ancho = document.documentElement.clientWidth;
    
    app.vigilaSensores();
    app.iniciaJuego();
  },

  iniciaJuego: function(){

    function preload() {
      game.physics.startSystem(Phaser.Physics.ARCADE);

      game.stage.backgroundColor = '#f27d0c';
      game.load.image('bola', 'assets/bola.png');
      game.load.image('objetivo', 'assets/objetivo.png');
      game.load.image('barrera', 'assets/barrera.png');
      game.load.audio("choque","assets/choque.ogg");
      game.load.audio("win","assets/win.ogg");
    }

    function create() {
      scoreTitleText = game.add.text(16, 1, 'Puntos', { fontSize: '20px', fill: '#000000' });
      timeTitleText = game.add.text(ancho - 120, 1, 'Tiempo', { fontSize: '20px', fill: '#000000' });
      scoreText = game.add.text(16, 16, puntuacion, { fontSize: '60px', fill: '#757676' });
      timeText = game.add.text(ancho - 120, 16, segundosrestantes, { fontSize: '60px', fill: '#757676' });
      
      objetivo = game.add.sprite(app.inicioX(), app.inicioY(), 'objetivo');
      barrera1 = game.add.sprite(0, alto/3, 'barrera');
      barrera2 = game.add.sprite(250, (alto/3)*2, 'barrera');
      bola = game.add.sprite(app.inicioX(), app.inicioY(), 'bola');
      choque = game.add.audio("choque");
      win = game.add.audio("win");
      
      game.physics.arcade.enable(bola);
      game.physics.arcade.enable(objetivo);
      game.physics.arcade.enable(barrera1);
      game.physics.arcade.enable(barrera2);

      bola.body.collideWorldBounds = true;
      bola.body.onWorldBounds = new Phaser.Signal();
      bola.body.onWorldBounds.add(app.decrementaPuntuacion, this);

      window.setInterval(function(){
        segundosrestantes=segundosrestantes - 1;
        if(segundosrestantes<10){
          timeText.text='0'+segundosrestantes;
        } else {
          timeText.text=segundosrestantes;
        }
      },1000);
    }

    function update(){
      var factorDificultad = (300 + (dificultad * 100));
      bola.body.velocity.y = (velocidadY * factorDificultad);
      bola.body.velocity.x = (velocidadX * (-1 * factorDificultad));
      
      barrera1.x += 5;
      if(barrera1.x >= ancho){
        barrera1.x = -250;
      }
      barrera2.x += 5;
      if(barrera2.x >= ancho){
        barrera2.x = -250;
      }

      if(segundosrestantes<0){
        game.destroy();
        navigator.notification.alert(
          'Puntuación: '+puntuacion,
          window.location = "index.html",
          'Se acabó el tiempo !!',
          'Volver'
        );        
      }

      game.physics.arcade.overlap(bola, objetivo, app.incrementaPuntuacion, null, this);
      game.physics.arcade.overlap(bola, barrera1, app.decrementaPuntuacion, null, this);
      game.physics.arcade.overlap(bola, barrera2, app.decrementaPuntuacion, null, this);
    }

    var estados = { preload: preload, create: create, update: update };
    var game = new Phaser.Game(ancho, alto, Phaser.CANVAS, 'phaser',estados);
  },

  decrementaPuntuacion: function(){
    puntuacion = puntuacion-1;
    scoreText.text = puntuacion;
    choque.play();
  },

  incrementaPuntuacion: function(){
    puntuacion = puntuacion+5;
    scoreText.text = puntuacion;
    win.play();

    objetivo.body.x = app.inicioX();
    objetivo.body.y = app.inicioY();

    if (puntuacion > 0){
      dificultad = dificultad + 1;
    }
  },

  inicioX: function(){
    return app.numeroAleatorioHasta(ancho - DIAMETRO_BOLA );
  },

  inicioY: function(){
    return app.numeroAleatorioHasta(alto - DIAMETRO_BOLA );
  },

  numeroAleatorioHasta: function(limite){
    return Math.floor(Math.random() * limite);
  },

  vigilaSensores: function(){
    
    function onError() {
        console.log('onError!');
    }

    function onSuccess(datosAceleracion){
      app.detectaAgitacion(datosAceleracion);
      app.registraDireccion(datosAceleracion);
    }

    navigator.accelerometer.watchAcceleration(onSuccess, onError,{ frequency: 10 });
  },

  detectaAgitacion: function(datosAceleracion){
    var agitacionX = datosAceleracion.x > 10;
    var agitacionY = datosAceleracion.y > 10;

    if (agitacionX || agitacionY){
      setTimeout(app.recomienza, 1000);
    }
  },

  recomienza: function(){
    document.location.reload(true);
  },

  registraDireccion: function(datosAceleracion){
    velocidadX = datosAceleracion.x ;
    velocidadY = datosAceleracion.y ;
  }

};

if ('addEventListener' in document) {
    document.addEventListener('deviceready', function() {
        app.inicio();
    }, false);
}