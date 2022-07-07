function mypage() {
  let token = localStorage.getItem('access-token') || '';

  fetch('/auth/mypage', {
    headers: {
        'Authorization': token,
    }
  })
    .then(response => response.json())
    .then(response => {
      console.log(response.data);
    });
}