import React from 'react'
import Listok from '../komponenty/Listok.jsx'
import { pustoyPersonazh } from '../khranilishhe.js'

export default function PustieListki() {
  return (
    <div>
      <h2 className="zagolovok bezPechati">Пустые листки персонажей</h2>
      <div className="ryad bezPechati" style={{ marginBottom: 16 }}>
        <button onClick={() => window.print()}>Печать / Сохранить в PDF</button>
      </div>
      <Listok personazh={pustoyPersonazh()} dlyaZapolneniya={true} />
    </div>
  )
}