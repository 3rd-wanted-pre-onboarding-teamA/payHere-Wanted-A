// 상세보기로 이동
function detail(id) {
  location.href = "/accountBook/detail?id=" + id;
}

function trash() {
  location.href = "/accountBook/deletedList";
}

// 수정하기로 이동
function update(id) {
  // console.log("aaa");
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

// 복원 기능 수행 함수
async function removeAccountBook(id) {
  try {
    const receiveData = await fetch(`/accountBook/delete?id=${id}`);
    const data = await receiveData.json();
    return data.message;
  } catch (err) {
    console.log(err);
  }
}