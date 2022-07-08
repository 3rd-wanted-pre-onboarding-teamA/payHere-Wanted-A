// 로그아웃 클릭 동작
function logout() {
  submitLogout().then((message) => {
    alert(message);
    if (message === "로그아웃 되었습니다.") {
      location.href = "/auth/login";
    }
  });
}

// 로그아웃 실행
async function submitLogout() {
  try {
    const submit = await fetch("/auth/logout");
    const result = await submit.json();
    return result.message;
  } catch (err) {
    throw err;
  }
}
