$(document).ready(function(){
    $('.menu-toggle').click(function(){
        $('.menu-toggle').toggleClass('active')
        $('.nav').toggleClass('active')
    })
})

function closeNav(){
    $('.menu-toggle').toggleClass('active')
    $('.nav').toggleClass('active')
}

