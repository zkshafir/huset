window.addEventListener("DOMContentLoaded", init);

function init() {
    const urlParams = new URLSearchParams(window.location.search);
    const search = urlParams.get("search");
    const id = urlParams.get("id");
    const category = urlParams.get("category");

    if (id) {
        getSingleEvent(id);
    } else if (category) {
        getCategoryData(category);
    } else {
        getData();
    }
    //        console.log("id")


    getNavigation();
}

function getNavigation() {
    fetch("http://www.nasehorn.com/huset_wp/wp-json/wp/v2/categories?per_page=100")
        .then(res => res.json())
        .then(data => {
            //        console.log(data)
            data.forEach(addLink)
        })
}

function addLink(oneItem) {
    console.log(oneItem.name)
    //    document.querySelector("nav").innerHTML=oneItem.name

    function getSearchData() {
        const urlParams = new URLSearchParams(window.location.search);
        const search = urlParams.get("search");

        fetch("https://kea-alt-del.dk/t9_2019_autumn/wp-json/wp/v2/book?_embed&search=" + search)
            .then(res => res.json())
            .then(handleData)
    }

    const link = document.createElement("a");
    link.textContent = oneItem.name;
    link.setAttribute("href", "category.html?category=" + oneItem.id)
    document.querySelector("nav").appendChild(link);

}

function getData() {
    //        console.log("getData")
    fetch("http://www.nasehorn.com/huset_wp/wp-json/wp/v2/event?_embed")
        .then(res => res.json())
        .then(handleData)
}

function getCategoryData(catId) {
    //        console.log("getData")
    fetch("http://www.nasehorn.com/huset_wp/wp-json/wp/v2/event?_embed&per_page=100&categories=" + catId)
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


    if (typeof (event._embedded["wp:featuredmedia"]) !== 'undefined') {
        console.log(event._embedded["wp:featuredmedia"]);
        //debugger;

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

//nav//

const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    //    Toggle Nav
    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');

        //Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = ''
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.6}s`;
            }
        });

        //     Burger Animation

        burger.classList.toggle('toggle');

    });

}

navSlide();
