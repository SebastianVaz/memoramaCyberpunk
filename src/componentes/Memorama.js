import React, { useEffect, useState } from 'react'
import Carta from './Carta';
import './Memorama.css'

const Memorama = ({ opciones, setOpciones, puntuacion, setPuntuacion, personaje }) => {

  const [partida, setPartida] = useState([]);
  const [cartasVolteadas, setCartasVolteadas] = useState(0);
  const [indicesVolteados, setIndicesVolteados] = useState([]);

  const colores = [
    '#ecdb54',
    '#e34132',
    '#6ca0dc',
    '#944743',
    '#dbb2d1',
    '#ec9787',
    '#00a68c',
    '#645394',
    '#6c4f3d',
    '#ebe1df',
    '#bc6ca7',
    '#bfd833',
  ]

  useEffect(() => {
    const nuevaPartida = [];
    console.log('generando partida');
    // const imagenCarta = personaje?.results[Math.floor(Math.random()*personaje.results.length)].image
    debugger;
    for (let i = 0; i < opciones / 2; i++) {
      const imagenCarta = personaje?.results[Math.floor(Math.random()*personaje.results.length)].image
      const primeraSeleccion = {
        id: 2 * i,
        cartaId: i,
        color: colores[i],
        volteada: false,
        imagen: imagenCarta,
      }
      const segundaSeleccion = {
        id: 2 * i + 1,
        cartaId: i,
        color: colores[i],
        volteada: false,
        imagen: imagenCarta,
      }

      console.log(primeraSeleccion.imagen)
      nuevaPartida.push(primeraSeleccion);
      nuevaPartida.push(segundaSeleccion);
    }

    const partidaAleatoria = nuevaPartida.sort(() => Math.random() - 0.5);
    setPartida(partidaAleatoria);
  }, [])

  useEffect(() => {
    const partidaTerminada = !partida.some(carta => !carta.volteada);

    if(partidaTerminada && partida.length > 0) {
      setTimeout(() => {
        const movimientoPerfectos = partida.length;
        let multiplciador;

        if(opciones === 12) {
          multiplciador = 5;
        }

        const perdidaDePuntos = multiplciador * (0.66 * cartasVolteadas - movimientoPerfectos);

        let puntos;
        if(perdidaDePuntos < 100) {
          puntos = 100 - perdidaDePuntos;
        } else {
          puntos = 0;
        }

        if(puntos > puntuacion) {
          setPuntuacion(puntuacion);
          const json = JSON.stringify(puntos);
          localStorage.setItem('memoramapuntacionalta', json);
        }
        
        const nuevaPartida = window.confirm('Ganaste!, Puntuacion: ' + puntos + 'Nueva partida?');
        if(nuevaPartida) {
          const longuitudPartida = partida.length
          setOpciones(null);
          setTimeout(() => {
            setOpciones(longuitudPartida)
          }, 5)
        } else {
          setOpciones(null)
        }

      },500)
    }

  }, [partida])

  if(indicesVolteados.length === 2) {
    //logica cuando dos cartas fueron volteadas
    const pareja = partida[indicesVolteados[0]].cartaId === partida[indicesVolteados[1]].cartaId;
    debugger;
    if(pareja) {
      const nuevaPartida = [...partida];
      nuevaPartida[indicesVolteados[0]].volteada = true;
      nuevaPartida[indicesVolteados[1]].volteada = true;
      setPartida(nuevaPartida);

      const nuevosIndices = [...indicesVolteados];
      nuevosIndices.push(false);
      setIndicesVolteados(nuevosIndices);
    } else {
      const nuevosIndices = [...indicesVolteados];
      nuevosIndices.push(true);
      setIndicesVolteados(nuevosIndices);
    }
  }

  if(partida.length === 0) {
    return <div>Generando partida...</div>
  } else {
    return (
      // <h1>Texto prueba</h1>
      <div id="cartas">
        {partida.map((carta,indice) => (
          <div className='carta' key={indice}>
            <Carta
              id={indice}
              color={carta.color}
              partida={partida}
              cartasVolteadas = {cartasVolteadas}
              setCartasVolteadas = {setCartasVolteadas}
              indicesVolteados = {indicesVolteados}
              setIndicesVolteados = {setIndicesVolteados}
              imagenCarta={carta.imagen}
            />
          </div>
        ))}
      </div>
    )
  }
}

export default Memorama