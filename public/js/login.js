// 로그인 클릭 동작
function clickLogin() {
  submitLogin().then(result => {
    alert(result.message);
    localStorage.setItem("access-token", result.accessToken);
    localStorage.setItem("refresh-token", result.refreshToken);
    location.href = "/accountBook/list"
  });
}

// 로그인 제출
async function submitLogin() {
  try {
    const data = {
      member_id: document.getElementById("member_id").value,
      member_pw: document.getElementById("member_pw").value,
    }

    const opt = {
      method: "POST",
      headers : {"Content-Type" : "application/json"},
      body : JSON.stringify(data)
    };

    const submit = await fetch("/auth/loginAction", opt);
    const result = await submit.json();
    return result;
  } catch (err) {
    throw err;
  }
}

// 회원가입 창으로 이동
function moveSignUp() {
  location.href = "/auth/newUser";
}