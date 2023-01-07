# Dwitter-clone-coding

express를 이용한 드위터 클론 코딩

## Notice

1. mysql이 설치 되어있어야합니다
2. server/model/schema.sql 파일을 배치모드로 실행해주세요
3. .env 파일을 설정해주세요

## Server Directory Structure

```
└── server
     ├── controller
     ├── DB
     ├── controller
     ├── model
     │     └── data
     ├── router
     └── node_modules
```

- controller : 컨트롤 로직이 담겨있습니다
- DB : 데이터베이스를 생성합니다 (export시켜 app에 연결시킵니다)
- router : 라우팅과 유효성검사 코드가 담겨있습니다
- middleware : 많은 요청에서 거치는 로직은 middleware로 따로 분류했습니다
- model : 모델을 생성하고 DB에 접근할수있는 함수들이 담겨있습니다

## 로그인

<img src="./server/gif/login_AdobeExpress.gif">

- 쿠키에 jwt토큰을 담아전송
- csrf 체크

## 로그아웃

<img src="./server/gif/logout_AdobeExpress.gif">

- 쿠키 만료시키기

## 트윗 작성

<img src="./server/gif/tweet_AdobeExpress.gif">

## 트윗 삭제

<img src="./server/gif/delete_AdobeExpress.gif">

- 로그인및 권한검사 시행

## 본인 트윗목록 확인

<img src="./server/gif/get_AdobeExpress.gif">
