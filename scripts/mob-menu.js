let mobOpen = false
$(window).resize(() => {
    if ($(window).width() >= 580){
        $('.header-nav a').removeAttr('style')
        $('.header-nav').removeAttr('style')
    } 
})

function open_mobmenu(){
    $('.header-nav').css("display", "flex")
    $('.header-nav').css("opacity", "0")

    let t = anime.timeline({
        duration: 1000,
        easing: 'easeOutExpo'
    })

    t
    .add({
        targets: '.header-nav',
        opacity: [0, 1],
        duration: 300,
        easing: 'easeOutElastic(1, 0.8)',
    })

    .add({
        targets: '#menu-language',
        translateY: [-300, 0],
        duration: 100,
        easing: 'easeOutElastic(1, 0.8)',
    })

    .add({
        targets: '#menu-about',
        translateY: [-300, 0],
        duration: 100,
        easing: 'easeOutElastic(1, 0.8)',
        delay: 100
    })

    .add({
        targets: '#menu-leaderboard',
        translateY: [-300, 0],
        duration: 100,
        easing: 'easeOutElastic(1, 0.8)',
        delay: 100
    })

    .add({
        targets: '#menu-questions',
        translateY: [-300, 0],
        duration: 100,
        easing: 'easeOutElastic(1, 0.8)',
        delay: 100
    })
}

function close_mobmenu(){
    let t = anime.timeline({
        duration: 700
    })

    t
    .add({
        targets: '.header-nav',
        height: 0,
        duration: 200,
        easing: 'linear'
    })

    .add({
        targets: '.header-nav',
        opacity: 0,
        duration: 500
    })

    setTimeout(() => {
        $('.header-nav a').removeAttr('style')
        $('.header-nav').removeAttr('style')
    }, 700)
}

function mobilemenu(){
    if (mobOpen) close_mobmenu();
    else open_mobmenu();

    mobOpen = !mobOpen;
}