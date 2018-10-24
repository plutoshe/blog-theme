var isOpenNav = false;
function openNav() {
    document.getElementById("mySidenav").style.width = "15em";
    document.getElementById("main").style.marginLeft = "15em";
    var element = document.getElementById("overlay");
    element.style.marginLeft = "15em";
    element.classList.add("show");
    isOpenNav = ~isOpenNav;
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
    var element = document.getElementById("overlay");
    element.style.marginLeft = "0";
    element.classList.remove("show");
    isOpenNav = ~isOpenNav;
}

function menuOperation() {
    if (isOpenNav) {
        closeNav();
    } else {
        openNav();
    }
    
}

window.onload = function () {
    document.getElementById("overlay").addEventListener('click', closeNav);
    document.getElementById('menu').addEventListener('click', menuOperation);

}