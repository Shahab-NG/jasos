import {readdir,readFile,writeFile} from 'node:fs/promises'
import {createHash} from 'node:crypto'
const assets=(await readdir('dist/assets')).sort().map(name=>'/assets/'+name)
const cache='jasos-'+createHash('sha256').update(assets.join('|')).update(await readFile('dist/index.html')).update(await readFile('dist/app.webmanifest')).update(await readFile('dist/icon.svg')).digest('hex').slice(0,16)
await writeFile('dist/sw.js',`
const cacheName=${JSON.stringify(cache)}
const files=${JSON.stringify(['/', '/app.webmanifest', '/icon.svg', ...assets])}
self.addEventListener('install',event=>event.waitUntil(caches.open(cacheName).then(cache=>cache.addAll(files))))
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith('jasos-')&&key!==cacheName).map(key=>caches.delete(key))))))
self.addEventListener('fetch',event=>{
  const url=new URL(event.request.url)
  if(event.request.method!=='GET'||url.origin!==location.origin)return
  if(event.request.mode==='navigate'){
    event.respondWith(fetch(event.request).catch(()=>caches.open(cacheName).then(cache=>cache.match('/'))))
  }else if(files.includes(url.pathname)){
    event.respondWith(caches.open(cacheName).then(cache=>cache.match(url.pathname)).then(hit=>hit||fetch(event.request)))
  }
})
`)
