function renderLeaders(leader_list){
    renderList('Top 3', 3, leader_list, $('#top3'));
    renderList('All players', Number.MAX_VALUE, leader_list, $('#all-list'));
}

function renderList(caption = '', record_count = Number.MAX_VALUE, leader_list = [], element){
    let render_result = '';
    let max_itr = (leader_list.length > record_count) ? record_count : leader_list.length; 
    let row = (rank, name, score) => {
        class render_table_templete {
            constructor(rank, name, score){
                this.rank = rank;
                this.name = name;
                this.score = score;
            }
    
            getRank(rank) {
                return '<td><span class="rank">' + rank + '</span></td>';
            }
    
            createInfoBlock(name, score){
                return '<td class="info"><p> Name : ' + name + '</p>' +
                        '<p>Score : ' + score +'</p></td>';
            }
    
            implementTemplete(){
                return '<tr>' + this.getRank(this.rank) + 
                        this.createInfoBlock(this.name, this.score) + '</tr>'
            }
        }

        let row = new render_table_templete(rank, name, score);
        return row.implementTemplete();
    }
    
    for(let i = 0; i < max_itr; i++){
        render_result += row(i + 1, leader_list[i].name, leader_list[i].score);
    }

    render_result = 
    '<table style="margin-top: 50px;">\
    <caption>' + caption +'</caption>' + render_result +
    '</table>'

    element.html(render_result);
}

$(document).ready(() => {
    uq.getLeaders(renderLeaders)
});