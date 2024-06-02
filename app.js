const API_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="';

  //select elements that we need

  const form = document.getElementById('form')
  const search = document.getElementById('search')
  const main = document.getElementById('main')

//   console.log(form, search, main); 

const empty = document.querySelector(".empty")

async function getMovies(url){
    empty.style.display = "none";
    main.innerHTML ='';
    const response = await fetch(url)
    const data = await response.json()
    if(data.results.length >= 1){
        displayMovies(data.results)
    }else{
       empty.style.display = "block";  
    }
    
}

getMovies(API_URL); 

function displayMovies(movies){
    main.innerHTML = ''
     
    movies.forEach((movie) => {
        //object destructuring
        const {title, poster_path, vote_average, overview} = movie

        const movieDiv = document.createElement('div')
        movieDiv.classList.add('movie')

        //creating a data template for each movie in results(movies)
        movieDiv.innerHTML = `
            <img src = "${IMG_PATH + poster_path}" alt ="${title}">
            <div class='movie-info'>
                <h3> ${title} </h3>
                <span class = "${checkVoteClass(vote_average)}"> ${vote_average} </span>
            </div>
            <div class = 'overview'>
                <h3>Overview</h3>
                ${overview}
            </div>
        `;
        main.appendChild(movieDiv)
    });
}

function checkVoteClass(vote){
    if(vote >= 8){
        return 'green'
    }else if(vote >= 6){
        return 'orange'
    }else{
        return 'red'
    }
}

// working on search functionality
const hiddenSearch = document.querySelector(".hidden-search");
const span = document.querySelector(".hidden-search span");

form.addEventListener('submit', (e)=>{
    e.preventDefault()
    const searchValue = search.value.trim()
   
    if(searchValue){
        hiddenSearch.style.display = "block";
        span.textContent = searchValue;
        getMovies(SEARCH_API + searchValue)
        search.value = "";
    }else{
        window.location.reload();
    }   
});
