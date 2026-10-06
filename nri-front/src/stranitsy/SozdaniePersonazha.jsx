import React, { useState } from 'react'
import { pustoyPersonazh, sozdatPersonazha, brositKubiki } from '../khranilishhe.js'

const shagi = ['Система', 'Имя и класс', 'Характеристики', 'Детали', 'Готово']
const nazvaniyaHarakteristik = {
  sila: 'Сила',
  lovkost: 'Ловкость',
  teloslozhenie: 'Телосложение',
  intellekt: 'Интеллект',
  mudrost: 'Мудрость',
  obayanie: 'Обаяние'
}

export default function SozdaniePersonazha({ naGotovo }) {
  const [shag, ustanoviShag] = useState(0)
  const [personazh, ustanoviPersonazha] = useState(pustoyPersonazh())
  const [poslednieBroski, ustanoviPoslednieBroski] = useState({})

  function obnovitPole(pole, znachenie) {
    ustanoviPersonazha({ ...personazh, [pole]: znachenie })
  }

  function obnovitHarakteristiku(kluch, znachenie) {
    ustanoviPersonazha({
      ...personazh,
      harakteristiki: { ...personazh.harakteristiki, [kluch]: Number(znachenie) }
    })
  }

  function obnovitDopolnitelnoe(pole, znachenie) {
    ustanoviPersonazha({
      ...personazh,
      dopolnitelnyeDannye: { ...personazh.dopolnitelnyeDannye, [pole]: znachenie }
    })
  }

  function bros4d6(kluch) {
    const brosok = brositKubiki(4, 6)
    const otsechennye = [...brosok.rezultaty].sort((a, b) => b - a).slice(0, 3)
    const znachenie = otsechennye.reduce((a, b) => a + b, 0)
    obnovitHarakteristiku(kluch, znachenie)
    ustanoviPoslednieBroski({ ...poslednieBroski, [kluch]: brosok.rezultaty.join(', ') })
  }

  function obrabotaySokhranenie() {
    if (!personazh.imya.trim()) {
      ustanoviShag(1)
      return
    }
    sozdatPersonazha(personazh)
    naGotovo()
  }

  return (
    <div>
      <h2 className="zagolovok">Пошаговое создание персонажа</h2>
      <div className="shagi">
        {shagi.map((nazvanie, indeks) => (
          <button
            key={nazvanie}
            className={indeks === shag ? 'shag aktivnyy' : 'shag'}
            onClick={() => ustanoviShag(indeks)}
          >
            {indeks + 1}. {nazvanie}
          </button>
        ))}
      </div>

      {shag === 0 && (
        <div className="kartochka">
          <div className="pole">
            <label>Система игры</label>
            <select value={personazh.sistema} onChange={e => obnovitPole('sistema', e.target.value)}>
              <option>D&D 5e</option>
              <option>Pathfinder</option>
              <option>Своя система</option>
            </select>
          </div>
        </div>
      )}

      {shag === 1 && (
        <div className="kartochka">
          <div className="setka">
            <div className="pole">
              <label>Имя персонажа</label>
              <input value={personazh.imya} onChange={e => obnovitPole('imya', e.target.value)} />
            </div>
            <div className="pole">
              <label>Класс</label>
              <input value={personazh.klass} onChange={e => obnovitPole('klass', e.target.value)} />
            </div>
            <div className="pole">
              <label>Раса</label>
              <input value={personazh.rasa} onChange={e => obnovitPole('rasa', e.target.value)} />
            </div>
            <div className="pole">
              <label>Уровень</label>
              <input type="number" min="1" max="20" value={personazh.uroven} onChange={e => obnovitPole('uroven', Number(e.target.value))} />
            </div>
          </div>
        </div>
      )}

      {shag === 2 && (
        <div className="kartochka">
          <p style={{ marginBottom: 12 }}>Бросьте 4d6 и отбросьте худший кубик или впишите значение вручную.</p>
          <div className="setka">
            {Object.keys(nazvaniyaHarakteristik).map(kluch => (
              <div className="kartochka" key={kluch}>
                <div className="pole">
                  <label>{nazvaniyaHarakteristik[kluch]}</label>
                  <input
                    type="number"
                    value={personazh.harakteristiki[kluch]}
                    onChange={e => obnovitHarakteristiku(kluch, e.target.value)}
                  />
                </div>
                <div className="ryad" style={{ marginTop: 8 }}>
                  <button onClick={() => bros4d6(kluch)}>4d6</button>
                  {poslednieBroski[kluch] && <span>({poslednieBroski[kluch]})</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {shag === 3 && (
        <div className="kartochka">
          <div className="setka">
            <div className="pole">
              <label>Здоровье</label>
              <input type="number" value={personazh.dopolnitelnyeDannye.zdorove} onChange={e => obnovitDopolnitelnoe('zdorove', Number(e.target.value))} />
            </div>
            <div className="pole">
              <label>Класс брони</label>
              <input type="number" value={personazh.dopolnitelnyeDannye.klassBroni} onChange={e => obnovitDopolnitelnoe('klassBroni', Number(e.target.value))} />
            </div>
          </div>
          <div className="pole" style={{ marginTop: 12 }}>
            <label>Навыки</label>
            <textarea rows="3" value={personazh.dopolnitelnyeDannye.navyki} onChange={e => obnovitDopolnitelnoe('navyki', e.target.value)} />
          </div>
          <div className="pole" style={{ marginTop: 12 }}>
            <label>Оружие</label>
            <textarea rows="3" value={personazh.dopolnitelnyeDannye.oruzhie} onChange={e => obnovitDopolnitelnoe('oruzhie', e.target.value)} />
          </div>
          <div className="pole" style={{ marginTop: 12 }}>
            <label>Предметы</label>
            <textarea rows="3" value={personazh.dopolnitelnyeDannye.predmety} onChange={e => obnovitDopolnitelnoe('predmety', e.target.value)} />
          </div>
          <div className="pole" style={{ marginTop: 12 }}>
            <label>Предыстория</label>
            <textarea rows="4" value={personazh.dopolnitelnyeDannye.predystoriya} onChange={e => obnovitDopolnitelnoe('predystoriya', e.target.value)} />
          </div>
        </div>
      )}

      {shag === 4 && (
        <div className="kartochka">
          <p>Проверьте данные и сохраните персонажа.</p>
          <div style={{ marginTop: 12 }}>
            <div><strong>{personazh.imya || 'Без имени'}</strong></div>
            <div>{personazh.klass} {personazh.uroven} ур., {personazh.rasa}, {personazh.sistema}</div>
          </div>
          <button style={{ marginTop: 12 }} onClick={obrabotaySokhranenie}>Сохранить персонажа</button>
        </div>
      )}

      <div className="ryad" style={{ marginTop: 16 }}>
        {shag > 0 && <button onClick={() => ustanoviShag(shag - 1)}>Назад</button>}
        {shag < 4 && <button onClick={() => ustanoviShag(shag + 1)}>Далее</button>}
      </div>
    </div>
  )
}