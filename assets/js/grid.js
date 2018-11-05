var isOpenNav = false;
function displayDistinction() {
    console.log("In");
    event.target.closest('div[class="content"]').style.background = "yellow";
}

function backToGeneral() {
    console.log("out");
    event.target.closest('div[class="content"]').style.background = "black";
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


