import React,{useState} from 'react'
import {fa} from '../model'
import {randomSpyPhrase} from '../spyPhrases'
export default function RoleCard({round,next}){
  const [visible,setVisible]=useState(false)
  const [spyPhrase]=useState(randomSpyPhrase)
  const player=round.players[round.index]
  const spy=round.spies.includes(player.id)
  return <>
    <p className="text-sm text-slate-400">کارت {fa(round.index+1)} از {fa(round.players.length)}</p>
    <h2 className="mt-2 break-words text-2xl font-bold">{player.name}</h2>
    <div className="my-5 rounded-xl border border-slate-600 bg-slate-800 p-5">
      {visible?<><p className="text-sm text-slate-300">{spy?'نقش شما':'کلمهٔ مخفی'}</p><strong className="mt-2 block break-words text-2xl text-amber-400">{spy?spyPhrase:round.word}</strong><p className="mt-2 text-sm">{spy?'به سرنخ‌ها گوش بده و تلاش کن نقش خودت را پنهان کنی.':'کلمه را به خاطر بسپار و به دیگران نشان نده.'}</p></>:<p>گوشی را به {player.name} بدهید و بعد کارت را باز کنید.</p>}
    </div>
    <button className="primary" onClick={visible?next:()=>setVisible(true)}>{visible?'پوشاندن کارت و ادامه':'نمایش کارت'}</button>
  </>
}
