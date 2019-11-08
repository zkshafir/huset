window.addEventListener("DOMContentLoaded", getData)

function getData(){
    console.log("getData")
    fetch("http://www.nasehorn.com/huset_wp/wp-json/wp/v2/posts?_embed")
    .then(res=>res.json())
    .then(handleData)
}

function handleData(myData){
    console.log(myData)
}
