import { useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import './style.css'
import api from './services/api'

function App() {
  //01310930/json
  const [input, setInput] = useState('')
  const [cep, setCep] = useState({})

  async function handleSearch() {
    if (!input) {
      document.querySelector('#error').classList.add('span-error')
      document.querySelector('#error').innerHTML = 'Preencha os Campos.'
    } else {
      try {
        document
          .querySelector('#error')
          .classList.remove('span-error', 'span-error2')
        document.querySelector('#error').innerHTML = ' '
        const response = await api.get(`${input}/json`)
        setCep(response.data)

        setInput('')
      } catch {
        document.querySelector('#error').classList.add('span-error2')
        document.querySelector('#error').innerHTML =
          'Ops, parece que algo deu errado.'
      }
    }
  }

  return (
    <div className="container">
      <h1 className="title">Buscador Cep</h1>

      <div className="containerInput">
        <input
          type="text"
          placeholder="Digite seu Cep..."
          value={input}
          onChange={event => setInput(event.currentTarget.value)}
        />

        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch sinze={25} color="#FFF" />
        </button>
      </div>

      <div id="error" className="">
        <span id="error"></span>
      </div>

      {Object.keys(cep).length > 0 && (
        <main id="tamplete">
          <h2>CEP: {cep.cep}</h2>

          <span>{cep.logradouro}</span>
          <span>complemento:{cep.complemento}</span>
          <span>{cep.bairro}</span>
          <span>
            {cep.localidade} - {cep.uf}
          </span>
        </main>
      )}
    </div>
  )
}

export default App
