## Tennis court schedule app

이 애플리케이션은 '김포도시관리공사 통합예약시스템'에서 테니스장 예약 시스템 정보를 스크래핑하여 메일로 전송한다. </br>
매번 사이트에 들어가서 현재 예약 가능한 테니스 코트를 살펴보는게 불편해서 만들었다.

## Usage

해당 프로젝트 디렉토리 루트에 .env 파일을 만들고 다음 정보를 채워넣는다.

```env
NAVER_ID="id"
NAVER_PW="pw"
FROM_MAIL_ADRESS="email@sample.com"
TO_MAIL_ADRESS="email@sample.com"
```

구글의 보안 정책으로 구글 계정에 접근하지 못한다. 따라서 네이버 계정 이용을 추천한다. </br>
따라서 즉시 이 프로젝트를 활용하고 싶다면 env 파일에 네이버 계정을 입력해야 한다.
만약 변경하고 싶다면 sendEmail.js에서 기존 네이버 도메인을 지우고 원하는 도메인을 입력하면 된다.
</br>

.env 파일을 모두 작성했다면 해당 프로젝트 경로에서 터미널을 열고 다음 명령어를 입력하면 애플리케이션이 실행된다. </br>
현재 node-cron으로 11:59, 23:59에 전송하도록 설정되어 있다. </br>
main 함수 실행 -> 해당 사이트에서 스크래핑(자동) -> 이메일로 전송(자동) -> TO_MAIL_ADRESS에 입력한 메일함에서 결과 확인이 가능하다.
</br>

다음 명령어를 통해 앱을 실행할 수 있다.</br>

```bash
# 최초 실행시
$ npm install && npm start

# node_modules 설치 후
$ npm start
```
