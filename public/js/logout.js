function logout() {
  localStorage.removeItem("access-token");
  location.href = "/";
}