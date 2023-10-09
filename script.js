const searchForm=document.getElementById("search-form");
const inputsearchBox=document.getElementById("input-search");
const searchbtn=document.getElementById("search-btn");
const showMorebtn=document.getElementById("show-more-btn");
let query="";
let page=1;
async function fetchImages(){
    
    query=inputsearchBox.value;
    const response=await fetch(`https://api.unsplash.com/search/photos?page=${page}&query=${query}&client_id=KiUC-_TXdz1v783zjcl8IbHdQt2uVxI7cOEhcq_jF8w&per_page=15`);
    const data=await response.json(); 
    console.log(response);
    console.log(data);
    const images= await data.results;
    console.log(images);
    if(page===1){
        document.getElementById("search-result").innerHTML="";
    }
    images.map((image)=>{
        const img=document.createElement("img");
        img.src=image.urls.small;
        const imglink=document.createElement("a");
        imglink.href=image.links.html;
        imglink.target="_blank";
        imglink.appendChild(img);
        document.getElementById("search-result").appendChild(imglink);
    })
    showMorebtn.style.display="block";
}

searchForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    page=1;
    fetchImages();
})
showMorebtn.addEventListener("click",()=>{
    page++;
    fetchImages();
})

