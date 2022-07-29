const faker = require("faker");

function makeValidUserDetails() {
    const fakeUser = faker.helpers.userCard();
    return { 
        member_id: fakeUser.email,
        member_pw: faker.internet.password(10, true),
        member_name: fakeUser.name,
        phone_number: "010-1222-1111",
        balance: 50000,
    };
}

module.exports = {
    makeValidUserDetails,
}