$(document).ready(()=>{
    let devDiv = document.createElement("div");
    devDiv.setAttribute("class","development");
    $()
    //updates the statistics
    $.ajax({
        url: '/data',
        type: 'POST',
        dataType: 'json',
        success:(result)=>{
            console.log(result);
            $('#infection').html(result.infection);
            $('#recovered').html(result.recovered);
            $('#death').html(result.death);
        }
    });

    //kenya
    $.ajax({
        url: '/dataKE',
        type: 'POST',
        dataType: 'json',
        success:(result)=>{
            console.log(result);
            $('#infection_ke').html(result.infection);
            $('#recovered_ke').html(result.recovered);
            $('#death_ke').html(result.death);
        }
    });

    $.ajax({
        url: '/getBlog',
        type: 'POST',
        dataType: 'json',
        success:(result)=>{
            console.log(result);
        }
        
    });

});