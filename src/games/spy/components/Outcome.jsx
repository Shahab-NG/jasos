import React,{useState} from 'react'
export default function Outcome({round,onGuess,onSkipGuess,start,reset}){
  const [guess,setGuess]=useState('')
  const winner=round.winner??(round.spyWins?'spies':'citizens')
  if(round.stage==='guess')return <form onSubmit={e=>{e.preventDefault();if(guess.trim())onGuess(guess)}}>
    <h2 className="text-2xl font-bold">حدس نهایی جاسوس‌ها</h2>
    <p className="my-3 text-sm text-slate-300">همهٔ جاسوس‌ها شناسایی شدند. تیم جاسوس‌ها یک فرصت برای حدس زدن کلمه دارد.</p>
    <input className="field mb-3" aria-label="حدس کلمهٔ مخفی" placeholder="حدس کلمهٔ مخفی" maxLength={80} value={guess} onChange={e=>setGuess(e.target.value)}/>
    <button className="primary" disabled={!guess.trim()}>ثبت حدس</button>
    <button className="control mt-3 w-full" type="button" onClick={onSkipGuess}>جاسوس حدسی ندارد</button>
  </form>
  return <>
    <h2 className="text-2xl font-bold text-amber-400">{winner==='spies'?'جاسوس برنده شد':'بازیکن‌ها برنده شدند!'}</h2>
    <p className="mt-4">کلمهٔ مخفی <strong className="mr-2">{round.word}</strong></p>
    <p className="my-3 break-words">جاسوس‌ها <strong className="mr-2">{round.players.filter(p=>round.spies.includes(p.id)).map(p=>p.name).join('، ')}</strong></p>
    <button className="primary mt-2" onClick={start}>دور بعد با همین تنظیمات</button>
    <button className="control mt-3 w-full" onClick={reset}>بازگشت به تنظیمات</button>
  </>
}
