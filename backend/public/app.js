const authSection = document.getElementById("auth-section");
const mainSection = document.getElementById("main-section");
const loginFormContainer = document.getElementById("login-form-container");
const registerFormContainer = document.getElementById(
  "register-form-container"
);
const authMessage = document.getElementById("auth-message");
const uploadMessage = document.getElementById("upload-message");
const feedContainer = document.getElementById("feed-container");
const logoutBtn = document.getElementById("logout-btn");
const userInfo = document.getElementById("user-info");

const showLoginBtn = document.getElementById("show-login-btn");
const showRegisterBtn = document.getElementById("show-register-btn");

const API_BASE = "";

function showAuth() {
  authSection.classList.remove("hidden");
  mainSection.classList.add("hidden");
  loginFormContainer.classList.add("hidden");
  registerFormContainer.classList.add("hidden");
  authMessage.textContent = "";
}
function showLogin() {
  loginFormContainer.classList.remove("hidden");
  registerFormContainer.classList.add("hidden");
  authMessage.textContent = "";
}
function showRegister() {
  registerFormContainer.classList.remove("hidden");
  loginFormContainer.classList.add("hidden");
  authMessage.textContent = "";
}
function showMain() {
  authSection.classList.add("hidden");
  mainSection.classList.remove("hidden");
  uploadMessage.textContent = "";
}

function setToken(token) {
  localStorage.setItem("token", token);
}
function getToken() {
  return localStorage.getItem("token");
}
function clearToken() {
  localStorage.removeItem("token");
}

// --- Button Handlers ---
showLoginBtn.onclick = () => {
  showLogin();
};
showRegisterBtn.onclick = () => {
  showRegister();
};

// --- Auth Handlers ---
document.getElementById("signup-form").onsubmit = async (e) => {
  e.preventDefault();
  const name = document.getElementById("signup-name").value;
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;
  const res = await fetch(API_BASE + "/api/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });
  const data = await res.json();
  if (res.ok) {
    authMessage.textContent = "Registration successful! Please login.";
    showLogin();
  } else {
    authMessage.textContent = data.message || "Registration failed.";
  }
};

document.getElementById("login-form").onsubmit = async (e) => {
  e.preventDefault();
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;
  const res = await fetch(API_BASE + "/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (res.ok && data.token) {
    setToken(data.token);
    showMain();
    await loadUserInfo();
    await loadFeed();
  } else {
    authMessage.textContent = data.message || "Login failed.";
  }
};

// --- Upload Handler ---
document.getElementById("upload-form").onsubmit = async (e) => {
  e.preventDefault();
  const title = document.getElementById("upload-title").value;
  const description = document.getElementById("upload-description").value;
  const file = document.getElementById("upload-file").files[0];
  if (!file) return;
  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  formData.append("video", file);
  const res = await fetch(API_BASE + "/api/video/upload", {
    method: "POST",
    headers: { Authorization: "Bearer " + getToken() },
    body: formData,
  });
  const data = await res.json();
  if (res.ok) {
    uploadMessage.textContent = "Upload successful!";
    await loadFeed();
  } else {
    uploadMessage.textContent = data.message || "Upload failed.";
  }
};

// --- Feed Loader ---
async function loadFeed() {
  const res = await fetch(API_BASE + "/api/allvideo/videos");
  const data = await res.json();
  feedContainer.innerHTML = "";
  if (Array.isArray(data)) {
    data.forEach((video) => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `<h3>${video.title}</h3><video src="${video.videoUrl}" controls></video>`;
      feedContainer.appendChild(card);
    });
  } else {
    feedContainer.textContent = "No videos found.";
  }
}

// --- User Info Loader ---
async function loadUserInfo() {
  try {
    const res = await fetch(API_BASE + "/api/auth/profile", {
      headers: { Authorization: "Bearer " + getToken() },
    });
    if (res.ok) {
      const data = await res.json();
      userInfo.innerHTML = `<b>User:</b> ${data.name || ""} (${
        data.email || ""
      })`;
    } else {
      userInfo.innerHTML = "";
    }
  } catch {
    userInfo.innerHTML = "";
  }
}

// --- Navigation & Logout ---
logoutBtn.onclick = () => {
  clearToken();
  showAuth();
};

// --- Initial State ---
window.onload = async () => {
  if (getToken()) {
    showMain();
    await loadUserInfo();
    await loadFeed();
  } else {
    showAuth();
  }
};
