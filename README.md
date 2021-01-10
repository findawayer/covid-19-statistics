# [COVID 19 Statistics](https://findawayer.github.io/covid-19-statistics) &middot; <img src="https://img.shields.io/badge/React-Practice-blue" alt="React Practice">

코로나 19의 최신 통계를 확인하는 웹 애플리케이션입니다. React 스터디 세션을 위해 창작했으며, [COVID-19 Data API](https://covid19-api.com/)에서 제공되는 자료를 사용하고 있습니다.

## 설치

```
git clone https://github.com/findawayer/covid-19-statistics.git
yarn install
yarn start
```

- `yarn` 커맨드는 사용자 환경에 따라 `npm` 커맨드로 안전하게 대체될 수 있습니다.
- `yarn start`로 실행된 앱은 `http://localhost:3000`에서 확인할 수 있습니다.

## 개발 메모

- `create-react-app`의 typescript 템플릿을 사용합니다.
- 별도 라이브러리는 다음을 사용합니다.
  - `emotion`: CSS 작성 인터페이스
  - `customize-cra`: CRA에 커스텀 babel 플러그인을 적용하기 위한 도구
  - `lint-staged` + `husky`: 코드 린팅 도우미
- 앱의 로직에 관련된 코드는 라이브러리의 도움 없이 작성합니다.
