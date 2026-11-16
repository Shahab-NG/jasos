import {categories} from './words.js'
export const fa = n => Number(n).toLocaleString('fa-IR')
export const spyLimit = n => Math.floor((n-1)/2)
export const voteWinner = (spies,suspects) => spies.length===suspects.length&&spies.every(id=>suspects.includes(id))?'citizens':'spies'
export const defaults = {count:6,spies:1,minutes:0,random:false,selected:[],names:[]}
const key='jasos.spy.v1'
export function read(){
  try {return JSON.parse(localStorage.getItem(key)) ?? {}} catch{return {}}
}
export function save(value){
  try {localStorage.setItem(key,JSON.stringify(value))} catch { /* Storage may be disabled. */ }
}
export function shuffle(items){
  const result=[...items]
  for(let i=result.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1))
    ;[result[i],result[j]]=[result[j],result[i]]
  }
  return result
}
export function restoreGame(game){
  if(game.round?.stage!=='guess')return game
  return {...game,round:{...game.round,stage:'result',winner:'citizens'}}
}
export function createRound(settings,used,spyQueue=[],previousSpies=[]){
  const pool=categories.filter(c=>!settings.selected.length||settings.selected.includes(c.label)).flatMap(c=>c.words)
  const fresh=pool.filter(word=>!used.includes(word))
  const available=fresh.length?fresh:pool
  const word=available[Math.floor(Math.random()*available.length)]
  const players=Array.from({length:settings.count},(_,id)=>({id,name:settings.names[id]?.trim()||'بازیکن '+fa(id+1)}))
  const playerIds=players.map(player=>player.id)
  const queued=spyQueue.filter(id=>playerIds.includes(id))
  const newIds=playerIds.filter(id=>!queued.includes(id))
  const queue=queued.length
    ? [...queued,...shuffle(newIds)]
    : [...shuffle(newIds.filter(id=>!previousSpies.includes(id))),...shuffle(newIds.filter(id=>previousSpies.includes(id)))]
  const spies=queue.slice(0,settings.spies)
  return {
    spyQueue:[...queue.slice(spies.length),...spies],
    round:{players:settings.random?shuffle(players):players,spies,word,stage:'cards',index:0,deadline:null},
    used:[...(fresh.length?used:used.filter(item=>!pool.includes(item))),word]
  }
}
