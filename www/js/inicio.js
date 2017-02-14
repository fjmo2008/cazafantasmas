var app={
  inicio: function(){
    
    this.iniciaFastClick();
    this.iniciaBotones();

  },

  iniciaFastClick: function () {
    FastClick.attach(document.body);
  },

  iniciaBotones: function() {
    var buttonGame = document.querySelector('#button-action');
    buttonGame.addEventListener('click', function(){
      app.redirigeUrl('juego.html');
    });
  
    var buttonGame = document.querySelector('#button-info');
    buttonGame.addEventListener('click', function(){
      app.redirigeUrl('ayuda.html');
    });

    var buttonGame = document.querySelector('#button-credits');
    buttonGame.addEventListener('click', function(){
      app.redirigeUrl('creditos.html');
    });

  var buttonExit = document.querySelector('#button-exit');
    buttonExit.addEventListener('click', function(){
    navigator.app.exitApp();
    });
  },

  redirigeUrl: function (iraUrl) {
    window.location = iraUrl;
  },

};

if ('addEventListener' in document) {
    document.addEventListener('deviceready', function() {
        app.inicio();
    }, false);
}
