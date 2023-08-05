import React from 'react'
import "./Card.scss"
import { Link, useParams } from 'react-router-dom'
import notFound from "../../assets/imagenotfound.png"
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();

const Card = ({pokeData, loading, search}) => {

    console.log((pokeData))
    



  return (
    <>
    {loading ?
     <div class="poke">
     <div class="pokeball">
     </div>
   </div>
      : pokeData.filter((item) => {
        return search.toLowerCase() === "" ? item : item.name.toLowerCase().includes(search)
    }).map((item, index) => (
    <div className='card' key={index} data-aos="flip-left">
        <h2>{item.name.toUpperCase()}</h2>
        {item.sprites.front_default ? (
                <img src={item.sprites.front_default} alt="" />
              ) : item.sprites.front_shiny ? (
                <img src={item.sprites.front_shiny} alt="" />
              ) : (
                <img src={notFound} alt="Image Not Found" />
              )}
        {/* <img src={item.sprites.front_default?? ""} alt="" /> */}
        <p>Type : {item.types[0].type.name}</p>
        <Link to={`/detail/${item.id}`} pokeData={pokeData}>
            <button>See More</button>
        </Link>
    </div>
    ))}
    </>
  )
}

export default Card