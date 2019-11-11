window.addEventListener("DOMContentLoaded", init);

function init() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");

    if(id){
        getSingleEvent(id);
    }
    else{
        getData();
    }
    //    console.log("id")
}

function getData() {
    //    console.log("getData")
    fetch("http://www.nasehorn.com/huset_wp/wp-json/wp/v2/event?_embed")
        .then(res => res.json())
        .then(handleData)
}

function handleData(myData) {
    //    console.log(myData);
    //1. loop
    myData.forEach(showEvent)
}


function getSingleEvent(catId) {
   // const urlParams = new URLSearchParams(window.location.search);
  //  const id = urlParams.get("id");
    console.log("single event");
    fetch("http://www.nasehorn.com/huset_wp/wp-json/wp/v2/event/" + catId)
        .then(res => res.json())
        .then(showSingleEvent)
}

    function showSingleEvent(event) {
        console.log(event)
        document.querySelector("article h1").textContent = event.title.rendered
    }


function showEvent(event) {
    //if(event._embedded["wp:featuredmedia"][0]){
    //console.log(event._embedded["wp:featuredmedia"]);
    //

    const template = document.querySelector(".eventTemplate").content;
    const eventCopy = template.cloneNode(true);
    //3. textcontent and innerhtml
    const h1 = eventCopy.querySelector("h1")
    h1.textContent = event.title.rendered;

    if (typeof (event._embedded["wp:featuredmedia"]) !== 'undefined') {
        console.log(event._embedded["wp:featuredmedia"]);
        //debugger;
        const img = eventCopy.querySelector("img.cover");
        const imgPath = event._embedded["wp:featuredmedia"][0].media_details.sizes.thumbnail.source_url;
        img.setAttribute("src", imgPath)
        img.setAttribute("alt", "Poster for event" + event.title.rendered)
    }



    const a = eventCopy.querySelector("a");
    a.href = "sub.html?id=" + event.id

    const content = eventCopy.querySelector("section");
    content.innerHTML = event.content.rendered;

    //4 append
    document.querySelector("#posts").appendChild(eventCopy)
}
