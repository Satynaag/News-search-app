const apikey='1ad741b1727442c68cfcfeeb9af335f9'

const blogContainer=document.getElementById("bolg-container");


async function fetchRandomNews() {
    try {
         const apiUrl=`https://newsapi.org/v2/top-headlines?country=us&apikey=${apikey}`
        const response = await fetch(`https://newsapi.org/v2/everything?q=tesla&from=2024-02-01&sortBy=publishedAt&apiKey=1ad741b1727442c68cfcfeeb9af335f9`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data.articles); // Check if data is received
        return data.articles;
    } catch (error) {
        console.log("ERROR fetching random news", error);
        return [];
    }
}

function displayBlogs(articles) {
    console.log("avinsh");
    blogContainer.innerHTML = "";

    articles.forEach((article) => {
        const blogCard = document.createElement("div");
        blogCard.classList.add("blog-card");
        
        const img = document.createElement("img");

        img.src = article.urlToImage;
        
        img.alt = article.title;
        //console.log(article.title);
        const title = document.createElement("h2");
        const truncatedTitle=article.title.length>30?article.title.slice(0,30)+"...":article.title;
        title.textContent=truncatedTitle;
        const description = document.createElement("p");
        const truncateddesc=article.description.length>120?article.description.slice(0,120)+"...":article.title;
        description.textContent = truncateddesc;
        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description);
        blogCard.addEventListener("click",()=>{
            window.open(article.url,"_blank");
        });
        blogContainer.appendChild(blogCard);
    });
}

(async () => {
    try {
        const articles = await fetchRandomNews();
        displayBlogs(articles);
    } catch (error) {
        console.error("Error fetching random news", error);
    }
})();

const searchField=document.getElementById('search-input');
const searchButton=document.getElementById('search-button');

searchButton.addEventListener("click",async ()=>{
    const query=searchField.value.trim();
    if(query!==""){
        try{
            const articles=await fetchNewsQuery(query);
            displayBlogs(articles);
        }
        catch(error){
            console.log("Error fetching news by query")
        }
    }
})

async function fetchNewsQuery(query){
    try {
        const apiUrl=`https://newsapi.org/v2/everything?q=${query}&pageSize=10&apikey=${apikey}`
       const response = await fetch(apiUrl);
       if (!response.ok) {
           throw new Error('Network response was not ok');
       }
       const data = await response.json();
       console.log(data.articles); // Check if data is received
       return data.articles;
   } catch (error) {
       console.log("ERROR fetching random news", error);
       return [];
   }
}