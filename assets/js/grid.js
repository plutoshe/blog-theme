var isOpenNav = false;
function displayDistinction() {

    //event.target.closest('.content').style.background = "yellow";
    event.target.closest('.content').style["padding"] = "0";
    event.target.closest('.content').style["-webkit-filter"] = "grayscale(" + 100 + "%)";
}

function backToGeneral() {

    //event.target.closest('.content').style.background = "black";
    event.target.closest('.content').style["padding"] = "10px";
    event.target.closest('.content').style["-webkit-filter"] = "grayscale(" + 0 + "%)";
    
}

{

    let prev_handler = window.onload;
    window.onload = function () {
        if (prev_handler) {
            prev_handler();
        }
        var list = document.getElementsByClassName("content");
        for (var i = 0; i < list.length; i++) {
            list[i].addEventListener('mouseover', displayDistinction);
            list[i].addEventListener('mouseout', backToGeneral);
        }
    };
}


