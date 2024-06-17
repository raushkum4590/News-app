// Variables
const generalBtn = document.getElementById("genral");
const businessBtn = document.getElementById("business");
const sportsBtn = document.getElementById("sport");
const entertainmentBtn = document.getElementById("entertainment");
const technologyBtn = document.getElementById("technology");
const searchBtn = document.getElementById("searchBtn");

const newsQuery = document.getElementById("newsQuery");
const newsType = document.getElementById("newsType");
const newsdetails = document.getElementById("newsdetails");

// Array
var newsDataArr = [];

// API key
const API_KEY = "9c395dde55084dd09ecd7e09c62e2c89";

// API Endpoints
const HEADLINES_NEWS = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${API_KEY}`;
const GENERAL_NEWS = `https://newsapi.org/v2/top-headlines?country=in&category=general&apiKey=${API_KEY}`;
const BUSINESS_NEWS = `https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=${API_KEY}`;
const SPORTS_NEWS = `https://newsapi.org/v2/top-headlines?country=in&category=sports&apiKey=${API_KEY}`;
const ENTERTAINMENT_NEWS = `https://newsapi.org/v2/top-headlines?country=in&category=entertainment&apiKey=${API_KEY}`;
const TECHNOLOGY_NEWS = `https://newsapi.org/v2/top-headlines?country=in&category=technology&pageSize=8&apiKey=${API_KEY}`;
const SEARCH_NEWS = `https://newsapi.org/v2/everything?apiKey=${API_KEY}&q=`;

// Event Listeners
window.onload = function() {
    newsType.innerHTML = "<h4>Headlines</h4>";
    fetchHeadlines();
};

generalBtn.addEventListener("click", function() {
    newsType.innerHTML = "<h4>General News</h4>";
    fetchGeneralNews();
});

businessBtn.addEventListener("click", function() {
    newsType.innerHTML = "<h4>Business</h4>";
    fetchBusinessNews();
});

sportsBtn.addEventListener("click", function() {
    newsType.innerHTML = "<h4>Sports</h4>";
    fetchSportsNews();
});

entertainmentBtn.addEventListener("click", function() {
    newsType.innerHTML = "<h4>Entertainment</h4>";
    fetchEntertainmentNews();
});

technologyBtn.addEventListener("click", function() {
    newsType.innerHTML = "<h4>Technology</h4>";
    fetchTechnologyNews();
});

searchBtn.addEventListener("click", function() {
    newsType.innerHTML = `<h4>Search: ${newsQuery.value}</h4>`;
    fetchQueryNews();
});

// Fetch Functions
const fetchHeadlines = async () => {
    await fetchNews(HEADLINES_NEWS);
}

const fetchGeneralNews = async () => {
    await fetchNews(GENERAL_NEWS);
}

const fetchBusinessNews = async () => {
    await fetchNews(BUSINESS_NEWS);
}

const fetchSportsNews = async () => {
    await fetchNews(SPORTS_NEWS);
}

const fetchEntertainmentNews = async () => {
    await fetchNews(ENTERTAINMENT_NEWS);
}

const fetchTechnologyNews = async () => {
    await fetchNews(TECHNOLOGY_NEWS);
}

const fetchQueryNews = async () => {
    if (!newsQuery.value) return;
    await fetchNews(`${SEARCH_NEWS}${encodeURIComponent(newsQuery.value)}`);
}

const fetchNews = async (url) => {
    newsDataArr = [];
    try {
        const response = await fetch(url);
        if (response.ok) {
            const myJson = await response.json();
            newsDataArr = myJson.articles;
            displayNews();
        } else {
            console.error(response.status, response.statusText);
            newsdetails.innerHTML = "<h5>No data found.</h5>";
        }
    } catch (error) {
        console.error("Fetch error: ", error);
        newsdetails.innerHTML = "<h5>No data found.</h5>";
    }
}

function displayNews() {
    newsdetails.innerHTML = "";

    newsDataArr.forEach(news => {
        const date = news.publishedAt.split("T");

        const col = document.createElement('div');
        col.className = "col-sm-12 col-md-4 col-lg-3 p-2 card";

        const card = document.createElement('div');
        card.className = "p-2";

        const image = document.createElement('img');
        image.setAttribute("height", "matchparent");
        image.setAttribute("width", "100%");
        image.src = news.urlToImage || '';

        const cardBody = document.createElement('div');

        const newsHeading = document.createElement('h5');
        newsHeading.className = "card-title";
        newsHeading.innerHTML = news.title;

        const dateHeading = document.createElement('h6');
        dateHeading.className = "text-primary";
        dateHeading.innerHTML = date[0];

        const description = document.createElement('p');
        description.className = "text-muted";
        description.innerHTML = news.description || '';

        const link = document.createElement('a');
        link.className = "btn btn-dark";
        link.setAttribute("target", "_blank");
        link.href = news.url;
        link.innerHTML = "Read more";

        cardBody.appendChild(newsHeading);
        cardBody.appendChild(dateHeading);
        cardBody.appendChild(description);
        cardBody.appendChild(link);

        card.appendChild(image);
        card.appendChild(cardBody);

        col.appendChild(card);

        newsdetails.appendChild(col);
    });
}
    




