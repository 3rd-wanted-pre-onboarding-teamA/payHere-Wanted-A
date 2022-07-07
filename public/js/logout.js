function logout() {
  localStorage.removeItem("access-token");
  localStorage.removeItem("refresh-token");
  location.href = "/";
}