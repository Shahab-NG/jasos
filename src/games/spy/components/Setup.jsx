import React from 'react'
import {categories} from '../words'
import {fa,spyLimit} from '../model'

function Counter({label,value,min,max,onChange}){
  return <div className="row"><span className="text-sm font-bold">{label}</span><div className="flex items-center gap-2" role="group" aria-label={label}>
    <button className="control size-10 px-0" aria-label={'کاهش '+label} disabled={value<=min} onClick={()=>onChange(value-1)}>−</button>
    <output className="min-w-6 text-center font-bold">{fa(value)}</output>
    <button className="control size-10 px-0" aria-label={'افزایش '+label} disabled={value>=max} onClick={()=>onChange(value+1)}>+</button>
  </div></div>
}
function Options({label,value,options,onChange}){
  return <div className="row"><span className="text-sm font-bold">{label}</span><div className="flex flex-wrap gap-1" role="group" aria-label={label}>{options.map(([option,caption])=><button key={String(option)} aria-pressed={value===option} className={'control px-2 '+(value===option?'active':'')} onClick={()=>onChange(option)}>{caption}</button>)}</div></div>
}
export default function Setup({settings:s,update,start}){
  return <section className="panel mx-auto max-w-[680px]" aria-label="تنظیمات بازی">
    <Counter label="تعداد بازیکنان" value={s.count} min={3} max={20} onChange={count=>update({count,spies:Math.min(s.spies,spyLimit(count))})}/>
    <Counter label="تعداد جاسوس‌ها" value={s.spies} min={1} max={spyLimit(s.count)} onChange={spies=>update({spies})}/>
    <Options label="تایمر (دقیقه)" value={s.minutes} options={[[0,'خاموش'],...[5,10,15].map(n=>[n,fa(n)])]} onChange={minutes=>update({minutes})}/>
    <Options label="ترتیب تصادفی" value={s.random} options={[[false,'خاموش'],[true,'روشن']]} onChange={random=>update({random})}/>
    <div className="border-b border-slate-700 py-3">
      <h2 className="mb-2 text-sm font-bold">دسته کلمات</h2>
      <div className="flex flex-wrap gap-2">
        <button className={'control min-h-8 rounded-full px-3 text-xs '+(!s.selected.length?'active':'')} aria-pressed={!s.selected.length} onClick={()=>update({selected:[]})}>همه</button>
        {categories.map(({label})=>{
          const selected=s.selected.includes(label)
          return <button key={label} aria-pressed={selected} className={'control min-h-8 rounded-full px-3 text-xs '+(selected?'active':'')} onClick={()=>update({selected:selected?s.selected.filter(item=>item!==label):[...s.selected,label]})}>{label}</button>
        })}
      </div>
    </div>
    <details open className="py-2">
      <summary className="cursor-pointer py-2 text-center text-sm font-bold">نام بازیکنان</summary>
      <div className="grid grid-cols-2 gap-2">{Array.from({length:s.count},(_,index)=>{
        const label='بازیکن '+fa(index+1)
        return <label key={index} className="contents"><span className="sr-only">{label}</span><input className="field text-center" aria-label={label} placeholder={label} maxLength={30} value={s.names[index]??''} onChange={e=>{
          const names=[...s.names]
          names[index]=e.target.value
          update({names})
        }}/></label>
      })}</div>
    </details>
    <button className="primary mt-3" onClick={start}>شروع بازی</button>
  </section>
}
