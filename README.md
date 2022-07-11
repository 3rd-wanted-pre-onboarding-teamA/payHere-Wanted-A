<div align="center">

  # PayHere 기업 과제 가계부 만들기
<p>
  <img src="https://img.shields.io/badge/Node.js-339933?style=flat&logo=Swift&logoColor=white"/>
  <img src="https://img.shields.io/badge/Docker-2496ED?style=flat&logo=Docker&logoColor=white"/>
  <img src="https://img.shields.io/badge/MySQL-4479A1?style=flat&logo=MySQL&logoColor=white"/>
  <img src="https://img.shields.io/badge/Amazon RDS-527FFF?style=flat&logo=Amazon RDS&logoColor=white"/>
  <img src="https://img.shields.io/badge/Amazon EC2-FF9900?style=flat&logo=Amazon EC2S&logoColor=white"/>
</p>
 README TODO: version 정보 업데이트

  ## 🌈 Team A members  

  |황선영|이승연|허정연|장덕수|
  |:------:|:------:|:------:|:------:|
  |[Github](https://github.com/syoungee) | [Github](https://github.com/dltmddus1998) | [Github](https://github.com/golgol22) | [Github](https://github.com/dapsu) |

</div> 
<br/>


## 📒 Project

  <h4> ⏳  개발 기간  </h4> 
  2022/07/04  ~ 2022/07/08 

  ## 🎬 프로젝트 시연
  ```
    추가 예정입니다🤍
  ```
  ## ✍🏻 프로젝트 설명
  ```
  - 고객은 본인의 소비내역을 기록/관리하고 싶습니다.
  - 아래의 요구사항을 만족하는 DB 테이블과 RestAPI를 만들어주세요.
    i. 회원 가입 및 로그인
    ii. 가계부에 오늘 사용한 돈, 메모 기록
    iii. 가계부 내용 삭제 및 복구 
    iv. 가계부 리스트 및 상세 내역 확인
    v. 로그인되지 않은 고객은 접근 제한 처리
  ```
  ### 🌟 필수 구현사항  
    - REST API 구현
    - 코딩 컨벤션
    - 비즈니스 로직 구조
    - 데이터베이스 모델링
  ### ⭐ 추가 구현사항
    - Test case 작성  
    - Docker 활용


## ✔️ 구현 기능

<img src="https://user-images.githubusercontent.com/22606199/177725389-38d3a111-291d-4abb-bc11-80a28abf1942.png" width="500"/>

```
1. 회원 가입 및 로그인 -> 예외 처리 필요
2. 가계부에 오늘 사용한 돈, 메모 기록 -> 구현 완료
3. 가계부 내용 삭제 및 복구 -> 구현 완료
4. 가계부 리스트 및 상세 내역 확인 -> 구현 완료
5. 로그인되지 않은 고객은 접근 제한 처리 -> TODO
```



## 🔥 배포
AWS EC2, RDS, Docker Container를 활용해 배포
- [x] RDS 생성 및 연동
- [x] EC2 생성

TODO
- [ ] Docker Container 완성
- [ ] Docker image EC2 배포
 
~~[API Link]("/")~~

~~AWS 배포, 테스트 및 동작을 확인하였으며, 비용 등의 이유로 현재는 접속불가할 수 있습니다.~~


## API 명세서  
~~swagger를 통해 정리 예정~~


## TDD

Jest로 테스트 코드 구현
~~예시 넣기~~


## RestAPI
~~이후 swagger로 보여줄 예정~~


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

