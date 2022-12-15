import { fetchSeries } from "../utils/functions.js";

/**
 * Movie data component
 * @returns A div element with the movies
 */
export function Series() {
    let element = document.createElement('div');
    let actualPage
    window.document.title = 'Series'

    const nxtBtn = window.document.getElementById('nextBtn')
    const backBtn = window.document.getElementById('backBtn')

    async function getSeries (){
        try {
            const url = new URLSearchParams(window.location.hash.split('series')[1])
            actualPage = url.get('page')
            
            nxtBtn.onclick = async function () {
                actualPage++            
                const newPage = `http://127.0.0.1:5500/index.html#/series?page=${actualPage}`
                window.location.href = newPage
            }
        
            backBtn.onclick = async function () {
                if (actualPage > 1) {
                    actualPage--
                    const newPage = `http://127.0.0.1:5500/index.html#/series?page=${actualPage}`
                    window.location.href = newPage
                }
            }
    
            let data = await fetchSeries(actualPage)

            const maxData = data.results.slice(data.results.length-5)

            
            let html = ""
            
            for(let i = 0; i < maxData.length;i++){
                const serie = data.results[i]
                const date = serie.first_air_date.split('-')[0]
                
                html += `
                    <section class="card-section" id="b${i}">
                        <img class="movie-img" src="https://image.tmdb.org/t/p/w500/${serie.backdrop_path}" alt="${serie.name}">
    
                        <div id="m${serie.id}" class="modal">
    
                            <div class="modal-content">
                                <span id="close${serie.id}" class="close"></span>
                                <img src="https://image.tmdb.org/t/p/w500/${serie.poster_path}" alt="${serie.name}">
                                <div class="description-div">
                                    <div class="title">
                                    <div>
                                        <label><b>${serie.original_name}</b> (${date})</label>
                                    </div>
                                        <h1>${serie.name}</h1>
                                        <p>${serie.overview}</p> 
                                    </div>
                                    <p class="valoracion">Valoración</p>
                                    <p><b>${serie.vote_average}</b>
                                        <meter id="fuel"
                                            min="0" max="10"
                                            low="3" high="6" optimum="8"
                                            value="${serie.vote_average}">
                                            at ${serie.vote_average}/10
                                        </meter>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                `
            }
            element.innerHTML = html
    
            for(let i = 0; i < maxData.length;i++){
                const serie = data.results[i]
                
                let btn = element.querySelector(`#b${i}`)
    
                let modal = element.querySelector(`#m${serie.id}`);
            
                let span = element.querySelector(`#close${serie.id}`);
            
                btn.onclick = function() {
                    modal.style.display = "block";
                    window.document.title = `Series | ${serie.name}`
                }
            
                span.onclick = function() {
                    modal.style.display = "none";
                }
            
                window.addEventListener('click', (e) => {
                    if (e.target == modal) {
                        modal.style.display = "none";
                        window.document.title = 'Series'
                    }
                })
            }
        } catch (error) {
            console.error(`Hubo un error ${error}`)
        }
    }
    getSeries()
    
    
    return element
}
