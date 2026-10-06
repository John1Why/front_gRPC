import React from 'react'
import { poluchitPersonazhey, udalitPersonazha } from '../khranilishhe.js'

export default function SpisokPersonazhey({ naSozdanie, naOtkrytie }) {
  const personazhi = poluchitPersonazhey()

  function obrabotayUdalenie(id) {
    if (window.confirm('Удалить персонажа?')) {
      udalitPersonazha(id)
      window.location.reload()
    }
  }

  return (
    <div>
      <h2 className="zagolovok">Мои персонажи</h2>
      <div className="ryad" style={{ marginBottom: 16 }}>
        <button onClick={naSozdanie}>Создать персонажа</button>
      </div>
      {personazhi.length === 0 && <div className="kartochka">Пока нет персонажей. Создайте первого!</div>}
      {personazhi.map(personazh => (
        <div className="kartochka" key={personazh.id}>
          <div className="ryad" style={{ justifyContent: 'space-between' }}>
            <div>
              <strong>{personazh.imya}</strong> — {personazh.klass || 'без класса'}, {personazh.rasa || 'без расы'}, {personazh.uroven} ур.
              <div style={{ fontSize: 12 }}>{personazh.sistema}</div>
            </div>
            <div className="ryad">
              <button onClick={() => naOtkrytie(personazh.id)}>Открыть листок</button>
              <button onClick={() => obrabotayUdalenie(personazh.id)}>Удалить</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}