// 로그인 클릭 동작
function clickLogin() {
  submitLogin().then(result => {
    alert(result.message);
    if (result.message === "로그인이 되었습니다.") {
      localStorage.setItem("access-token", result.accessToken);
      location.href = "/accountBook/list";
    }
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
function movejoin() {
  location.href = "/auth/join";
}