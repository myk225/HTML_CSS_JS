const Apikey="2bd0f894e38840a8a72422592e617467";
const URL="https://newsapi.org/v2/everything?q=";
async function fetchNews(query){
    const response=await fetch(`${URL}=${query}&apikey=${Apikey}`);
    const data=await response.json();
    console.log(data);
    bindData(data.articles); 
    
}
function bindData(articles){
    const cardContainer=document.querySelector(".card-container");
    const newsCardTemplate=document.querySelector("#template-news-card");
    cardContainer.innerHTML="";

    articles.forEach(article => {
            if(!article.urlToImage) return;
            const cardClone=newsCardTemplate.content.cloneNode(true);
            fillDataInCard(cardClone,article);
            cardContainer.appendChild(cardClone);
    });
}

function fillDataInCard(element,article){
    
    const cardImg=element.querySelector("#news-img");
    const cardTitle=element.querySelector("#news-title");
    const cardSource=element.querySelector("#news-source");
    const newsDesc=element.querySelector("#news-desc");
    cardImg.setAttribute("src",`${article.urlToImage}`);
    cardTitle.innerHTML=article.title;
    cardSource.innerHTML=article.source.name;
    newsDesc.innerHTML=article.description;
    
    element.firstElementChild.addEventListener("click",()=>{
        window.open(article.url,"_blank");
    })
}
let currentActiveNav=null;
function onNavItemClick(id){
    fetchNews(id);
   
    const navItem=document.getElementById(id);
    console.log(navItem);
    currentActiveNav?.classList.remove('active');
    currentActiveNav=navItem;
    currentActiveNav.classList.add('active');
}
const searchText=document.getElementById('search');
function onSearchBtnClick(){
    const mySearchText=searchText.value;
    mySearchText? fetchNews(mySearchText): "";
    currentActiveNav?.classList.remove('active');   
}
window.addEventListener('load',fetchNews("india"));

