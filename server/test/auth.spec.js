const httpMocks = require("node-mocks-http");
const AuthController = require("../controllers/auth.controller");
const { makeValidUserDetails } = require("./auth.utils");
const dotenv = require("dotenv");
dotenv.config();

describe("회원가입", () => {
    let request, response, AuthRepository;

    beforeEach(() => {
        AuthRepository = {};
        const user = makeValidUserDetails();
        const { member_id, member_pw, member_name, phone_number, balance } = user;

        request = httpMocks.createRequest({
            method: "POST",
            url: "/auth/joinAction",
            body: {
                member_id,
                member_pw,
                member_name,
                phone_number,
                balance,
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

describe("로그인 & 로그아웃 & 마이페이지", () => {
    let request, loginRequest, logoutRequest, mypageRequest, response;
    const user = makeValidUserDetails();
    const { member_id, member_pw, member_name, phone_number, balance } = user;

    describe("로그인 & 로그아웃", () => {
        beforeAll(async () => {
            AuthRepository = {};
            request = httpMocks.createRequest({
                method: "POST",
                url: "/auth/joinAction",
                body: {
                    member_id,
                    member_pw,
                    member_name,
                    phone_number,
                    balance,
                }
            });
            response = httpMocks.createResponse();
            await AuthController.joinAction(request, response);
        });
        
        describe("로그인", () => {
            it("로그인 완료", async () => {
                loginRequest = await httpMocks.createRequest({
                    method: "POST",
                    url: "/auth/loginAction",
                    body: {
                        member_id,
                        member_pw,
                    }
                });
        
                await AuthController.loginAction(loginRequest, response);
        
                expect(response.statusCode).toBe(200);
            });
        })

        describe("로그아웃", () => {
            it("로그아웃 완료", async () => {
                logoutRequest = await httpMocks.createRequest({
                    method: "GET",
                    url: "/auth/logout",
                    user: {
                        id: member_id,
                    },
                });
        
                await AuthController.logout(logoutRequest, response);
                
                expect(response.statusCode).toBe(200);
            });
        })
    })

    describe("마이페이지", () => {
        beforeEach(async () => {
            AuthRepository = {};
            request = httpMocks.createRequest({
                method: "POST",
                url: "/auth/joinAction",
                body: {
                    member_id,
                    member_pw,
                    member_name,
                    phone_number,
                    balance,
                }
            });
            response = httpMocks.createResponse();
            await AuthController.joinAction(request, response);
        });
        it("마이페이지 완료", async () => {
            mypageRequest = await httpMocks.createRequest({
                method: "GET",
                url: "/auth/mypage",
                user: {
                    id: member_id,
                },
            });

            await AuthController.mypage(mypageRequest, response);
            console.log(response)

            expect(response.statusCode).toBe(200);
        });
    });
});