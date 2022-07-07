//아이디 중복 검사 클릭 동작
function clickCheckId() {
  checkIdAction().then(message => {
    alert(message);
  });
}

// 아이디 중복 검사 실행 함수
async function checkIdAction() {
  try {
    const data = {
      member_id : document.getElementById("member_id").value
    }
    const opt = {
      method: "POST",
      headers : {"Content-Type" : "application/json"},
      body: JSON.stringify(data)
    }
    const checkIdValid = await fetch("/auth/checkIdAction", opt);
    const result = await checkIdValid.json();
    return result.message;
  } catch (err) {
    throw err;
  }
}

// 회원가입 클릭 동작
function clickSignUp() {
  submitSignUp().then(message => {
    alert(message);
  });
}

// 회원가입 제출
async function submitSignUp() {
  try {
    const data = {
      member_id: document.getElementById("member_id").value,
      member_pw: document.getElementById("member_pw").value,
      member_name: document.getElementById("member_name").value,
      phone_number: document.getElementById("phone_number").value,
      balance: document.getElementById("balance").value
    }

    const opt = {
      method: "POST",
      headers : {"Content-Type" : "application/json"},
      body : JSON.stringify(data)
    };

    const submit = await fetch("/auth/newUserAction", opt);
    const result = await submit.json();
    return result.message;
  } catch (err) {
    throw err;
  }
}