import React, { useEffect, useState } from 'react'
import "./Home.scss"
import {BsSearch} from "react-icons/bs"
import Card from '../Card/Card'
import axios from 'axios'
import {BiSkipNext, BiSkipPrevious} from "react-icons/bi"
import DarkMode from '../DarkMode/DarkMode'

const Home = () => {


    const [pokeData, setPokeData] = useState([])
    const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/")
    const [loading, setLoading] = useState(false)
    const [nextUrl, setNextUrl] = useState()
    const [prevUrl, setPrevUrl] = useState()
    const [search, setSearch] = useState("")

    const fetchPokemon = async () => {
        try {
            setLoading(true)
            const result = await axios.get(url)
            // console.log(result.data)
            setNextUrl(result.data.next)
            setPrevUrl(result.data.previous)
            getPokemon(result.data.results)
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
       
        
    }

    const getPokemon=async(res)=>{
        res.map(async(item)=>{
           const result=await axios.get(item.url)
           setPokeData(state=>{
               state=[...state,result.data]
               state.sort((a,b)=>a.id>b.id?1:-1)
               return state;
           })
        })   
     }
    

    useEffect(() => {
        fetchPokemon()
    },[url])

    



  return (
    <div className='home'>
        <div className="input-group">
            <BsSearch />
        <input type="text" placeholder='search' onChange={(e) => setSearch(e.target.value)}/>
        </div>
        <DarkMode />
        <div className="card-group">
            <Card pokeData={pokeData} loading={loading} search={search}  />
        </div> 
        
        <div className="btn-group">
        {  prevUrl && <button onClick={()=>{
                            setPokeData([])
                           setUrl(prevUrl) 
                        }}><BiSkipPrevious /> Previous</button>}

                        { nextUrl && <button onClick={()=>{
                            setPokeData([])
                            setUrl(nextUrl)
                        }}>Next <BiSkipNext /></button>}
        </div>
    </div>
  )
}

export default Home