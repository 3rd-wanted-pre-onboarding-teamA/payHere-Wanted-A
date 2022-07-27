function clickCreate() {
  createAccoutBook().then((result) => {
    alert(result.message);
    location.href = "/accountBook/list";
  });
}

async function createAccoutBook() {
  location.href = "/accountBook/create";
  try {
    const data = {
      type: document.querySelector('input[name="type"]:checked').value,
      amount: document.getElementById("amount").value,
      purpose: document.getElementById("purpose").value,
      payment: document.querySelector('input[name="payment"]:checked').value,
      memo: document.getElementById("memo").value,
      use_date: document.getElementById("use_date").value
    };

    const opt = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    const create = await fetch("/accountBook/createAction", opt);
    const result = await create.json();
    return result;
  } catch (err) {
    throw err;
  }
}