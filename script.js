const apiKey = '0a8f65ba7d20c09c59873061f1481771'


const searchURL = `https://api.themoviedb.org/3/movie/886?api_key=${apiKey}`
let scndURL = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=engineering&include_adult=false&page=2`

let trending = 'https://api.themoviedb.org/3/trending/all/day?api_key=0a8f65ba7d20c09c59873061f1481771'
const movieData = document.querySelector('.details')
const title = document.querySelector('.content.ttl')
const releaseDate = document.querySelector('.content.date')
const overview = document.querySelector('.content.overview')
const searchBar = document.querySelector('input')
const allMovies = document.querySelector('.allMovies')
const allCircles = document.querySelector('.circleContainer')
const counter = document.querySelector('.pages')


let movieList = []
let movieDetails = {}
let allPages = 0

let getMovie = (movieName, page = 1) => {
    side = 50
    let image = document.querySelector('.poster')
    let mainURL = `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${movieName}&page=${page}`
    let finalImage = ''


    console.log(mainURL);
    fetch(mainURL)
        .then((res) => {
            let all = res.json()

            return all

        })
        .then((info) => {


            let allResults = info['total_pages']



            counter.innerHTML = `${page}/${allResults}`
            allPages = allResults


            let x = 1
            allResults = Number(allResults)

            movieList = info['results']



            movieList.forEach(element => {
                movieDetails = element

                let imageSource = ''

                if (!movieDetails["poster_path"]) {
                    imageSource = 'error.png'

                } else {
                    imageSource = 'https://image.tmdb.org/t/p/w500' + movieDetails["poster_path"]

                }






                let altImage = 'https://image.tmdb.org/t/p/w300' + movieDetails["backdrop_path"]
                let mOverview = `${movieDetails["overview"]}`
                let mTitle = movieDetails["title"]

                if (!mTitle) {
                    mTitle = movieDetails['name']
                }
                let mRelease = movieDetails["release_date"]
                mRelease = new Date(mRelease)

                mRelease = String(mRelease)

                mRelease = mRelease.replace('03:00:00 GMT+0300 (East Africa Time)', '');




                let li = document.createElement('li')
                li.innerHTML = ` <img src="${imageSource}"  class="poster">
<div class="details">
    <div class="mTitle">
        <div class="entity">Title:</div>
        <div class="content ttl">${mTitle}</div>
    </div>
    <div class="mDate">
        <div class="entity">Released:</div>
        <div class="content date">${mRelease}</div>
    </div>
    <div class="mOverview">
        <div class="entity">Overview:</div>
        <div class="content overview">${mOverview}</div>
    </div>
</div>`
                allMovies.append(li)

            });

        })
}


function searchbar() {
    allMovies.innerHTML = ' <p>Please wait</p>'

    function update() {
        allMovies.innerHTML = ''


        let input = document.querySelector('.getName').value
            // console.log(input)
        getMovie(input)
    }

    setTimeout(update, 1000)
}



searchBar.addEventListener('keyup',
    () => {

        let keypress = event.key


        if (keypress === 'Enter') {





            searchbar()






        }
    }

)

let fwd = 1
let back = 1


function forward() {
    let input = document.querySelector('.getName').value
    if (fwd < allPages) {
        console.log("MovieList", movieList);
        allMovies.innerHTML = ''
        fwd++

        getMovie(input, fwd)

        back = fwd



    } else {
        allMovies.innerHTML = ''
        getMovie(input)
    }


}



function backward() {


    let input = document.querySelector('.getName').value

    if (back > 1) {
        allMovies.innerHTML = ''
        back += -1
        fwd = back
        getMovie(input, back);

    } else {
        allMovies.innerHTML = 'No more Pages'
        getMovie(input)
    }






}
