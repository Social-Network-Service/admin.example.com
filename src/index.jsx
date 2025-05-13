import React from 'react'
import ReactDOM from 'react-dom/client'
import '@/styles/index.scss';
import App from './App'

async function init() {
  const root = ReactDOM.createRoot(document.getElementById('root'))
  root.render(<App/>)
}

init();