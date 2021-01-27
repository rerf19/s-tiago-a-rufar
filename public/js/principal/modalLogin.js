$( ".olho1" ).click(function() {
  if($(".senha1").attr("type") === "password") $(".senha1").attr("type", "text");
  else $(".senha1").attr("type", "password");
});
  
