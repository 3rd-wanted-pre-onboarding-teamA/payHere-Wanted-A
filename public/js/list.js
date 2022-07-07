// 상세보기로 이동
function detail(id) {
  location.href = "/accountBook/detail?id=" + id;
}

function trash() {
  location.href = "/accountBook/deletedList";
}