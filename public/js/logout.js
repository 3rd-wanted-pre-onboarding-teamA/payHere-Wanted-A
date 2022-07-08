function logout() {
  submitLogout().then(message => {
    alert(message);
    if (message === "로그아웃 되었습니다.") {
      location.href = "/auth/login";
    }
  });
}

async function submitLogout() {
  try {
    const submit = await fetch("/auth/logout");
    console.log(submit);
    console.log(typeof submit);
    const result = await submit.json();
    console.log(result);
    console.log(typeof result);
    return result.message;
  } catch (err) {
    throw err;
  }
}