const httpMocks = require("node-mocks-http");
const AccountBookController = require("../controllers/accountBook.controller.js");

// 가계부 생성
describe("가계부 생성", () => {
  let type, amount, purpose, payment, memo, use_date, request, response;
  beforeEach(() => {
    type = "지출";
    amount = 1000;
    purpose = "고구마";
    payment = "현금";
    memo = "없음";
    use_date = "2022-07-22";
    request = httpMocks.createRequest({
      user: {
        id: "qwer1234@naver.com"
      },
      body: {
        type: type,
        amount: amount,
        purpose: purpose,
        payment: payment,
        memo: memo,
        use_date: use_date
      },
    });
    response = httpMocks.createResponse();
  });

  it("가계부 생성 완료", async () => {
    await AccountBookController.createAccoutBook(request, response);
    expect(response.statusCode).toBe(201);
  });
});

// 가계부 수정 form
describe("가계부 수정 form", () => {
  beforeEach(() => {
    request = httpMocks.createRequest({
      query: {
        id: 3
      },
    });
    response = httpMocks.createResponse();
  });
  it("가계부 수정 form 완료", async () => {
    await AccountBookController.update(request, response);
    expect(response.statusCode).toBe(200);
  });
});

// 가계부 수정 동작
describe("가계부 수정", () => {
  let type, amount, purpose, payment, memo, use_date, request, response;
  beforeEach(() => {
    account_book_id = 3;
    type = "지출";
    amount = 2000;
    purpose = "감자";
    payment = "현금";
    memo = "없음";
    use_date = "2022-07-22";
    request = httpMocks.createRequest({
      body: {
        type: type,
        amount: amount,
        purpose: purpose,
        payment: payment,
        memo: memo,
        use_date: use_date,
        account_book_id: account_book_id
      },
    });
    response = httpMocks.createResponse();
  });

  it("가계부 수정 동작 완료", async () => {
    await AccountBookController.updateAccountBook(request, response);
    expect(response.statusCode).toBe(200);
  });
});

// 가계부 삭제
describe("가계부 삭제 성공시", () => {
  beforeEach(() => {
    request = httpMocks.createRequest({
      query: {
        id: 1
      },
    });
    response = httpMocks.createResponse();
  });

  it("가계부 삭제 완료", async () => {
    await AccountBookController.deleteAccoutBook(request, response);
    expect(response.statusCode).toBe(200);
  });
});

// 가계부 삭제 - querystring 없을 때
describe("가계부 삭제 실패시", () => {
  beforeEach(() => {
    request = httpMocks.createRequest();
    response = httpMocks.createResponse();
  });

  it("가계부 삭제 querystring 존재하지 않음", async () => {
    await AccountBookController.deleteAccoutBook(request, response);
    expect(response.statusCode).toBe(404);
  });
});

// 가계부 목록 조회
describe("가계부 목록 조회", () => {
  beforeEach(() => {
    request = httpMocks.createRequest({
      user: {
        id: "qwer1234@naver.com"
      },
    });
    response = httpMocks.createResponse();
  });

  it("가계부 목록 조회 완료", async () => {
    await AccountBookController.getAccountBookList(request, response);
    expect(response.statusCode).toBe(200);
  });
});

// 삭제된 가계부 목록 조회
describe("삭제된 가계부 목록 조회", () => {
  beforeEach(() => {
    request = httpMocks.createRequest({
      user: {
        id: "qwer1234@naver.com"
      },
    });
    response = httpMocks.createResponse();
  });

  it("삭제된 가계부 목록 조회 완료", async () => {
    await AccountBookController.getAccountBookDeletedList(request, response);
    expect(response.statusCode).toBe(200);
  });
});

// 상세보기 조회
describe("상세보기 조회 성공 시", () => {
  beforeEach(() => {
    request = httpMocks.createRequest({
      query: {
        id: 1
      },
    });
    response = httpMocks.createResponse();
  });

  it("상세보기 조회 완료", async () => {
    await AccountBookController.getAccountBookDetail(request, response);
    expect(response.statusCode).toBe(200);
  });
});

// 상세보기 조회 - querystring 없을 때
describe("상세보기 조회 실패 시", () => {
  beforeEach(() => {
    request = httpMocks.createRequest();
    response = httpMocks.createResponse();
  });

  it("상세보기 조회 querystring 존재하지 않음", async () => {
    await AccountBookController.getAccountBookDetail(request, response);
    expect(response.statusCode).toBe(404);
  });
});

// 복원하기 
describe("가계부 복원 성공 시", () => {
  beforeEach(() => {
    request = httpMocks.createRequest({
      query: {
        id: 1
      },
    });
    response = httpMocks.createResponse();
  });

  it("가계부 복원 완료", async () => {
    await AccountBookController.putAccountBookRestore(request, response);
    expect(response.statusCode).toBe(200);
  });
});

// 복원하기 - querystring 없을 때
describe("가계부 복원 실패 시", () => {
  beforeEach(() => {
    request = httpMocks.createRequest();
    response = httpMocks.createResponse();
  });

  it("가계부 복원 querystring 존재하지 않음", async () => {
    await AccountBookController.putAccountBookRestore(request, response);
    expect(response.statusCode).toBe(404);
  });
});