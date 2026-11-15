import React from 'react'
export default function Outcome({round,start,reset}){
  const winner=round.winner??(round.spyWins?'spies':'citizens')
  return <>
    <h2 className="text-2xl font-bold text-amber-400">{winner==='spies'?'جاسوس برنده شد':'بازیکن‌ها برنده شدند'}</h2>
    <p className="mt-4">کلمهٔ مخفی <strong className="mr-2">{round.word}</strong></p>
    <p className="my-3 break-words">جاسوس‌ها <strong className="mr-2">{round.players.filter(p=>round.spies.includes(p.id)).map(p=>p.name).join('، ')}</strong></p>
    <button className="primary mt-2" onClick={start}>دور بعد با همین تنظیمات</button>
    <button className="control mt-3 w-full" onClick={reset}>بازگشت به تنظیمات</button>
  </>
}
