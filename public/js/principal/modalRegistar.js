$( ".olho2" ).click(function() {
  if($(".senha2").attr("type") === "password") $(".senha2").attr("type", "text");
  else $(".senha2").attr("type", "password");
});

$( ".olho3" ).click(function() {
  if($(".senha3").attr("type") === "password") $(".senha3").attr("type", "text");
  else $(".senha3").attr("type", "password");
});