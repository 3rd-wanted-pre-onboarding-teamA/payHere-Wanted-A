function update() {
  updateAccountBook().then((result) => {
    alert(result.message);
  });
  location.href = "/accountBook/list";
}

async function updateAccountBook() {
  try {
    const data = {
      account_book_id: document.getElementById("account_book_id").value,
      type: document.querySelector('input[name="type"]:checked').value,
      amount: document.getElementById("amount").value,
      purpose: document.getElementById("purpose").value,
      payment: document.querySelector('input[name="payment"]:checked').value,
      memo: document.getElementById("memo").value,
    };
    console.log(data);

    const opt = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    const update = await fetch("/accountBook/updateAction", opt);
    const result = await update.json();

    return result;
  } catch (err) {
    throw err;
  }
}
