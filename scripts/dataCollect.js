function dataCollect(){
    $('.dataCollect-wrap').css('display', 'flex');
    $('body').css('overflow-y','hidden');

    window.scroll(0, 0);

    anime({
        targets: '.dataCollect-wrap',
        translateX: ['100vw', 0],
        duration: 500,
        easing: 'easeOutExpo'
    })

    const score = q_ctx.level - 1;
    $('#score').text(score);

    $('#dataCollect_submit').click(() => {
        let username = $('#usr_name').val();
        
        if (username === '') {
            alert("Type a name.");
            return;
        }

        fetchData(username, score, previous_answer, language);
    })
}

function fetchData(username, score, answer, language){
    const url = "https://unfinishedquiz.000webhostapp.com/qz/leaderboard.php";
    rec_ct = {
        name: username,
        score: score,
        answer: answer,
        language: language
    };

    $.post(url, {rec_ctx: JSON.stringify(rec_ct)}, onServerResponse);
}

function onServerResponse(data, status){
    if (status !== "success") leaderBoardRecordFailed(-10);
    else if (data.status != "success") leaderBoardRecordFailed(data.stat_code);
    else leaderBoardRecordSuccess(data.pswd);
}

function leaderBoardRecordFailed(code){
    let width = $('.dataCollect').css("width");
    let height = $('.dataCollect').css("height");
    $('.dataCollect').css("min-width", width);
    $('.dataCollect').css("min-height", height);
    $('.dataCollect').css('display', 'flex');
    $('.dataCollect').css("align-items", 'center');
    $('.dataCollect').css("justify-content", 'center');
    $('.dataCollect').css("background", '#ff7777');
    $('.dataCollect').html("<div style='display: flex; flex-direction: columns; text-align: center;'>Your are unlucky<br>Error happend!</div>")
}

function leaderBoardRecordSuccess(password){
    let width = $('.dataCollect').css("width");
    let height = $('.dataCollect').css("height");
    $('.dataCollect').css("min-width", width);
    $('.dataCollect').css("min-height", height);
    $('.dataCollect').css('display', 'flex');
    $('.dataCollect').css("align-items", 'center');
    $('.dataCollect').css("justify-content", 'center');
    $('.dataCollect').html("<div style='display: flex; flex-direction: columns; text-align: center;'>Nice!!!<br>Thanks for playing.</div>")
}
