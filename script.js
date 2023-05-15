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
let i = 0
let right = 50

let left = 50



function forward() {



    console.log(i);

    let circleList = document.getElementsByClassName('zoza')


    while (i < circleList.length) {;

        circle = circleList[i]
        circle.style = ` right: ${right}px`
        i++
    }
    i = 0

    console.log(i)



    right += 50



}

function backward() {




    console.log(i);

    let circleList = document.getElementsByClassName('zoza')


    while (i < circleList.length) {;

        circle = circleList[i]
        circle.style = ` left: ${left}px`
        i++
    }
    i = 0


    console.log(i)



    left += 50



}







let movieList = []
let movieDetails = {}

let getMovie = (movieName) => {
    side = 50
    let image = document.querySelector('.poster')
    let mainURL = `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${movieName}`
    fetch(mainURL)
        .then((res) => {
            let all = res.json()

            return all

        })
        .then((info) => {
            allCircles.innerHTML = ''

            let allResults = info['total_pages']
            console.log(allResults);
            console.log(typeof(allResults));
            let x = 1
            allResults = Number(allResults)


            while (x < allResults) {






                let circle = document.createElement('li')
                circle.className = 'zoza'

                circle.innerText = (x)
                allCircles.append(circle)
                x++




            }





            movieList = info['results']
















            movieList.forEach(element => {
                movieDetails = element


                let imageSource = 'https://image.tmdb.org/t/p/w500' + movieDetails["poster_path"]

                let altImage = 'https://image.tmdb.org/t/p/w200' + movieDetails["backdrop_path"]
                let mOverview = `${movieDetails["overview"]}`
                let mTitle = movieDetails["title"]
                let mRelease = movieDetails["release_date"]
                mRelease = new Date(mRelease)

                mRelease = String(mRelease)

                mRelease = mRelease.replace('03:00:00 GMT+0300 (East Africa Time)', '');

                let li = document.createElement('li')
                li.innerHTML = ` <img src="${imageSource}" alt="Poster Unavailable" class="poster">
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
        console.log(input)
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