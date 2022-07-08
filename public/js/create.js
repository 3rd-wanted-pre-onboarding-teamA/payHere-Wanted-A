function clickCreate() {
    createAccoutBook()
        .then(result => {
            console.log(result);
            alert(result.message);
        });
    location.href = "/accountBook/list";
}

async function createAccoutBook() {
    try {
        const data = {
            type: "지출",
            amount: document.getElementById("amount").value,
            purpose: document.getElementById("purpose").value,
            payment: "카드",
            memo: document.getElementById("memo").value
        };

        const opt = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        };

        const create = await fetch("/accountBook/createAction", opt);
        const result = await create.json();
        return result;
    } catch (err) {
        throw err;
    }
}