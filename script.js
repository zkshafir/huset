window.addEventListener("DOMContentLoaded", init);

function init() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");

    if (id) {
        getSingleEvent(id);
    } else {
        getData();
    }
    //        console.log("id")
}

function getData() {
    //        console.log("getData")
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
    //    console.log("single event");
    fetch("http://www.nasehorn.com/huset_wp/wp-json/wp/v2/event/" + catId + "?_embed")
        .then(res => res.json())
        .then(showSingleEvent)
}

function showSingleEvent(event) {
    //    console.log(event)
    document.querySelector("article h1").textContent = event.title.rendered

    const imgPath = event._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url;

    document.querySelector(".body_copy").innerHTML = event.content.rendered;

    const img = document.querySelector(".cover");
    img.setAttribute("src", imgPath);

}

function showEvent(event) {
    const template = document.querySelector(".eventTemplate").content;
    const eventCopy = template.cloneNode(true);

    //3. textcontent and innerhtml
    const h1 = eventCopy.querySelector("h1")
    h1.textContent = event.title.rendered;

    // add featured image
    if (typeof (event._embedded["wp:featuredmedia"]) !== 'undefined') {
        const img = eventCopy.querySelector("img.cover");
        const imgPath = event._embedded["wp:featuredmedia"][0].media_details.sizes.medium_large.source_url;
        img.setAttribute("src", imgPath)
        img.setAttribute("alt", "Poster for event" + event.title.rendered)
    }

    const a = eventCopy.querySelector("a");
    a.href = "sub.html?id=" + event.id

    // add content to section in template
    const content = eventCopy.querySelector(".body_copy");
    content.innerHTML = event.excerpt.rendered;

    const bodyDate = eventCopy.querySelector(".body_date");
    bodyDate.textContent = event.event_date;

    const bodyTime = eventCopy.querySelector(".body_time");
    bodyTime.textContent = event.start_time;

    const bodyVenue = eventCopy.querySelector(".body_venue");
    bodyVenue.textContent = event.venue;

    //    const bodyTicket = eventCopy.querySelector(".body_ticket");
    //    bodyTicket.innerHTML = event.purchase_ticket;

    //4 append
    document.querySelector("#posts").appendChild(eventCopy)
}
