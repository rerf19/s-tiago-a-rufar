function initMap(){
    var location = {lat: 40.997149, lng: -8.507571}
    var map = new  google.maps.Map(document.getElementById("map"),{
        zoom: 10,
        center: location
    })
    var marker = new google.maps.Marker({
        position: location,
        map: map
    })
}
