import React, { useEffect, useState } from 'react'
import Avtorizatsiya from './stranitsy/Avtorizatsiya.jsx'
import SpisokPersonazhey from './stranitsy/SpisokPersonazhey.jsx'
import SozdaniePersonazha from './stranitsy/SozdaniePersonazha.jsx'
import ListokPersonazha from './stranitsy/ListokPersonazha.jsx'
import PustieListki from './stranitsy/PustieListki.jsx'
import BrosalkaKubikov from './stranitsy/BrosalkaKubikov.jsx'
import { poluchitSeans, vykhod } from './khranilishhe.js'

export default function App() {
  const [seans, ustanoviSeans] = useState(poluchitSeans())
  const [stranitsa, ustanoviStranitsu] = useState('spisok')
  const [personazhId, ustanoviPersonazhaId] = useState(null)

  useEffect(() => {
    ustanoviSeans(poluchitSeans())
  }, [])

  if (!seans) {
    return <Avtorizatsiya naVkhod={() => { ustanoviSeans(poluchitSeans()); ustanoviStranitsu('spisok') }} />
  }

  const meniuPunkty = [
    { kluch: 'spisok', nazvanie: 'Мои персонажи' },
    { kluch: 'sozdanie', nazvanie: 'Создать персонажа' },
    { kluch: 'kubiki', nazvanie: 'Броски кубиков' },
    { kluch: 'pustie', nazvanie: 'Пустые листки' }
  ]

  return (
    <div>
      <div className="verkhnyayaPanel">
        <div className="meniu">
          {meniuPunkty.map(punkt => (
            <button key={punkt.kluch} onClick={() => ustanoviStranitsu(punkt.kluch)}>{punkt.nazvanie}</button>
          ))}
        </div>
        <div className="ryad">
          <span>{seans.login}</span>
          <button onClick={() => { vykhod(); ustanoviSeans(null) }}>Выйти</button>
        </div>
      </div>
      <div className="soderzhimoe">
        {stranitsa === 'spisok' && (
          <SpisokPersonazhey
            naSozdanie={() => ustanoviStranitsu('sozdanie')}
            naOtkrytie={(id) => { ustanoviPersonazhaId(id); ustanoviStranitsu('listok') }}
          />
        )}
        {stranitsa === 'sozdanie' && <SozdaniePersonazha naGotovo={() => ustanoviStranitsu('spisok')} />}
        {stranitsa === 'listok' && <ListokPersonazha id={personazhId} />}
        {stranitsa === 'kubiki' && <BrosalkaKubikov />}
        {stranitsa === 'pustie' && <PustieListki />}
      </div>
    </div>
  )
}