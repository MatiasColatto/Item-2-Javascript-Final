import { Movies } from "../views/Movies.js"
import { Series } from "../views/Series.js"

const root = document.getElementById('root')

const router = (route) => {
    root.innerHTML = ""
    const page = route.slice(-1)
    switch(route) {
        case `#/peliculas?page=${page}`: {
            root.appendChild(Movies(page))
            break
        }   
        case `#/series?page=${page}`:
            root.appendChild(Series(page))
            break
    }
}

export {router};