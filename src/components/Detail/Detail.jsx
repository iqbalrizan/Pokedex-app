import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {AiOutlineRollback} from "react-icons/ai"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import "./Detail.scss"
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  indexAxis: 'y' ,
  elements: {
    bar: {
      borderWidth: 1,
      
    },
  },
  plugins : {
    legend: {
      labels: {
        
        font: {
          size: 8, 
        },
      },
    },
  },
  responsive: true,
};



const Detail = () => {
  const { id } = useParams();
  const [pokemonData, setPokemonData] = useState(null);

  useEffect(() => {
    fetchPokemonData(id);
  }, [id]);

  const stats = pokemonData ? pokemonData.stats.map((stat) => ({
    label: stat.stat.name,
    value: stat.base_stat,
  })) : [];

  const chartLabels = stats.map((stat) => stat.label);
  const chartData = stats.map((stat) => stat.value);

  const chartDataConfig = {
    labels: chartLabels,
    datasets: [
      {
        label: 'Stats',
        data: chartData,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  

  const fetchPokemonData = async (id) => {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
      console.log(response.data)
      setPokemonData(response.data);
    } catch (error) {
      console.error("Error fetching Pokemon data:", error);
      setPokemonData(null);
    }
  };

  if (!pokemonData) {
    return <div class="poke">
    <div class="pokeball">
    </div>
  </div>;
  }

  return (
    <div className="detail">
        <Link to={-1}>
        <button> <AiOutlineRollback/>Back</button>
        </Link>
        <div className="wrapper" data-aos="zoom-in">
            <div className="poke-detail">
                <div className="detail-left">
               
                <img src={pokemonData.sprites.front_default ?? pokemonData.sprites.front_shiny ?? "path/to/assets/imagenotfound.png"} alt={pokemonData.name} className='front' /> 
                <img src={pokemonData.sprites.back_default ?? pokemonData.sprites.back_shiny ?? "path/to/assets/imagenotfound"} alt={pokemonData.name} className='back' />
                </div>
                <div className="detail-right">
                <p>NAME : {pokemonData.name.toUpperCase()}</p>
                <p className='ability'>ABILITY :{pokemonData.abilities.map((item) => (
        <div>
        {item.ability.name.toUpperCase()}&nbsp;
        </div>
      ))}</p>
      <p>HEIGHT : {pokemonData.height /10} METERS</p>
      <p>SPECIES : {pokemonData.species.name.toUpperCase()}</p>
                </div>
            </div>
            <hr />
            <div className="poke-chart">
            <Bar options={options} data={chartDataConfig} className='horizontal-bar' />
            </div>
     
        </div>
    </div>
  );
};

export default Detail;
