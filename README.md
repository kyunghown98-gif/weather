# weather app

## 주요 기능
- 현재 날씨
- 시간별 예보
- 주간 예보
- 날씨 그래프
- 도시 목록
- 도시 검색
- 미니 게임
- °C / °F 단위 전환
- 다크/라이트 테마
- 자동스크롤 마퀴

## 기술 스택
- React
- React Redux
- Redux Toolkit
- Axios
- Swiper.js
- Recharts
- React-fast-marquee

## 컴포넌트 구조
src/
├── redux/
│   ├── store.js              # Redux 스토어 설정
│   ├── slice.js              # 전체 상태 정의 및 리듀서
│   └── weatherAction.js      # 비동기 액션 
├── component/
│   ├── Header.jsx             # 검색바, 테마·단위 토글
│   ├── HeaderMarquee.jsx      # 실시간 시각 + 스크롤 문구
│   ├── CurrentWeather.jsx     # 현재 날씨 카드
│   ├── HourlyForecast.jsx     # 시간별 예보 
│   ├── WeeklyForecast.jsx     # 5일 예보 + 온도 범위 바
│   ├── WeatherGraph.jsx       # 날씨 그래프
│   ├── CityList.jsx           # 저장 도시 목록
│   ├── Game.jsx               # 가위바위보
│   ├── Game2.jsx              # 숫자 맞추기
│   ├── Game3.jsx              # 반응속도 테스트
│   └── Game4.jsx              # 기억력 게임 
├── css/
│   ├── header.css             # 헤더 스타일
│   ├── HeaderMarquee.css      # 마퀴 스타일
│   ├── currentweather.css     # 현재 날씨 스타일
│   ├── hourlyforecast.css     # 시간별 예보 스타일
│   ├── weeklyforecast.css     # 주간 예보 스타일
│   ├── weathergraph.css       # 그래프 스타일
│   ├── citylist.css           # 도시 목록 스타일
│   ├── todolist.css           # 할 일 목록 스타일
│   ├── game.css               # 가위바위보 스타일
│   ├── game2.css              # 숫자 맞추기 스타일
│   ├── game3.css              # 반응속도 테스트 스타일
│   ├── game4.css              # 기억력 게임 스타일
│   └── media.css              # 반응형 미디어 쿼리
├── App.css                    # 전체 레이아웃 스타일
└── App.jsx                    # 레이아웃 및 페이지 분기

## 차별 포인트
- 두가지 컨셉의 테마 디자인 다크&라이트 모드
다크모드 사이버 펑크 컨셉
라이트모드 미국 레트로 컨셉
- 미니게임 4종

- 실시간 마퀴 타이머
