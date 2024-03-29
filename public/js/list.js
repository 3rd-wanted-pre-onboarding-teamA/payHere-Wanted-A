function toCreate() {
  location.href = "/accountBook/create";
}

function detail(id) {
  location.href = "/accountBook/detail?id=" + id;
}

function trash() {
  location.href = "/accountBook/deletedList";
}

function toMypage(id) {
  location.href = "/auth/mypage";
}

// 로그아웃
function logout() {
  submitLogout().then((message) => {
    alert(message);
    if (message === "로그아웃 되었습니다.") {
      location.href = "/";
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

// 수정하기로 이동
function update(id) {
  location.href = "/accountBook/update?id=" + id;
}

// 삭제하기
function remove(id) {
  if (confirm("삭제하시겠습니까?")) {
    removeAccountBook(id).then((message) => {
      alert(message);
      location.href = "/accountBook/list";
    });
  }
}

// 삭제하기
async function removeAccountBook(id) {
  try {
    const receiveData = await fetch(`/accountBook/delete?id=${id}`);
    const data = await receiveData.json();
    return data.message;
  } catch (err) {
    console.log(err);
  }
}