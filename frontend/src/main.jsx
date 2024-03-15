import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './css/index.css'
import { BrowserRouter } from 'react-router-dom'
import { StoreProvider } from 'easy-peasy'
import store from './store.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StoreProvider store={store}>
      <App />
    </StoreProvider>
  </BrowserRouter>,
)
