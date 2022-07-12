<div align="center">

  # PayHere 기업 과제 가계부 만들기
<p>
  <img src="https://img.shields.io/badge/Node.js-339933?style=flat&logo=Swift&logoColor=white"/>
  <img src="https://img.shields.io/badge/Docker-2496ED?style=flat&logo=Docker&logoColor=white"/>
  <img src="https://img.shields.io/badge/MySQL-4479A1?style=flat&logo=MySQL&logoColor=white"/>
  <img src="https://img.shields.io/badge/Amazon RDS-527FFF?style=flat&logo=Amazon RDS&logoColor=white"/>
  <img src="https://img.shields.io/badge/Amazon EC2-FF9900?style=flat&logo=Amazon EC2S&logoColor=white"/>
</p>

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
    ejs로 프론트 페이지를 제작했습니다
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
1. 회원 가입 및 로그인
2. 가계부에 오늘 사용한 돈, 메모 기록
3. 가계부 내용 삭제 및 복구
4. 가계부 리스트 및 상세 내역 확인
5. 로그인되지 않은 고객은 접근 제한 처리
6. 1~5 기능에 대한 예외처리 구현
```



## 🔥 배포
AWS EC2, RDS를 활용해 배포하였으나 과금으로 인해 인스턴스 종료



## TDD

Jest로 테스트 코드 구현 example

<div class="colorscripter-code" style="color:#FEFEFE;font-family:Consolas, 'Liberation Mono', Menlo, Courier, monospace !important; position:relative !important;overflow:auto"><table class="colorscripter-code-table" style="margin:0;padding:0;border:none;background-color:#300546;border-radius:4px;" cellspacing="0" cellpadding="0"><tr><td style="padding:6px;border-right:2px solid #4f4f4f"><div style="margin:0;padding:0;word-break:normal;text-align:right;color:#aaa;font-family:Consolas, 'Liberation Mono', Menlo, Courier, monospace !important;line-height:130%"><div style="line-height:130%">1</div><div style="line-height:130%">2</div><div style="line-height:130%">3</div><div style="line-height:130%">4</div><div style="line-height:130%">5</div><div style="line-height:130%">6</div><div style="line-height:130%">7</div><div style="line-height:130%">8</div><div style="line-height:130%">9</div><div style="line-height:130%">10</div><div style="line-height:130%">11</div><div style="line-height:130%">12</div><div style="line-height:130%">13</div><div style="line-height:130%">14</div><div style="line-height:130%">15</div><div style="line-height:130%">16</div><div style="line-height:130%">17</div><div style="line-height:130%">18</div><div style="line-height:130%">19</div><div style="line-height:130%">20</div><div style="line-height:130%">21</div><div style="line-height:130%">22</div><div style="line-height:130%">23</div><div style="line-height:130%">24</div><div style="line-height:130%">25</div><div style="line-height:130%">26</div><div style="line-height:130%">27</div><div style="line-height:130%">28</div><div style="line-height:130%">29</div></div></td><td style="padding:6px 0;text-align:left"><div style="margin:0;padding:0;color:#FEFEFE;font-family:Consolas, 'Liberation Mono', Menlo, Courier, monospace !important;line-height:130%"><div style="padding:0 6px; white-space:pre; line-height:130%">describe(<span style="color:#20EC0D">"create&nbsp;account&nbsp;book"</span>,&nbsp;()&nbsp;<span style="color:#FF3399"></span><span style="color:#F17CE3">=</span><span style="color:#FF3399"></span><span style="color:#F17CE3">&gt;</span>&nbsp;{</div><div style="padding:0 6px; white-space:pre; line-height:130%">&nbsp;&nbsp;<span style="color:#F17CE3">let</span>&nbsp;type,&nbsp;amount,&nbsp;purpose,&nbsp;payment,&nbsp;memo,&nbsp;request,&nbsp;response;</div><div style="padding:0 6px; white-space:pre; line-height:130%">&nbsp;&nbsp;beforeEach(()&nbsp;<span style="color:#FF3399"></span><span style="color:#F17CE3">=</span><span style="color:#FF3399"></span><span style="color:#F17CE3">&gt;</span>&nbsp;{</div><div style="padding:0 6px; white-space:pre; line-height:130%">&nbsp;&nbsp;&nbsp;&nbsp;type&nbsp;<span style="color:#FF3399"></span><span style="color:#F17CE3">=</span>&nbsp;<span style="color:#20EC0D">"지출"</span>;</div><div style="padding:0 6px; white-space:pre; line-height:130%">&nbsp;&nbsp;&nbsp;&nbsp;amount&nbsp;<span style="color:#FF3399"></span><span style="color:#F17CE3">=</span>&nbsp;<span style="color:#CDF103">1000</span>;</div><div style="padding:0 6px; white-space:pre; line-height:130%">&nbsp;&nbsp;&nbsp;&nbsp;purpose&nbsp;<span style="color:#FF3399"></span><span style="color:#F17CE3">=</span>&nbsp;<span style="color:#20EC0D">"고구마"</span>;</div><div style="padding:0 6px; white-space:pre; line-height:130%">&nbsp;&nbsp;&nbsp;&nbsp;payment&nbsp;<span style="color:#FF3399"></span><span style="color:#F17CE3">=</span>&nbsp;<span style="color:#20EC0D">"현금"</span>;</div><div style="padding:0 6px; white-space:pre; line-height:130%">&nbsp;&nbsp;&nbsp;&nbsp;memo&nbsp;<span style="color:#FF3399"></span><span style="color:#F17CE3">=</span>&nbsp;<span style="color:#20EC0D">"없음"</span>;</div><div style="padding:0 6px; white-space:pre; line-height:130%">&nbsp;&nbsp;&nbsp;&nbsp;request&nbsp;<span style="color:#FF3399"></span><span style="color:#F17CE3">=</span>&nbsp;httpMocks.createRequest({</div><div style="padding:0 6px; white-space:pre; line-height:130%">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;user:&nbsp;{</div><div style="padding:0 6px; white-space:pre; line-height:130%">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;id:&nbsp;<span style="color:#CDF103">1</span></div><div style="padding:0 6px; white-space:pre; line-height:130%">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},</div><div style="padding:0 6px; white-space:pre; line-height:130%">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;body:&nbsp;{</div><div style="padding:0 6px; white-space:pre; line-height:130%">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;type:&nbsp;type,</div><div style="padding:0 6px; white-space:pre; line-height:130%">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;amount:&nbsp;amount,</div><div style="padding:0 6px; white-space:pre; line-height:130%">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;purpose:&nbsp;purpose,</div><div style="padding:0 6px; white-space:pre; line-height:130%">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;payment:&nbsp;payment,</div><div style="padding:0 6px; white-space:pre; line-height:130%">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;memo:&nbsp;memo,</div><div style="padding:0 6px; white-space:pre; line-height:130%">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},</div><div style="padding:0 6px; white-space:pre; line-height:130%">&nbsp;&nbsp;&nbsp;&nbsp;});</div><div style="padding:0 6px; white-space:pre; line-height:130%">&nbsp;&nbsp;&nbsp;&nbsp;response&nbsp;<span style="color:#FF3399"></span><span style="color:#F17CE3">=</span>&nbsp;httpMocks.createResponse();</div><div style="padding:0 6px; white-space:pre; line-height:130%">&nbsp;&nbsp;});</div><div style="padding:0 6px; white-space:pre; line-height:130%">&nbsp;</div><div style="padding:0 6px; white-space:pre; line-height:130%">&nbsp;&nbsp;it(<span style="color:#20EC0D">"create&nbsp;account&nbsp;book"</span>,&nbsp;async&nbsp;()&nbsp;<span style="color:#FF3399"></span><span style="color:#F17CE3">=</span><span style="color:#FF3399"></span><span style="color:#F17CE3">&gt;</span>&nbsp;{</div><div style="padding:0 6px; white-space:pre; line-height:130%">&nbsp;&nbsp;&nbsp;&nbsp;await&nbsp;AccountBookController.createAccoutBook(request,&nbsp;response);</div><div style="padding:0 6px; white-space:pre; line-height:130%">&nbsp;&nbsp;&nbsp;&nbsp;expect(response.statusCode).toBe(<span style="color:#CDF103">201</span>);</div><div style="padding:0 6px; white-space:pre; line-height:130%">&nbsp;&nbsp;});</div><div style="padding:0 6px; white-space:pre; line-height:130%">});</div><div style="padding:0 6px; white-space:pre; line-height:130%">&nbsp;</div></div><div style="text-align:right;margin-top:-13px;margin-right:5px;font-size:9px;font-style:italic"><a href="http://colorscripter.com/info#e" target="_blank" style="color:#4f4f4ftext-decoration:none">Colored by Color Scripter</a></div></td><td style="vertical-align:bottom;padding:0 2px 4px 0"><a href="http://colorscripter.com/info#e" target="_blank" style="text-decoration:none;color:white"><span style="font-size:9px;word-break:normal;background-color:#4f4f4f;color:white;border-radius:10px;padding:1px">cs</span></a></td></tr></table></div>


## RestAPI
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

