const api = "http://64.227.136.20:5000/api";

function renderAnimeCard(anime) {
  return `<div class="col-md-3">
    <div class="card">
      <img src="${anime.coverImage || 'https://placehold.co/300x400'}" class="card-img-top" alt="${anime.title}">
      <div class="card-body">
        <h5 class="card-title">${anime.title}</h5>
        <p class="card-text">${anime.description?.slice(0, 100)}...</p>
        <a href="anime.html?id=${anime._id}" class="btn btn-primary">View</a>
      </div>
    </div>
  </div>`;
}

async function loadAnimeList() {
  const res = await fetch(`${api}/anime`);
  const list = await res.json();
  document.getElementById('anime-list').innerHTML =
    list.map(renderAnimeCard).join('');
}

document.addEventListener("DOMContentLoaded", loadAnimeList);

// Search bar
document.getElementById('searchForm').addEventListener('submit', async e => {
  e.preventDefault();
  const q = document.getElementById('searchInput').value;
  if (!q.trim()) return;
  const res = await fetch(`${api}/anime/search/${encodeURIComponent(q)}`);
  const list = await res.json();
  document.getElementById('anime-list').innerHTML =
    list.map(renderAnimeCard).join('');
});
