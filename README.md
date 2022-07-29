<div align="center">

  # PayHere 기업 과제 가계부 만들기 💸
<p>
  <img src="https://img.shields.io/badge/Node.js-339933?style=flat&logo=Swift&logoColor=white"/>
  <img src="https://img.shields.io/badge/Express-000000?style=flat&logo=Express&logoColor=white"/>
  <img src="https://img.shields.io/badge/MySQL-4479A1?style=flat&logo=MySQL&logoColor=white"/>
  <img src="https://img.shields.io/badge/Amazon RDS-527FFF?style=flat&logo=Amazon RDS&logoColor=white"/>
  <img src="https://img.shields.io/badge/Amazon EC2-FF9900?style=flat&logo=Amazon EC2&logoColor=white"/>
</p>

  ## 🌈 Team A members  

  |황선영|이승연|허정연|장덕수|
  |:------:|:------:|:------:|:------:|
  |[Github](https://github.com/syoungee) | [Github](https://github.com/dltmddus1998) | [Github](https://github.com/golgol22) | [Github](https://github.com/dapsu) |

</div> 
<br/>


## 🎮 노션링크
더 상세한 개발 내용을 확인할 수 있어요!  
<span style="background-color: #dcffe4">[more descriptions(click here!)](https://misty-lungfish-f16.notion.site/pay_here-nodejs-CRUD-a3b0bf3fc4a14fcdac9fbf760107373e)</span>

<br/>

## ⏳  개발 기간 
2022.07.04 ~ 2022.07.08 

<br>

## 🎬 프로젝트 시연
> http://43.200.90.195/ 
```
  ejs(SSR 방식)로 프론트 페이지를 제작했습니다
  아래는 가계부 추가 페이지 시연 영상입니다🤍
  회원가입/로그인/소비&지출 내역 추가 및 삭제/삭제내역 복구/로그아웃
```

https://user-images.githubusercontent.com/22606199/181500412-e29bbe51-eee5-4706-8dfc-dc87acf832a8.mp4

<br/>

## ✍🏻 프로젝트 요구사항
- 고객은 본인의 소비내역을 기록/관리하고 싶습니다.
- 아래의 요구사항을 만족하는 DB 테이블과 RestAPI를 만들어주세요.
  - 회원 가입, 로그인, jwt 토큰 발급
  - 가계부에 사용한 금액 기록
  - 가계부 내용 삭제 및 복구 
  - 가계부 리스트 및 상세 내역 확인
  - 로그인되지 않은 고객은 접근 제한 처리

### ⭐ 필수 구현사항  
- 토큰 발행하여 인증 제어 방식 구현
- REST API 구현
- 코딩 컨벤션
- 비즈니스 로직 구조
- 데이터베이스 모델링
### 🌙 추가 구현사항
- mvc 패턴을 활용한 레이어 계층 분리
- ejs를 활용한 뷰(VIEW) 구현
- Test case 작성  
- AWS EC2, RDS로 배포

<br/>

## 📐 데이터베이스 모델링
<img src="https://user-images.githubusercontent.com/22606199/178386030-12606a52-491d-4b1a-b401-6933dbba2335.png" width="1000"/>

- `member` 회원 정보 저장을 담당하는 테이블
- `account_book` 회원이 기록한 가계부 정보를 담당하는 테이블  
- `have_money` 회원이 가지고 있는 돈을 저장하는 테이블  
(확장성 고려: 향후 회원의 총 지출과 수입을 저장하는 등의 사용자 분석 기능을 넣어 확장시키기 위해 별도의 테이블로 제작)
- `refresh_token` 토큰을 저장하는 테이블

<br/>

## 🧚🏻 구현 기능
- [X] mvc 패턴을 활용한 레이어 계층 분리
- [X] 회원 가입, 로그인
- [X] jwt 토큰 발급 (로그인되지 않은 유저는 접근 제한 처리)
- [X] 회원정보 조회
- [X] 가계부에 수입/지출, 카드/현금, 금액, 날짜, 메모 기록
- [X] 가계부 삭제된 목록 확인 및 복구(사용된 날짜로 내림차순 정렬)
- [X] 사용자가 작성한 가계부 목록 확인(사용된 날짜로 내림차순 정렬)
- [X] 가계부 상세 내용 확인
- [X] 가계부 입력, 수정, 삭제, 복원에 따른 잔액 변경 
- [X] 모든 기능에 대한 예외처리 구현
- [X] view 페이지 개발(ejs)
- [X] 테스트 코드 구현(jest)
- [X] AWS EC2, RDS 배포

<br/>

## 🌴 TDD (Jest)

#### 가계부 기능  
 `PASS`  server/test/accountBook.spec.js  
  create account book  
    ✔︎ create account book (318 ms)  
  update account book form  
    ✔︎ update account book form (17 ms)  
  update account book  
    ✔︎ update account book (16 ms)  
  delete account book  
    ✔︎ delete account book (6 ms)  
  delete account book not querystring  
    ✔︎ delete account book not querystring (3 ms)  
  select account book list  
    ✔︎ select account book list (9 ms)  
  select account book deleted list  
    ✔︎ select account book deleted list (2 ms)  
  select account book detail  
    ✔︎ select account book detail (5 ms)  
  select account book detail not querystring  
    ✔︎ select account book detail not querystring (1 ms)  
  restore account book  
    ✔︎ restore account book (8 ms)  
  restore account book not querystring  
    ✔︎ restore account book not querystring (1 ms)  

Test Suites: 1 passed, 1 total  
Tests:       11 passed, 11 total  
Snapshots:   0 total  
Time:        3.77 s  

<br/>

## 🍉 REST API

<span style="background-color: #dcffe4">[more descriptions(click here!)](https://misty-lungfish-f16.notion.site/pay_here-nodejs-CRUD-a3b0bf3fc4a14fcdac9fbf760107373e)</span>

  |  | METHOD | URL | 
| --- | --- | --- | 
| 회원가입 | GET | /auth/signup |
| 회원가입 동작 | POST | /auth/newUserAction |
| id 중복 검사 동작 | POST | /auth/checkIdAction |
| 토큰 중복검사 동작 | POST | /auth/validateAction |
| 로그인 | GET | /auth/login |
| 로그인 동작  | POST | /auth/loginAction |
| 로그아웃 | POST | /auth/logout |
| 회원정보 | GET | /mypage |
| 가계부 등록 | GET | /accountBook/create |
| 가계부 등록 동작  | POST | /accountBook/createAction |
| 가계부 수정 | GET | /accountBook/update |
| 가계부 수정 동작 | PUT | /accountBook/updateAction?id=1 |
| 가계부 삭제 | PUT | /accountBook/delete?id=1 |
| 삭제 가계부 리스트 | GET | /accountBook/deletedList |
| 삭제 가계부 복원 | PUT | /accountBook/restore?id=1 |
| 가계부 리스트 | GET | /accountBook/list |
| 가계부 상세 내역 | GET | /accountBook/detail?id=1 |

