# Dwitter-clone-coding

express를 이용한 드위터 클론 코딩

## Notice

1. mysql이 설치 되어있어야합니다
2. server/model/schema.sql 파일을 배치모드로 실행해주세요
3. .env 파일을 설정해주세요

## Server Directory description

- router : 라우팅과 유효성검사 코드가 담겨있습니다 <br>
- controller : 컨트롤 로직이 담겨있습니다<br>
- middleware : 많은 요청에서 거치는 로직은 middleware로 따로 분류했습니다<br>
- model : 모델을 생성하고 DB에 접근할수있는 함수들이 담겨있습니다
- DB : 데이터베이스를 생성합니다 (export시켜 app에 연결시킵니다)
