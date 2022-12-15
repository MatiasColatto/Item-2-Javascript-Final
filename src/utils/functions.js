const API_KEY = '5d886c5abd53ffa8b41eb14273bfc2c2'

export const fetchMovies = async (page) => {
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=es-AR&page=${page}`

    const data = await fetch(url)
    return data.json()
}


export const fetchSeries = async (page) => {
    const url = `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=es-AR&page=${page}`
    
    const data = await fetch(url)
    return data.json()
}