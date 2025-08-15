const api = "http://localhost:5000/api";
const token = localStorage.getItem("anis-token") || "";

document.getElementById('addAnimeForm').addEventListener('submit', async e => {
  e.preventDefault();
  const form = e.target;
  const data = {
    title: form.title.value,
    description: form.description.value,
    genres: form.genres.value.split(',').map(x => x.trim()),
    year: form.year.value,
    coverImage: form.coverImage.value
  };
  const res = await fetch(`${api}/anime`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
    body: JSON.stringify(data)
  });
  const result = await res.json();
  document.getElementById('admin-messages').innerText = result.error || "Anime added!";
  form.reset();
});

document.getElementById('uploadEpisodeForm').addEventListener('submit', async e => {
  e.preventDefault();
  const form = e.target;
  const data = {
    animeId: form.animeId.value,
    title: form.title.value,
    number: form.number.value,
    videoUrl: form.videoUrl.value
  };
  const res = await fetch(`${api}/episode`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
    body: JSON.stringify(data)
  });
  const result = await res.json();
  document.getElementById('admin-messages').innerText = result.error || "Episode uploaded!";
  form.reset();
});
