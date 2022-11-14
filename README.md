# Dwitter-clone-coding

express를 이용한 드위터 클론 코딩

## Precautions

1. mysql이 설치 되어있어야합니다
2. mysql에 dwitter 데이터베이스를 생성하고 실행해주세요
3. .env 파일을 설정해주세요

## server Directory

- node_modules <br>
- router : 유효성검사및 요청분기 역할을합니다 <br>
- controller : 비지니스 로직이 담겨있습니다 <br>
- middleware : 공통적인 비지니스로직은 미들웨어로 만들었습니다 <br>
- DB : 시퀄라이즈 orm을 이용해 데이터베이스연결 및 모델생성코드가 담겨있습니다 <br>
- data : controller와 DB 브릿지 함수들이 담겨있습니다 <br>
