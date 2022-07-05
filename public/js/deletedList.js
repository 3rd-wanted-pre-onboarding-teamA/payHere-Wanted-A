// 복원이미지 클릭 동작
function restore(id) {
  if (confirm("복원하시겠습니까?")) {
    restoreAccountBook(id).then((message) => {
      alert(message);
      location.href = "/accountBook/list";
    });
  }
}

// 복원 기능 수행 함수
async function restoreAccountBook(id) {
  try {
    const receiveData = await fetch(`/accountBook/restore?id=${id}`);
    const data = await receiveData.json();
    return data.message;
  } catch (err) {
    console.log(err);
  }
}