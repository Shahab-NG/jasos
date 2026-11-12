import {categories} from './words.js'
export const fa = n => Number(n).toLocaleString('fa-IR')
export const spyLimit = n => Math.floor((n-1)/2)
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
export function createRound(settings,used){
  const pool=categories.filter(c=>!settings.selected.length||settings.selected.includes(c.label)).flatMap(c=>c.words)
  const fresh=pool.filter(word=>!used.includes(word))
  const available=fresh.length?fresh:pool
  const word=available[Math.floor(Math.random()*available.length)]
  const players=Array.from({length:settings.count},(_,id)=>({id,name:settings.names[id]?.trim()||'بازیکن '+fa(id+1)}))
  return {
    round:{players:settings.random?shuffle(players):players,spies:shuffle(players.map(p=>p.id)).slice(0,settings.spies),word,stage:'cards',index:0,deadline:null},
    used:[...(fresh.length?used:used.filter(item=>!pool.includes(item))),word]
  }
}
export function matchesWord(guess,word){
  const normalize=value=>value.normalize('NFKC').replace(/ي/g,'ی').replace(/ك/g,'ک').replace(/[\s\u200c\u200d\u064b-\u065f]/g,'')
  return normalize(guess)===normalize(word)
}
