import React,{useEffect,useState} from 'react'
import Setup from './components/Setup'
import Guide from './components/Guide'
import RoleCard from './components/RoleCard'
import Discussion from './components/Discussion'
import Vote from './components/Vote'
import Outcome from './components/Outcome'
import {createRound,defaults,read,restoreGame,save,voteWinner} from './model'

export default function Spy(){
  const [game,setGame]=useState(()=>({settings:defaults,round:null,used:[],...restoreGame(read())}))
  const [confirmExit,setConfirmExit]=useState(false)
  const {settings,round,used}=game
  useEffect(()=>save(game),[game])
  function start(){
    setConfirmExit(false)
    setGame({...game,...createRound(settings,used,game.spyQueue,round?.spies)})
    window.scrollTo(0,0)
  }
  const change=fields=>setGame({...game,round:{...round,...fields}})
  const finishRound=winner=>change({stage:'result',winner})
  const reset=()=>{setConfirmExit(false);setGame({...game,round:null})}
  if(!round)return <><Setup settings={settings} update={fields=>setGame({...game,settings:{...settings,...fields}})} start={start}/><Guide/></>
  return <section className="panel mx-auto max-w-[680px] text-center" aria-label="دور جاری">
    {round.stage==='cards'&&<RoleCard key={round.index} round={round} next={()=>{
      if(round.index+1<round.players.length)change({index:round.index+1})
      else change({stage:'discussion',deadline:settings.minutes?Date.now()+settings.minutes*60000:null})
    }}/>}
    {round.stage==='discussion'&&<Discussion deadline={round.deadline} onVote={()=>change({stage:'vote'})}/>}
    {round.stage==='vote'&&<Vote round={round} onVote={suspects=>finishRound(voteWinner(round.spies,suspects))}/>}
    {round.stage==='result'&&<Outcome round={round} start={start} reset={reset}/>}
    {round.stage!=='result'&&(confirmExit?<div className="mt-4 rounded-lg border border-slate-600 p-3"><p className="mb-2 text-sm">این دور پایان پیدا کند؟</p><div className="flex justify-center gap-2"><button className="control" onClick={reset}>پایان دور</button><button className="control" onClick={()=>setConfirmExit(false)}>ادامه بازی</button></div></div>:<button className="mt-4 min-h-10 text-sm text-slate-300 underline" onClick={()=>setConfirmExit(true)}>خروج از دور</button>)}
  </section>
}
