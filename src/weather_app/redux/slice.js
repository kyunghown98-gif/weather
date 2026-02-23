import { createSlice } from '@reduxjs/toolkit'

const defaultCities = [
  { id: 1, name: 'Daegu',    lat: 35.8714, lon: 128.6014 },
  { id: 2, name: 'New York', lat: 40.7128, lon: -74.006  },
  { id: 3, name: 'London',   lat: 51.5074, lon: -0.1278  },
]

const initialState = {
  // 날씨 데이터
  currentWeather:  null,
  hourlyForecast:  null,
  weeklyForecast:  null,
  loading:         false,
  error:           null,

  // 도시 목록
  cityList:        defaultCities,
  cityWeathers:    {},
  showSearch:      false,
  searchInput:     '',
  searchResults:   [],

  // 설정
  theme:           'dark',
  unit:            'C',
  graphType:       'temperature',

  // 가위바위보 게임
  gameUser:        null,
  gameCom:         null,
  gameResult:      '',
  gameScore:       { win: 0, draw: 0, lose: 0 },

  // 할 일 목록
  todos:           [],
  todoFilter:      'ALL',
  todoInput:       '',
}

const slice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    // 날씨 데이터
    getWeather(state, action) {
      state.currentWeather = action.payload
    },
    getHourlyForecast(state, action) {
      state.hourlyForecast = action.payload
    },
    getWeeklyForecast(state, action) {
      state.weeklyForecast = action.payload
    },
    setLoading(state, action) {
      state.loading = action.payload
    },
    setError(state, action) {
      state.error = action.payload
    },

    // 도시 목록
    setCityWeather(state, action) {
      const { id, data } = action.payload
      state.cityWeathers[id] = data
    },
    addCity(state, action) {
      if (state.cityList.length < 5) {
        state.cityList.push(action.payload)
      }
    },
    removeCity(state, action) {
      const id = action.payload
      state.cityList    = state.cityList.filter(city => city.id !== id)
      delete state.cityWeathers[id]
    },
    setShowSearch(state, action) {
      state.showSearch = action.payload
    },
    setSearchInput(state, action) {
      state.searchInput = action.payload
    },
    setSearchResults(state, action) {
      state.searchResults = action.payload
    },

    // 설정
    toggleTheme(state) {
      state.theme = state.theme === 'dark' ? 'light' : 'dark'
    },
    setTheme(state, action) {
      state.theme = action.payload
    },
    setUnit(state, action) {
      state.unit = action.payload
    },
    setGraphType(state, action) {
      state.graphType = action.payload
    },

    // 가위바위보 게임
    setGameUser(state, action) {
      state.gameUser = action.payload
    },
    setGameCom(state, action) {
      state.gameCom = action.payload
    },
    setGameResult(state, action) {
      state.gameResult = action.payload
    },
    updateGameScore(state, action) {
      const result = action.payload
      if      (result === 'WIN')  state.gameScore.win  += 1
      else if (result === 'DRAW') state.gameScore.draw += 1
      else if (result === 'LOSE') state.gameScore.lose += 1
    },

    // 할 일 목록
    addTodo(state, action) {
      state.todos.push({ id: Date.now(), text: action.payload, done: false })
    },
    removeTodo(state, action) {
      state.todos = state.todos.filter(todo => todo.id !== action.payload)
    },
    toggleTodo(state, action) {
      const todo = state.todos.find(todo => todo.id === action.payload)
      if (todo) todo.done = !todo.done
    },
    setTodoFilter(state, action) {
      state.todoFilter = action.payload
    },
    setTodoInput(state, action) {
      state.todoInput = action.payload
    },
  },
})

export const {
  getWeather, getHourlyForecast, getWeeklyForecast,
  setLoading, setError,
  setCityWeather, addCity, removeCity,
  setShowSearch, setSearchInput, setSearchResults,
  toggleTheme, setTheme, setUnit, setGraphType,
  setGameUser, setGameCom, setGameResult, updateGameScore,
  addTodo, removeTodo, toggleTodo, setTodoFilter, setTodoInput,
} = slice.actions

export default slice.reducer