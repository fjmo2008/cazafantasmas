var app={
  inicio: function(){
    
    this.iniciaFastClick();
    this.iniciaBotones();

  },

  iniciaFastClick: function () {
    FastClick.attach(document.body);
  },

  iniciaBotones: function() {
    var buttonGame = document.querySelector('#button-volver');
    buttonGame.addEventListener('click', function(){
      app.redirigeUrl('index.html');
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
