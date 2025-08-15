const api = "http://localhost:5000/api";
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

async function loadAnime() {
  const res = await fetch(`${api}/anime/${id}`);
  const anime = await res.json();
  document.getElementById('anime-detail').innerHTML = `
    <div class="row">
      <div class="col-md-4">
        <img src="${anime.coverImage || 'https://placehold.co/300x400'}" class="img-fluid" alt="${anime.title}">
      </div>
      <div class="col-md-8">
        <h2>${anime.title}</h2>
        <p>${anime.description}</p>
        <p><strong>Genres:</strong> ${anime.genres.join(', ')}</p>
        <p><strong>Status:</strong> ${anime.status}</p>
        <p><strong>Year:</strong> ${anime.year}</p>
        <h4>Episodes</h4>
        <ul>
          ${anime.episodes.map(ep =>
            `<li>
              <a href="episode.html?animeId=${anime._id}&epNum=${ep.number}">${ep.title} (Ep ${ep.number})</a>
            </li>`
          ).join('')}
        </ul>
      </div>
    </div>
  `;
}

document.addEventListener("DOMContentLoaded", loadAnime);
