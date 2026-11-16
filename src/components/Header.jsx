import React from 'react'
export default function Header({title,subtitle}) {
  return <header className="mx-auto max-w-2xl px-4 pt-7 pb-8 text-center">
    <img className="mx-auto mb-3 h-40 w-40 max-w-full" src="/jasos-eye.svg" width="160" height="160" alt="چشم متحرک جاسوس"/>
    <h1 className="text-4xl font-black sm:text-5xl">{title}</h1><p className="mt-2 text-sm font-semibold leading-7 text-slate-300 sm:text-lg">{subtitle}</p>
  </header>
}
