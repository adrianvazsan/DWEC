function ShowHide(){
    var container = document.getElementById("container1")[0];

    if(container.style.visibility == "hidden"){
        container.style.visibility = "visible";
    }else{
        container.style.visibility = "hidden";
    }
}