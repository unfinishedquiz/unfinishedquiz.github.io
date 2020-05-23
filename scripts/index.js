let q_no = 1
let previous_answer = ''
let language = 'en'
let scrl_amount = {val: 0}
let q_ctx = {}

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

    if(!loadProgress()) $.post(parent_url_quiz, {}, (data) => load_content(data));

    $('#answer').keydown((e)=> {
        if (e.keyCode == 13) next();
    })

    $('.loading').css('display', 'none')
    loading()
    
})

function giveup(){
    dataCollect();
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

        let incorrect_message = 
        '<div class="cross"><div class="cross-line1-wrap">' +
        '<div class="cross-line1"></div></div><div class="cross-line2-wrap">' + 
        '<div class="cross-line2"></div></div></div>'

        $('#result').toggleClass('q-incorrect');
        $('#result').html(incorrect_message);
        animate_incorrect_message();
        setTimeout(() => {
            $('#result').html("");
            $('#result').removeAttr('class');
            $('#result').removeAttr('style');
        }, 2400)

    }, 2000)
    
}


function next(){
    let answer = $.trim($('#answer').val()).toLowerCase();
    $('#answer').val("")
    q_ctx = {
        level: q_no, 
        answer: answer,
        language: language
    }
    let q_ctx_json = JSON.stringify(q_ctx)
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
    show_loading();
    saveProgress();
}

function changeLanguage(requestedLang){
    language = requestedLang;
    load_content(q_ctx)
}

function toggleLanguage(){
    changeLanguage((language === 'en') ? 'si' : 'en')
}

function load_content(data){
    q_ctx = data;

    window.scrollTo(0, 0);
    scrl_amount.val = 0;
    q_ctx = data;
    q_no = data.level;
    let q_content = (language === 'si') ? data.question_si : data.question_en;

    $('.q-level').html('Q. ' + q_ctx.level);
    $('.q-content').html(q_content);

    if(data.image){
        $('.q-graphic').html('<img src=' + parent_url_res + q_no + '.jpg>');
        $('.q-img-utilize').css('opacity', '1');
    } else {
        $('.q-graphic').html('<img src=' + parent_url_res +'empty-img.jpg>');
        $('.q-img-utilize').css('opacity', '0');
    }
    
    $('#answer').focus();
    $('#answer').val("");

    /*anime({
        targets: scrl_amount,
        val: $('.q-card').offset().top - 20,
        update: () =>  window.scrollTo(0, scrl_amount.val),
        easing: 'linear',
        duration: 1500,
        delay: 1000
    })*/
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

function saveProgress(){
    let ctx = {
        level: q_ctx.level, 
        answer: previous_answer,
        language: language
    };

    if (ctx.level === 0) {
        pop_message("Progress doesn't saved as you are still in 1st quiz.");
        return;
    }

    $.post(parent_url_quiz, 
        {q_context : JSON.stringify(ctx)}, 
        (data) => {
            if (data.status == 'correct') {
                let progress = {
                    level: q_ctx.level,
                    previous_answer: previous_answer,
                    language: language
                };

                let progress_cookie = JSON.stringify(progress);
                progress_cookie = progress_cookie;

                saveCookie('progress', progress_cookie, 2 * 30);
            }
            else progressSaveFailed();
        })
}

function pop_message(message){
    alert(message)
}

function progressSaveFailed(){

}

function checkSavability(){

}

function loadProgress(){
    let progress_str = getCookie('progress');
    if (progress_str == null) return false;

    let progress_object = JSON.parse(progress_str);
    let progress = {
        level: progress_object.level,
        answer: progress_object.previous_answer,
        language: progress_object.language
    };

    progress_str = JSON.stringify(progress);
    language = progress_object.language;
    previous_answer = progress_object.previous_answer;
    
    $.post(parent_url_quiz, {q_context:progress_str}, (data) => load_content(data));
    return true;
}
