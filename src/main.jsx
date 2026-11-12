import React from 'react'
import {createRoot} from 'react-dom/client'
import '@fontsource-variable/vazirmatn'
import './style.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Spy from './games/spy/Spy'

const games = {spy: {title:'بازی جاسوس', subtitle:'جاسوس را بین دوستانتان پیدا کنید یا کلمهٔ مخفی را حدس بزنید!', Component: Spy}}
const gameId = location.hash.slice(1)
const {title, subtitle, Component} = Object.hasOwn(games, gameId) ? games[gameId] : games.spy
createRoot(document.getElementById('root')).render(<><Header title={title} subtitle={subtitle}/><main className="mx-auto w-full max-w-[780px] px-3 sm:px-6"><Component/></main><Footer/></>)

if(import.meta.env.PROD && 'serviceWorker' in navigator){
  navigator.serviceWorker.register('/sw.js').catch(()=>{})
}
