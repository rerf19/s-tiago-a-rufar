    sandalias();
    botas();
    polo();
    trajeMediaval();
    trajeRomano();
    $( document ).ready(function() {
      $("body").removeClass("purchase-banner-active");
      $(".item-purchase-banner").hide();
      var myImg = document.querySelector("#imgPerfil");
      var realWidth = myImg.naturalWidth;
      var realHeight = myImg.naturalHeight;
      if(realWidth > realHeight){
        $("#imgPerfil").addClass("wm");
      }
      if(realHeight > realWidth){
        $("#imgPerfil").addClass("hm");
      }
    });
    function sandalias(){
      //sandalias
      if(document.getElementById("sandalias").checked){
        document.getElementById("sandalias2").disabled = true;
      }
      else{
        document.getElementById("sandalias2").disabled = false;
      }
    }
    function botas(){
      //botas
      if(document.getElementById("botas").checked){
        document.getElementById("botas2").disabled = true;
      }
      else{
        document.getElementById("botas2").disabled = false;
      }
    }
    function polo() {
      //polo
      if(document.getElementById("polo").checked){
        document.getElementById("polo2").disabled = true;
      }
      else{
        document.getElementById("polo2").disabled = false;
      }
    }
    function trajeMediaval(){
      //trage Mediaval
      if(document.getElementById("trajeMediaval").checked){
        document.getElementById("trajeMediaval2").disabled = true;
      }
      else{
        document.getElementById("trajeMediaval2").disabled = false;
      }
    }
    function trajeRomano(){
      //trage Romano
      if(document.getElementById("trajeRomano").checked){
        document.getElementById("trajeRomano2").disabled = true;
      }
      else{
        document.getElementById("trajeRomano2").disabled = false;
      }
    }
    var imgPerfil = document.getElementById('imgPerfil');
    var imgPerfil2 = document.getElementById('imgPerfil2');
    var imgPerfil3 = document.getElementById('imgPerfil3');
    var imgPerfil4 = document.getElementById('imgPerfil4');
    function addFoto(){
    console.log(imgPerfil.src)
      if(imgPerfil.src == "imagens/perfil/"){
        imgPerfil.src = imgPerfil.src + "default-user.png";
        imgPerfil2.src = imgPerfil2.src + "default-user.png";
        imgPerfil3.src = imgPerfil3.src + "default-user.png";
        imgPerfil4.src = imgPerfil4.src + "default-user.png";
      }
    }
    addFoto();