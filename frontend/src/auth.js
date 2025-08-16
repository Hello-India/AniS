const api = "http://64.227.136.20:5000/api";

document.getElementById('loginForm').addEventListener('submit', async e => {
  e.preventDefault();
  const form = e.target;
  const data = {
    username: form.username.value,
    password: form.password.value
  };
  const res = await fetch(`${api}/user/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  const result = await res.json();
  if (result.token) {
    localStorage.setItem("anis-token", result.token);
    document.getElementById('login-msg').innerText = "Login successful!";
    setTimeout(() => window.location.href = "admin.html", 1200);
  } else {
    document.getElementById('login-msg').innerText = result.error || "Login failed.";
  }
});
