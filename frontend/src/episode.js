const api = "http://localhost:5000/api";
const params = new URLSearchParams(window.location.search);
const animeId = params.get("animeId");
const epNum = params.get("epNum");

async function loadEpisode() {
  const animeRes = await fetch(`${api}/anime/${animeId}`);
  const anime = await animeRes.json();
  const episode = anime.episodes.find(ep => ep.number == epNum);
  if (!episode) {
    document.getElementById('episode-player').innerHTML = "<h3>Episode not found.</h3>";
    return;
  }
  document.getElementById('episode-player').innerHTML = `
    <h2>${anime.title} – ${episode.title} (Ep ${episode.number})</h2>
    <video id="player" controls crossorigin playsinline>
      <source src="${episode.videoUrl}" type="video/mp4">
    </video>
    <div class="mt-3">
      <a class="btn btn-secondary" href="anime.html?id=${anime._id}">Back to Anime</a>
    </div>
    <script>const player = new Plyr('#player');</script>
  `;
  new Plyr('#player');
}

document.addEventListener("DOMContentLoaded", loadEpisode);
