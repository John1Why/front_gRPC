const kluchPolzovateli = 'nri_polzovateli'
const kluchSeans = 'nri_seans'
const kluchPersonazhi = 'nri_personazhi'

export function brosokKubika(grani) {
  return Math.floor(Math.random() * grani) + 1
}

export function brositKubiki(kolichestvo, grani, modifikator = 0) {
  const rezultaty = []
  for (let i = 0; i < kolichestvo; i++) {
    rezultaty.push(brosokKubika(grani))
  }
  const summa = rezultaty.reduce((a, b) => a + b, 0)
  return { rezultaty, summa, modifikator, itog: summa + modifikator }
}

export function poluchitSeans() {
  const syroe = localStorage.getItem(kluchSeans)
  return syroe ? JSON.parse(syroe) : null
}

export function vkhod(login) {
  localStorage.setItem(kluchSeans, JSON.stringify({ login, data: new Date().toISOString() }))
}

export function vykhod() {
  localStorage.removeItem(kluchSeans)
}

export function sozdatPolzovatelya(login, email, telefon, parol) {
  const polzovateli = JSON.parse(localStorage.getItem(kluchPolzovateli) || '[]')
  if (polzovateli.some(p => p.login === login || p.email === email || p.telefon === telefon)) {
    throw new Error('Такой пользователь уже существует')
  }
  const polzovatel = { id: Date.now(), login, email, telefon, parol }
  polzovateli.push(polzovatel)
  localStorage.setItem(kluchPolzovateli, JSON.stringify(polzovateli))
  return polzovatel
}

export function naytiPolzovatelya(identifikator, parol) {
  const polzovateli = JSON.parse(localStorage.getItem(kluchPolzovateli) || '[]')
  return polzovateli.find(p => (p.login === identifikator || p.email === identifikator || p.telefon === identifikator) && p.parol === parol)
}

export function poluchitPersonazhey() {
  return JSON.parse(localStorage.getItem(kluchPersonazhi) || '[]')
}

export function sohranitPersonazhey(personazhi) {
  localStorage.setItem(kluchPersonazhi, JSON.stringify(personazhi))
}

export function sozdatPersonazha(personazh) {
  const personazhi = poluchitPersonazhey()
  personazh.id = Date.now()
  personazh.sozdan = new Date().toISOString()
  personazhi.push(personazh)
  sohranitPersonazhey(personazhi)
  return personazh
}

export function obnovitPersonazha(personazh) {
  const personazhi = poluchitPersonazhey()
  const indeks = personazhi.findIndex(p => p.id === personazh.id)
  if (indeks === -1) throw new Error('Персонаж не найден')
  personazhi[indeks] = personazh
  sohranitPersonazhey(personazhi)
}

export function udalitPersonazha(id) {
  sohranitPersonazhey(poluchitPersonazhey().filter(p => p.id !== id))
}

export function pustoyPersonazh() {
  return {
    imya: '',
    sistema: 'D&D 5e',
    klass: '',
    rasa: '',
    uroven: 1,
    harakteristiki: {
      sila: 10,
      lovkost: 10,
      teloslozhenie: 10,
      intellekt: 10,
      mudrost: 10,
      obayanie: 10
    },
    dopolnitelnyeDannye: {
      zdorove: 10,
      klassBroni: 10,
      navyki: '',
      oruzhie: '',
      predmety: '',
      predystoriya: ''
    }
  }
}