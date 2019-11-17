window.addEventListener("DOMContentLoaded", init);

function init() {
    const urlParams = new URLSearchParams(window.location.search);
    //    const search = urlParams.get("search");
    const id = urlParams.get("id");
    const category = urlParams.get("category");

    if (id) {
        getSingleEvent(id);
    } else if (category) {
        getCategoryData(category);
    } else {
        getData();
    }

    getNavigation();
}

// get categories for navigation
function getNavigation() {
    fetch("http://www.nasehorn.com/huset_wp/wp-json/wp/v2/categories?per_page=100")
        .then(res => res.json())
        .then(data => {
            data.forEach(addLink)
        })

    //    // add tags
    //    //        fetch("http://www.nasehorn.com/huset_wp/wp-json/wp/v2/tags?per_page=100")
    //    fetch("http://www.nasehorn.com/huset_wp/wp-json/wp/v2/tags?=" + 2)
    //        .then(res => res.json())
    //        .then(data => {
    //            data.forEach(addLink)
    //        })
}

// function for search + add categories to navigation
function addLink(oneItem) {
    const link = document.createElement("a");
    link.textContent = oneItem.name;
    link.setAttribute("href", "index.html?category=" + oneItem.id);
    //    link.setAttribute("href", "index.html?category=" + 9 + "%2B" + 2);
    document.querySelector(".side-nav").appendChild(link);
}

// get JSON date + embedded data
function getData() {
    fetch("http://www.nasehorn.com/huset_wp/wp-json/wp/v2/event?_embed")
        .then(res => res.json())
        .then(handleData)
}

// get categories
function getCategoryData(catId) {
    fetch("http://www.nasehorn.com/huset_wp/wp-json/wp/v2/event?_embed&per_page=100&categories=" + catId)
        .then(res => res.json())
        .then(handleData)

    // get tags
    fetch("http://www.nasehorn.com/huset_wp/wp-json/wp/v2/event?_embed&per_page=100&tags=" + catId)
        .then(res => res.json())
        .then(handleData)
}

function handleData(myData) {
    myData.forEach(showEvent)
    fetch("http://www.nasehorn.com/huset_wp/wp-json/wp/v2/event?_embed&per_page=100&categories=" + catId)
    fetch("http://www.nasehorn.com/huset_wp/wp-json/wp/v2/event?_embed&per_page=100&tags=" + catId)
}

function getSingleEvent(catId) {
    fetch("http://www.nasehorn.com/huset_wp/wp-json/wp/v2/event/" + catId + "?_embed")
        .then(res => res.json())
        .then(showSingleEvent)
}

// show single event on sub page
function showSingleEvent(event) {
    document.querySelector("article h1").textContent = event.title.rendered;
    const imgPath = event._embedded["wp:featuredmedia"][0].media_details.sizes.large.source_url;

    document.querySelector(".body_copy").innerHTML = event.content.rendered;
    const img = document.querySelector(".cover");
    img.setAttribute("src", imgPath);

    document.querySelector(".body_venue").textContent = event.venue;
    document.querySelector(".body_date").textContent = event.event_date;
    document.querySelector(".body_time").textContent = event.start_time;
}

// show all events on index page
function showEvent(event) {
    const template = document.querySelector(".eventTemplate").content;
    const eventCopy = template.cloneNode(true);

    const eventTitle = eventCopy.querySelector(".event_title");
    eventTitle.textContent = event.title.rendered;

    const eventExcerpt = eventCopy.querySelector(".event_excerpt");
    eventExcerpt.innerHTML = event.excerpt.rendered;

    const bodyDate = eventCopy.querySelector(".body_date");
    bodyDate.textContent = event.event_date;

    const bodyTime = eventCopy.querySelector(".body_time");
    bodyTime.textContent = event.start_time;

    const bodyVenue = eventCopy.querySelector(".body_venue");
    bodyVenue.textContent = event.venue;

    const eventTags = eventCopy.querySelector(".event_tags");
    eventTags.textContent = event.tags;

    if (eventTags.textContent.includes("42")) {
        const h3 = eventCopy.querySelector(".meal_type");
        h3.textContent = ("Vegan");
        h3.style.color = "green";
        const imgContainer = eventCopy.querySelector(".event_excerpt");
        imgContainer.setAttribute("class", "vegan_meal");
}

const a = eventCopy.querySelector("a");
a.href = "sub.html?id=" + event.id;

const img = eventCopy.querySelector("img.cover");
const imgPath = event._embedded["wp:featuredmedia"][0].media_details.sizes.large.source_url;
img.setAttribute("src", imgPath)
img.setAttribute("alt", "Poster for event" + event.title.rendered)

//    const bodyTicket = eventCopy.querySelector(".body_ticket");
//    bodyTicket.innerHTML = event.purchase_ticket;

document.querySelector("#posts").appendChild(eventCopy)
}

// navigation mobile
function openSlideMenu(){
    document.getElementById('side-menu').style.width = '250px';
    document.getElementById('main_content').style.marginLeft = '250px';
}

function closeSlideMenu(){
    document.getElementById('side-menu').style.width = '0';
    document.getElementById('main_content').style.marginLeft = '0';
}

