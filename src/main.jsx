import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import { myStore } from './stores/store'
import { StrictMode } from 'react'
import './index.css';





ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={myStore}>
        <App />
    </Provider>
 
)

if('serviceWorker' in navigator){
  navigator.serviceWorker.register("./sw.js",{
    type:'module'
  })
}
