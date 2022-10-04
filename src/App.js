import React, { useState, useEffect } from 'react';
import './App.css';
import Memorama from './componentes/Memorama';

function App() {

  const [opciones, setOpciones] = useState(null);
  const [puntuacion, setPuntuacion] = useState(0);
  const [personaje, setPersonaje] = useState();

  useEffect(() => {
    const json = localStorage.getItem('memoramapuntacionalta')
    const partidaGuardada = JSON.parse(json)
    if (partidaGuardada) {
      setPuntuacion(partidaGuardada);
    }
  }, [puntuacion])

  useEffect(() => {
    fetch("https://rickandmortyapi.com/api/character")
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setPersonaje(data);
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  const obtenerNumeroCartas = () => {
    const inputPares = document.getElementById("numeroCartas");
    const numeroPares = inputPares.value
    if (numeroPares) {
      document.getElementById("AlertaForma").innerHTML = null;
      inputPares.style.backgroundColor = '#00f0ff'
      inputPares.style.border = "none"
      return numeroPares * 2
    } else {
      document.getElementById("AlertaForma").innerHTML = "Ingrese un numero para iniciar el juego";
      inputPares.style.backgroundColor = '#fcee09'
      inputPares.style.border = "3px solid #050a0e"
      return null;
    }
  }

  return (

    <div className='container'>
      <nav>
        <h1>Memorama</h1>
        <div className='cajaPuntuacion'>
          <h2>Puntuacion: {puntuacion.toFixed(2)}</h2>
        </div>
        <div>
          {opciones === null ? (
            <div>
              <div className='form'>
                <label for="numeroCartas">Numero de pares:
                  <input type="number" name='numeroCartas' id="numeroCartas" required />
                </label>
                <p id="AlertaForma"></p>

              </div>
              
              <button onClick={() => setOpciones(obtenerNumeroCartas())}>
                <div className='button__content'>Iniciar juego</div>
                <span class="button__glitch"></span>
                <span className='button__label'>r26</span>
              </button>
            </div>
          ) : (
            <div className='CajaBotones'>
              <button onClick={() => {
                const opcionAnterior = opciones;
                setOpciones(null)
                setTimeout(() => {
                  setOpciones(opcionAnterior)
                }, 5)
              }}
              >
                <div className='button__content'>Reiniciar_</div>
                <span class="button__glitch"></span>
                <span className='button__label'>r25</span>
              </button>
              <button onClick={() => { setOpciones(null) }}>
                <div className='button__content'>Menu Principal</div>
                <span class="button__glitch"></span>
                <span className='button__label'>r26</span>
              </button>
            </div>
          )}
        </div>
      </nav>
      <main>
        {opciones ? (
          <Memorama
            opciones={opciones}
            setOpciones={setOpciones}
            puntuacion={puntuacion}
            setPuntuacion={setPuntuacion}
            personaje={personaje} />
        ) : (
          <h2>Presione el boton para iniciar...</h2>)}
      </main>
    </div>
  );
}

export default App;
