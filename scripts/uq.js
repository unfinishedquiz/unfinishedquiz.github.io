"use strict";

class UnfinishedQuiz{
    constructor(){
        this.parent_url_quiz = "http://localhost/UnfinishedQuiz/qz/";
        this.parent_url_set_leader = "http://localhost/UnfinishedQuiz/qz/leaderboard.php";
        this.parent_url_get_leader = "http://localhost/UnfinishedQuiz/qz/leaderboardlist.php";
    }
    
    getLeaders(callback){
        if (typeof(callback) !== 'function') return;

        let url = this.parent_url_get_leader;
        (() => {
            return new Promise((resolve, reject) => {
                $.post(url, {}, (data) => resolve(data))
            })
        })().then((data) => {
            let unsorted = true;

            do{
                unsorted = false;
                
                for(let i = 1; i < data.length; i++){
                    if (data[i - 1].score < data[i].score){
                        let swap_temp = data[i - 1];
                        data[i - 1] = data[i];
                        data[i] = swap_temp;
                        unsorted = true;
                    }
                }
            } while (unsorted === true);

            
            callback(data)
        });
    }
}

const uq = new UnfinishedQuiz();