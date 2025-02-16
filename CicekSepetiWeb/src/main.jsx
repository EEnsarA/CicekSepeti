import { createRoot } from 'react-dom/client'
import './css/index.css'
import App from './App.jsx'
import {Provider, useSelector} from "react-redux"
import { BrowserRouter } from 'react-router-dom'
import {store} from "./redux/store.jsx"
import Loading from './components/Loading.jsx'


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
      <Loading/>
    </Provider>
  </BrowserRouter>
)
