import React from 'react'
import { poluchitPersonazhey } from '../khranilishhe.js'
import Listok from '../komponenty/Listok.jsx'

export default function ListokPersonazha({ id }) {
  const personazh = poluchitPersonazhey().find(p => p.id === id)

  if (!personazh) {
    return <div className="kartochka">Персонаж не найден</div>
  }

  return (
    <div>
      <div className="ryad bezPechati" style={{ marginBottom: 16 }}>
        <button onClick={() => window.print()}>Сохранить в PDF / Печать</button>
      </div>
      <Listok personazh={personazh} />
    </div>
  )
}