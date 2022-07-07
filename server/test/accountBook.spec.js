const httpMocks = require("node-mocks-http");
const AccountBookController = require("../controllers/accountBook.controller.js");

// 가계부 생성
describe("create account book", () => {
  let type, amount, purpose, payment, memo, request, response;
  beforeEach(() => {
    type = "지출";
    amount = 1000;
    purpose = "고구마";
    payment = "현금";
    memo = "없음";
    request = httpMocks.createRequest({
      user: {
        id: 1
      },
      body: {
        type: type,
        amount: amount,
        purpose: purpose,
        payment: payment,
        memo: memo,
      },
    });
    response = httpMocks.createResponse();
  });

  it("create account book", async () => {
    await AccountBookController.createAccoutBook(request, response);
    expect(response.statusCode).toBe(201);
  });
});

// 가계부 수정
describe("update account book", () => {
  let type, amount, purpose, payment, memo, request, response;
  beforeEach(() => {
    type = "지출";
    amount = 2000;
    purpose = "감자";
    payment = "현금";
    memo = "없음";
    request = httpMocks.createRequest({
      query: {
        id: 1
      },
      body: {
        type: type,
        amount: amount,
        purpose: purpose,
        payment: payment,
        memo: memo,
      },
    });
    response = httpMocks.createResponse();
  });

  it("update account book", async () => {
    await AccountBookController.updateAccoutBook(request, response);
    expect(response.statusCode).toBe(200);
  });
});

// 가계부 삭제
describe("delete account book", () => {
  beforeEach(() => {
    request = httpMocks.createRequest({
      query: {
        id: 1
      },
    });
    response = httpMocks.createResponse();
  });

  it("delete account book", async () => {
    await AccountBookController.deleteAccoutBook(request, response);
    expect(response.statusCode).toBe(200);
  });
});

// 가계부 목록 조회
describe("select account book list", () => {
  beforeEach(() => {
    request = httpMocks.createRequest({
      user: {
        id: 1
      },
    });
    response = httpMocks.createResponse();
  });

  it("select account book list", async () => {
    await AccountBookController.getAccountBookList(request, response);
    expect(response.statusCode).toBe(200);
  });
});

// 삭제된 가계부 목록 조회
describe("select account book deleted list", () => {
  beforeEach(() => {
    request = httpMocks.createRequest({
      user: {
        id: 1
      },
    });
    response = httpMocks.createResponse();
  });

  it("select account book deleted list", async () => {
    await AccountBookController.getAccountBookDeletedList(request, response);
    expect(response.statusCode).toBe(200);
  });
});

// 상세보기 조회
describe("select account book detail", () => {
  beforeEach(() => {
    request = httpMocks.createRequest({
      query: {
        id: 1
      },
    });
    response = httpMocks.createResponse();
  });

  it("select account book detail", async () => {
    await AccountBookController.getAccountBookDetail(request, response);
    expect(response.statusCode).toBe(200);
  });
});

// 복원하기 
describe("restore account book", () => {
  beforeEach(() => {
    request = httpMocks.createRequest({
      query: {
        id: 1
      },
    });
    response = httpMocks.createResponse();
  });

  it("restore account book", async () => {
    await AccountBookController.putAccountBookRestore(request, response);
    expect(response.statusCode).toBe(200);
  });
});