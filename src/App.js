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
              
              <button onClick={() => setOpciones(12)}>
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
