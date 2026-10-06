import React, { useState } from 'react'
import { sozdatPolzovatelya, naytiPolzovatelya, vkhod } from '../khranilishhe.js'

export default function Avtorizatsiya({ naVkhod }) {
  const [rezhim, ustanoviRezhim] = useState('vhod')
  const [login, ustanoviLogin] = useState('')
  const [email, ustanoviEmail] = useState('')
  const [telefon, ustanoviTelefon] = useState('')
  const [identifikator, ustanoviIdentifikator] = useState('')
  const [parol, ustanoviParol] = useState('')
  const [oshibka, ustanoviOshibku] = useState('')

  function obrabotayVkhod(e) {
    e.preventDefault()
    const polzovatel = naytiPolzovatelya(identifikator, parol)
    if (!polzovatel) {
      ustanoviOshibku('Неверный email/телефон или пароль')
      return
    }
    vkhod(polzovatel.login)
    naVkhod()
  }

  function obrabotayRegistratsiyu(e) {
    e.preventDefault()
    try {
      const polzovatel = sozdatPolzovatelya(login, email, telefon, parol)
      vkhod(polzovatel.login)
      naVkhod()
    } catch (oshibka) {
      ustanoviOshibku(oshibka.message)
    }
  }

  return (
    <div className="soderzhimoe">
      <h1 className="zagolovok">НРИ — конструктор персонажей</h1>
      <div className="shagi" style={{ justifyContent: 'center' }}>
        <button className={rezhim === 'vhod' ? 'shag aktivnyy' : 'shag'} onClick={() => ustanoviRezhim('vhod')}>Вход</button>
        <button className={rezhim === 'registratsiya' ? 'shag aktivnyy' : 'shag'} onClick={() => ustanoviRezhim('registratsiya')}>Регистрация</button>
      </div>
      {oshibka && <div className="kartochka">{oshibka}</div>}
      {rezhim === 'vhod' ? (
        <form className="kartochka" onSubmit={obrabotayVkhod}>
          <div className="pole">
            <label>Email или телефон</label>
            <input value={identifikator} onChange={e => ustanoviIdentifikator(e.target.value)} required />
          </div>
          <div className="pole" style={{ marginTop: 12 }}>
            <label>Пароль</label>
            <input type="password" value={parol} onChange={e => ustanoviParol(e.target.value)} required />
          </div>
          <button style={{ marginTop: 12 }} type="submit">Войти</button>
        </form>
      ) : (
        <form className="kartochka" onSubmit={obrabotayRegistratsiyu}>
          <div className="setka">
            <div className="pole">
              <label>Логин</label>
              <input value={login} onChange={e => ustanoviLogin(e.target.value)} required />
            </div>
            <div className="pole">
              <label>Электронная почта</label>
              <input type="email" value={email} onChange={e => ustanoviEmail(e.target.value)} required />
            </div>
            <div className="pole">
              <label>Номер телефона</label>
              <input value={telefon} onChange={e => ustanoviTelefon(e.target.value)} required />
            </div>
            <div className="pole">
              <label>Пароль</label>
              <input type="password" value={parol} onChange={e => ustanoviParol(e.target.value)} required />
            </div>
          </div>
          <button style={{ marginTop: 12 }} type="submit">Зарегистрироваться</button>
        </form>
      )}
    </div>
  )
}