import React from 'react'
export default function Header({title,subtitle}) {
  return <header className="mx-auto max-w-2xl px-4 pt-7 pb-8 text-center">
    <div className="mx-auto mb-2 grid size-11 place-items-center rounded-2xl bg-amber-400/15 text-amber-400" aria-hidden="true"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"><circle cx="12" cy="6" r="3"/><circle cx="4.5" cy="9" r="2"/><circle cx="19.5" cy="9" r="2"/><path d="M7 21v-4a5 5 0 0 1 10 0v4M2 20v-4a3 3 0 0 1 3-3m17 7v-4a3 3 0 0 0-3-3"/></svg></div>
    <h1 className="text-4xl font-black sm:text-5xl">{title}</h1><p className="mt-2 text-sm font-semibold leading-7 text-slate-300 sm:text-lg">{subtitle}</p>
  </header>
}
