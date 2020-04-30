let obj_rot = {
    angle: 0,
    radius_eye: 17,
    radius_q : 100
}

function loading(){
    let timeline = anime.timeline({
        easing: 'easeOutExpo',
        duration: 2000,
        loop: true
    })

    timeline
    .add({
        targets: obj_rot,
        round: 1,
        angle: [
            {value: 60, duration: 600, easing: 'easeOutExpo', delay: 500},
            {value: -30, duration: 600, easing: 'easeOutExpo', delay: 300},
            {value: 130, duration: 600, easing: 'easeOutExpo', delay: 250},
            {value: 250, duration: 900, easing: 'easeOutExpo', delay: 250},
            {value: 360, duration: 600, easing: 'easeOutExpo', delay: 200}
        ],
        update: () => {
            $('.eye').css('transform', 'translateX(' 
                + obj_rot.radius_eye * Math.sin(deg2rad(obj_rot.angle)) + 'px) translateY('
                + obj_rot.radius_eye * Math.cos(deg2rad(obj_rot.angle)) 
                + 'px)')
        },
        easing: 'linear',
    }, 100)

    .add({
        targets: obj_rot,
        round: 1,
        angle: [
            {value: 60, duration: 600, easing: 'easeOutExpo', delay: 200},
            {value: -30, duration: 600, easing: 'easeOutExpo', delay: 200},
            {value: 130, duration: 600, easing: 'easeOutExpo', delay: 200},
            {value: 250, duration: 900, easing: 'easeOutExpo', delay: 200},
            {value: 0, duration: 1000, easing: 'easeOutExpo', delay: 200}
        ],
        radius_q: [
            {value: 120, duration: 600, easing: 'easeOutExpo', delay: 100},
            {value: 50, duration: 600, easing: 'easeOutExpo', delay: 400},
            {value: 150, duration: 600, easing: 'easeOutExpo', delay: 200},
            {value: 90, duration: 900, easing: 'easeOutExpo', delay: 200},
            {value: 100, duration: 600, easing: 'easeOutExpo', delay: 200}
        ],
        update: () => {
            $('.quizmark').css('transform', 'translateX(' 
                + obj_rot.radius_q * Math.sin(deg2rad(obj_rot.angle)) + 'px) translateY('
                + obj_rot.radius_q * Math.cos(deg2rad(obj_rot.angle)) 
                + 'px)')
        },
        easing: 'linear',
    }, 100)
    
}

function deg2rad(degrees){
    return Math.PI / 180 * degrees
}

function hide_loading(){
    anime({
        targets: '.loading',
        opacity: 0,
        duration: 3000
    })
    setTimeout(() => $('.loading').css('display', 'none'), 1000)
}

function show_loading(){
    $('.loading').removeAttr('style')
    $('.beam').removeAttr('style')
    $('.beam-head').removeAttr('style')
    window.scrollTo(10, 0)
}