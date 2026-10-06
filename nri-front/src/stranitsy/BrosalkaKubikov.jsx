import React, { useState } from 'react'
import { brositKubiki } from '../khranilishhe.js'

const grani = [4, 6, 8, 10, 12, 20, 100]

export default function BrosalkaKubikov() {
  const [istoriya, ustanoviIstoriiyu] = useState([])

  function obrabotayBrosok(kolichestvo, chisloGraney, modifikator) {
    const brosok = { ...brositKubiki(kolichestvo, chisloGraney, modifikator), kolichestvo, grani: chisloGraney }
    ustanoviIstoriiyu([brosok, ...istoriya].slice(0, 30))
  }

  return (
    <div>
      <h2 className="zagolovok">Броски кубиков</h2>
      <div className="kartochka">
        {grani.map(chisloGraney => (
          <div className="ryad" key={chisloGraney} style={{ marginBottom: 8 }}>
            <strong style={{ minWidth: 60 }}>d{chisloGraney}</strong>
            {[1, 2, 3].map(kolichestvo => (
              <button key={kolichestvo} onClick={() => obrabotayBrosok(kolichestvo, chisloGraney, 0)}>
                {kolichestvo}d{chisloGraney}
              </button>
            ))}
          </div>
        ))}
      </div>
      {istoriya.length > 0 && (
        <div className="kartochka">
          <strong>История бросков</strong>
          {istoriya.map((brosok, indeks) => (
            <div className="ryad" key={indeks} style={{ justifyContent: 'space-between', marginTop: 6 }}>
              <span>{brosok.kolichestvo}d{brosok.grani}</span>
              <span>{brosok.rezultaty.join(', ')}</span>
              <strong>Итог: {brosok.itog}</strong>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}