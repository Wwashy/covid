
function open (){      
    document.getElementById("navi").style.display = "block";
return;
}

function close () {
    document.getElementById("navi").style.display= "none";  
    return;      
}
var close_btn = document.getElementById("close");
close_btn.onclick = closeMenu();
function showMenu() {
    document.getElementById("navi").style.top = "0px";
}
function closeMenu() {
        document.getElementById("navi").style.top = "-1000px";
}
