window.addEventListener("DOMContentLoaded", getData)

function getData(){
    console.log("getData")
    fetch("http://www.nasehorn.com/huset_wp/wp-json/wp/v2/posts?_embed")
    .then(res=>res.json())
    .then(handleData)
}

function handleData(myData){
//    console.log(myData);
    //1. loop
    myData.forEach(showPost)
}

function showPost(post){
    console.log(post)
    //2.cloning a template
    const template = document.querySelector(".postTemplate").content;
    const postCopy = template.cloneNode(true);
    //3. textcontent and innerhtml
    const h1 = postCopy.querySelector("h1")
    h1.textContent=post.title.rendered;
    //4 append
    document.querySelector("#posts").appendChild(postCopy)
}
