import React,{useEffect,useState} from 'react'
import {fa} from '../model'
export default function Discussion({deadline,onVote}){
  const [now,setNow]=useState(Date.now)
  useEffect(()=>{
    if(!deadline)return
    const id=setInterval(()=>setNow(Date.now()),250)
    return ()=>clearInterval(id)
  },[deadline])
  const remaining=deadline?Math.max(0,Math.ceil((deadline-now)/1000)):0
  return <>
    <h2 className="text-2xl font-bold">وقت سرنخ دادن!</h2>
    {deadline&&<p className="my-4 text-3xl font-black text-amber-400" dir="ltr">{remaining?fa(Math.floor(remaining/60))+':'+String(remaining%60).padStart(2,'0').replace(/\d/g,fa):'زمان تمام شد'}</p>}
    <p className="my-5 leading-7 text-slate-300">هر نفر به نوبت یک سرنخ بگوید. بعد از گفت‌وگو، برای انتخاب بازیکن‌های مشکوک رأی‌گیری کنید.</p>
    <button className="primary" onClick={onVote}>رفتن به رأی‌گیری</button>
  </>
}
