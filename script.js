$(document).ready(function(){
    var player = 1;
    var winner = 0;
    var colors = {};
    colors[-1] = "yellow";
    colors[1] = "red";
    var count = 0;

    $(".cell").each(function(){
        $(this).attr("id", count);
        $(this).attr("data-player", 0);
        count++;
        $(this).click(function(){
            if(isValid($(this).attr("id"))){
                $(this).css("background-color", colors[player]);
                $(this).attr("data-player", player);
                if(checkWin(player)){
                    alert(colors[player] + " has won!");
                    winner = player;
                }
                player *= -1;
            }
        });
    });

    $('#restart').click(function()
    {
        clearBoard();
    });

    function clearBoard()
    {
        $(".cell").each(function()
        {
            $(this).attr("data-player", 0);
            $(this).css("background-color", "white");

            winner=0;
        });
    }

    function isValid(n){
        var id = parseInt(n);
        if(winner !== 0){
            return false;
        }
        if($("#" + id).attr("data-player") === "0"){
            if(id >= 35){
                return true;
            }
            if($("#" + (id + 7)).attr("data-player") !== "0"){
                return true;
            }
        }
        return false;
    }

    function checkWin(p){
        //check rows
        var chain = 0; 
        for(var i = 0; i < 42; i+=7){
            for(var j = 0; j < 7; j++){
                var cell = $("#" + (i+j));
                if(cell.attr("data-player") == p){
                    chain++;
                }else{
                    chain=0;
                }

                if(chain >= 4){
                    return true;
                }
            }
            chain = 0;
        }

        //check columns
        chain = 0;
        for(var i = 0; i < 7; i++){
            for(var j = 0; j < 42; j+=7){
                var cell = $("#" + (i + j));
                if(cell.attr("data-player") == p){
                    chain++;
                }else{
                    chain = 0;
                }

                if(chain >= 4){
                    return true;
                }
            }
            chain = 0;
        }

        //check diagonals
        var topLeft = 0;
        var topRight = topLeft + 3;

        for(var i = 0; i <3; i++){
            for(var j = 0; j < 4; j++){
                if($("#" + topLeft).attr("data-player") == p
                && $("#" + (topLeft + 8)).attr("data-player") == p
                && $("#" + (topLeft + 16)).attr("data-player") == p
                && $("#" + (topLeft + 24)).attr("data-player") == p){
                    return true;
                }

                if($("#" + topRight).attr("data-player") == p
                && $("#" + (topRight + 6)).attr("data-player") == p
                && $("#" + (topRight + 12)).attr("data-player") == p
                && $("#" + (topRight + 18)).attr("data-player") == p){
                    return true;
                }

                topLeft++;
                topRight = topLeft + 3;
            }
            topLeft = i * 7 + 7;
            topRight = topLeft + 3;
        }
        
        return false;
    }
});