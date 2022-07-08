function update() {
    console.log(11111111);
    
    updateAccoutBook()
        .then(result => {
            console.log("되냐????", result);
            alert(result.message);
        });
    location.href = "/accountBook/list";
}

async function updateAccoutBook() {
    console.log(22222222);
    try {
        console.log(3333333333);
        const data = {
            account_book_id: document.getElementById("account_book_id").value,
            type: "지출",
            amount: document.getElementById("payment").value,
            purpose: document.getElementById("purpose").value,
            payment: "현금",
            memo: document.getElementById("memo").value,
        };
        console.log(data);

        const opt = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        };

        const update = await fetch("/accoutBook/updateAction", opt);
        console.log(update);
        const result = await update.json();
        console.log(result);
        return result;
    } catch (err) {
        throw err;
    }
}