import React,{useState} from 'react'
import {fa} from '../model'
export default function Vote({round,onVote}){
  const [suspects,setSuspects]=useState([])
  return <>
    <h2 className="text-2xl font-bold">رأی‌گیری</h2>
    <p className="my-3 text-sm text-slate-300">بازیکن‌هایی را انتخاب کنید که فکر می‌کنید جاسوس هستند. تعداد انتخاب‌ها باید {fa(round.spies.length)} نفر باشد.</p>
    <div className="mb-4 grid grid-cols-2 gap-2">{round.players.map(({id,name})=>{
      const selected=suspects.includes(id)
      return <button className={'control break-words '+(selected?'active':'')} key={id} aria-pressed={selected} disabled={!selected&&suspects.length===round.spies.length} onClick={()=>setSuspects(selected?suspects.filter(i=>i!==id):[...suspects,id])}>{name}{selected&&<span aria-hidden="true"> ✓</span>}</button>
    })}</div>
    <button className="primary" disabled={suspects.length!==round.spies.length} onClick={()=>onVote(suspects)}>ثبت جاسوس‌های مشکوک</button>
  </>
}
