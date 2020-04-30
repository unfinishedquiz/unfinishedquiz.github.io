let q_no = 1
let previous_answer = ''
let language = 'en'
let scrl_amount = {val: 0}

let parent_url_quiz = "https://unfinishedquiz.000webhostapp.com/qz/"
let parent_url_res = "https://unfinishedquiz.000webhostapp.com/res/"

$(document).ready(() => {

    $('.header-nav a').hover((e) => {
        let a = e.target
        anime({
            targets: a,
            translateY: -3,
            duration: 10
        })
    })

    $('.header-nav a').mouseleave((e) => {
        let a = e.target
        anime({
            targets: a,
            translateY: 0,
            duration: 50
        })
    })

    $.post(parent_url_quiz, {}, (data) => load_content(data))

    $('#answer').keydown((e)=> {
        if (e.keyCode == 13) next();
    })

    $('.loading').css('display', 'none')
    loading()
    
})

function giveup(){
    $('.q-card').css('min-height', '0')
    $('.q-card').animate({height: 0, padding: '0 auto'}, 700)
    $('.q-card').animate({width: 0}, 300)
    $('.q-card').animate({borderWidth: 0}, 10)
}

function animate_incorrect_message(){
    let t1 = anime.timeline({
        easing: 'easeOutExpo',
        duration: 2400
    })

    t1

    .add({
        targets: '.q-incorrect .cross .cross-line1',
        translateX: ['100%', 0],
        easing: 'easeOutExpo',
        duration: 1000
    }, 0)

    .add({
        targets: '.q-incorrect .cross .cross-line2',
        translateX: ['100%', 0],
        easing: 'easeOutExpo',
        duration: 1000
    }, 0)

    .add({
        targets: '.q-incorrect .cross .cross-line1',
        translateX: '100%',
        duration: 300
    }, 1100)

    .add({
        targets: '.q-incorrect .cross .cross-line2',
        translateX: '100%',
        duration: 300
    }, 1100)

    .add({
        targets: '.q-incorrect .cross',
        translateY: '200px',
        duration: 1200
    }, 1100)

    .add({
        targets: '.q-incorrect',
        opacity: 0,
        duration: 1000
    }, 1300)
}

function incorrect_answer(){
    setTimeout(() => {
        hide_loading()

        let incorrect_message = '<div class="cross"><div class="cross-line1-wrap">' +
        '<div class="cross-line1"></div></div><div class="cross-line2-wrap">' + 
        '<div class="cross-line2"></div></div></div>'

        $('#result').toggleClass('q-incorrect')
        $('#result').html(incorrect_message)
        animate_incorrect_message()
        setTimeout(() => {
            $('#result').html("")
            $('#result').removeAttr('class')
            $('#result').removeAttr('style')
        }, 2400)

    }, 2000)
    
}


function next(){
    let answer = $('#answer').val()
    $('#answer').val("")
    q_ctx = {
        level: q_no, 
        answer: answer,
        language: language
    }
    q_ctx_json = JSON.stringify(q_ctx)
    $.post(parent_url_quiz, {q_context: q_ctx_json}, 
        (data) => {
            if (data.status == "incorrect") {
                incorrect_answer()
                $('#answer').focus()
            } else{
                correct_answer(data)
            }
        }
    )

    previous_answer = answer

    show_loading()
}

function changeLanguage(requestedLang){
    q_ctx = {
        level: q_no - 1, 
        answer: previous_answer,
        language: 'si'
    }

    $.post(parent_url_quiz, {q_context: q_ctx_json}, 
        (data) => {
            if (data.status == "incorrect") {
                alert("Sorry, internal error occured!")
                $('#answer').focus()
            } else{
                load_content(data)
            }
        }
    )
}

function load_content(data){
    window.scrollTo(0, 0)
    scrl_amount.val = 0

    q_no = data.level;
    $('.q-level').html('Q. ' + q_no)
    $('.q-content').html(data.question_en)

    if(data.image){
        $('.q-graphic').html('<img src=' + parent_url_res + q_no + '.png>')
        $('.q-img-utilize').css('opacity', '1')
    } else {
        $('.q-graphic').html('<img src="img/empyt-img.png">')
        $('.q-img-utilize').css('opacity', '0')
    }


    /* anime({
        targets: scrl_amount,
        val: $('#answer').offset().top,
        update: () =>  window.scrollTo(0, scrl_amount.val),
        easing: 'linear',
        duration: 1500,
        delay: 1000
    }) */
    
    $('#answer').focus()
    $('#answer').val("")
}

function correct_answer(data){
    setTimeout(() => {
        anime({
            targets: ['.beam' , '.beam-head'],
            background: ['#33cfff', '#00ff40'],
            easing: 'linear',
            duration: 600
        })

        setTimeout(() => {
            hide_loading()
            load_content(data)
        }, 1000)        
    } , 1000)
    
}
