module.exports = {
  BAD_REQUEST: { status: 400, message: "Bad Request", detail: "잘못된 요청입니다." },
  FORBIDDEN: { status: 403, message: "Forbidden", detail: "권한이 없는 사용자입니다." },
  NOT_FOUND: { status: 404, message: "Not Found", detail: "올바른 경로로 접속하세요." },
  INTERNAL_SERVER_ERROR: { status: 500, message: "Internal Server Error", detail: "서버 에러입니다. 관리자에게 문의하세요." },
};