import React, { useEffect, useState } from 'react'
import coverCartas from '../componentes/coverCartas.jfif'
import './Carta.css'

const Carta = ({ id, color, partida, cartasVolteadas, setCartasVolteadas, indicesVolteados, setIndicesVolteados, imagenCarta }) => {
  const [volteada, setVolteada] = useState(false);
  // const {transform, opacity} = useSpring({
  //   opacity: volteada ? 1 : 0,
  //   transform: `perspective(600px) rotateX(${volteada ? 180 : 0}deg)`,
  //   config: {mass: 5, tension: 500, friction: 80},
  // })
  debugger;

  useEffect(() => {
    console.log('Cambiaron los indices volteados');
    if(indicesVolteados[2] === true && indicesVolteados.indexOf(id) > -1) {
      setTimeout(() => {
        
        setVolteada(() => !volteada)
        setCartasVolteadas(cartasVolteadas + 1);
        setIndicesVolteados([])
      }, 1000)
    } else if (indicesVolteados[2] === false && id === 0) {
      setCartasVolteadas(cartasVolteadas + 1);
      setIndicesVolteados([])
    } 
  }, [indicesVolteados])

  const clickCarta = () => {
    // console.log('Card Clicked');
    // setVolteada(() => !volteada)
    debugger;
    if(!partida[id].volteada && cartasVolteadas % 3 === 0) {
      setVolteada(() => !volteada);
      setCartasVolteadas(cartasVolteadas + 1)
      const nuevosIndices = [...indicesVolteados];
      nuevosIndices.push(id);
      setIndicesVolteados(nuevosIndices);
    } else if (cartasVolteadas % 3 === 1 && !partida[id].volteada && indicesVolteados.indexOf(id) < 0) {
      setVolteada(() => !volteada);
      setCartasVolteadas(cartasVolteadas + 1);
      const nuevosIndices = [...indicesVolteados]
      nuevosIndices.push(id);
      setIndicesVolteados(nuevosIndices);
    }
  }

  return (
    <div className='CartaIndividual' onClick={clickCarta}>
      <div className='ContenidoCarta' style={{transform: volteada ? 'rotateY(180deg)' : 'none'}}>
        <div className='CartaExterior'>
          <img src={coverCartas} alt='carta memorama'/>
        </div>
        <div className='CartaInterior' style={{background: color}}>
          <img src= {imagenCarta} alt="imagen personaje"/>
        </div>
      </div>
    </div>
  )
}

export default Carta