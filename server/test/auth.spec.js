const httpMocks = require("node-mocks-http");
const faker = require("faker");
const AuthController = require("../controllers/auth.controller");

describe("회원가입", () => {
    let id, pw, name, phoneNumber, balance, request, response, AuthRepository;

    beforeEach(() => {
        AuthRepository = {};
        const fakeUser = faker.helpers.userCard();
        id = fakeUser.email;
        pw = faker.internet.password(10, true);
        name = fakeUser.name;
        phoneNumber = "010-1111-1111";
        balance = 500000;
        request = httpMocks.createRequest({
            method: "POST",
            url: "/auth/joinAction",
            body: {
                member_id: id,
                member_pw: pw,
                member_name: name,
                phone_number: phoneNumber,
                balance
            },  
        });
        response = httpMocks.createResponse();
    });

    it("회원가입 완료", async () => {
        await AuthController.joinAction(request, response);

        expect(response.statusCode).toBe(201);
        expect(response._getJSONData()).toMatchObject({
            message: "회원가입이 완료되었습니다."
        })
    });


});

describe("로그인", () => {
    let id, pw, request, response;

    beforeEach(() => {
        id = "abc123@test.com";
        pw = "qwer1234!";
        request = httpMocks.createRequest({
            method: "POST",
            url: "/auth/loginAction",
            body: {
                member_id: id,
                member_pw: pw,
            },
        });
        response = httpMocks.createResponse();
    });

    it("로그인 완료", async () => {
        await AuthController.loginAction(request, response);

        expect(response.statusCode).toBe(200);
    });
});

describe("마이페이지", () => {
    let userId, name, phoneNumber, balance, request, response, AuthRepository;

    beforeEach(() => {
        AuthRepository = {};
        userId = "abc123@test.com";
        name = "Tom";
        phoneNumber = "010-1234-1111";
        balance = 50000;
        request = httpMocks.createRequest({
            user: {
                id: userId,
            }
        });
        response = httpMocks.createResponse();
    });

    it("마이페이지 조회 완료", async () => {
        const result = AuthRepository.mypage = jest.fn(() => {
            return {
                member_id: userId,
                member_name: name,
                phone_number: phoneNumber,
                balance
            };
        });

        await AuthController.mypage(request, response);

        expect(response.statusCode).toBe(200);
        expect(response._getRenderData()).toMatchObject({
            myInfo: {
                member_id: userId,
                member_name: name,
                phone_number: phoneNumber,
                balance,
            }
        });
    });
});

describe("로그아웃", () => {
    let userId, request, response;

    beforeEach(() => {
        userId = "abc123@test.com";
        request = httpMocks.createRequest({
            user: {
                id: userId,
            },
        });
        response = httpMocks.createResponse();
    });

    it("로그아웃 완료", async () => {
        await AuthController.logout(request, response);

        expect(response.statusCode).toBe(200);
        expect(response._getJSONData()).toMatchObject({
            message: "로그아웃 되었습니다.",
        })
    })

    
})