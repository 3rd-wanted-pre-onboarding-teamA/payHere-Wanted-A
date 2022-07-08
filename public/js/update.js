function update() {
    updateAccountBook()
        .then(result => {
            console.log("되냐????", result);
            alert(result.message);
        });
    location.href = "/accountBook/list";
}

async function updateAccountBook() {
    try {
        const data = {
            account_book_id: document.getElementById("account_book_id").value,
            type: "지출",
            amount: document.getElementById("amount").value,
            purpose: document.getElementById("purpose").value,
            payment: "현금",
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