import React from 'react'

const nazvaniyaHarakteristik = {
  sila: 'Сила',
  lovkost: 'Ловкость',
  teloslozhenie: 'Телосложение',
  intellekt: 'Интеллект',
  mudrost: 'Мудрость',
  obayanie: 'Обаяние'
}

export default function Listok({ personazh, dlyaZapolneniya }) {
  return (
    <div className="listokA4">
      <div className="listokZagolovok">
        <div className="pole">
          <div className="listokPodpis">Имя персонажа</div>
          {dlyaZapolneniya ? <div>&nbsp;</div> : <strong>{personazh.imya}</strong>}
        </div>
        <div className="pole">
          <div className="listokPodpis">Класс и уровень</div>
          {dlyaZapolneniya ? <div>&nbsp;</div> : <strong>{personazh.klass} {personazh.uroven} ур.</strong>}
        </div>
        <div className="pole">
          <div className="listokPodpis">Раса / Система</div>
          {dlyaZapolneniya ? <div>&nbsp;</div> : <strong>{personazh.rasa} / {personazh.sistema}</strong>}
        </div>
      </div>

      <div className="listokSektsiya">
        <div className="listokPodpis">Характеристики</div>
        <div className="harakteristiki">
          {Object.keys(nazvaniyaHarakteristik).map(kluch => (
            <div className="harakteristika" key={kluch}>
              <div>{nazvaniyaHarakteristik[kluch]}</div>
              <div className="harakteristikaBolshaya">
                {dlyaZapolneniya ? '\u00a0' : personazh.harakteristiki[kluch]}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="setka">
        <div className="listokSektsiya">
          <div className="listokPodpis">Здоровье</div>
          {dlyaZapolneniya ? <div>&nbsp;</div> : <strong>{personazh.dopolnitelnyeDannye.zdorove}</strong>}
        </div>
        <div className="listokSektsiya">
          <div className="listokPodpis">Класс брони</div>
          {dlyaZapolneniya ? <div>&nbsp;</div> : <strong>{personazh.dopolnitelnyeDannye.klassBroni}</strong>}
        </div>
      </div>

      <div className="listokSektsiya">
        <div className="listokPodpis">Навыки</div>
        {dlyaZapolneniya ? <div style={{ height: 40 }}>&nbsp;</div> : <div>{personazh.dopolnitelnyeDannye.navyki}</div>}
      </div>

      <div className="listokSektsiya">
        <div className="listokPodpis">Оружие</div>
        {dlyaZapolneniya ? <div style={{ height: 40 }}>&nbsp;</div> : <div>{personazh.dopolnitelnyeDannye.oruzhie}</div>}
      </div>

      <div className="listokSektsiya">
        <div className="listokPodpis">Предметы</div>
        {dlyaZapolneniya ? <div style={{ height: 40 }}>&nbsp;</div> : <div>{personazh.dopolnitelnyeDannye.predmety}</div>}
      </div>

      <div className="listokSektsiya">
        <div className="listokPodpis">Предыстория</div>
        {dlyaZapolneniya ? <div style={{ height: 60 }}>&nbsp;</div> : <div>{personazh.dopolnitelnyeDannye.predystoriya}</div>}
      </div>
    </div>
  )
}