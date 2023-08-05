import React from 'react'
import "./DarkMode.scss"
import {BsFillSunFill, BsFillMoonFill} from "react-icons/bs"

const DarkMode = () => {

    const setDarkMode = () => {
        document.querySelector("body").setAttribute("data-theme", "dark")
    }
    const setLightMode = () => {
        document.querySelector("body").setAttribute("data-theme", "light")
    }

    const handleToggle = (e) => {
        if(e.target.checked) {
            setDarkMode()
        } else {setLightMode()}
    }



  return (
    <div className='dark_mode'>
        <div className="input_wrapper">
        <input type="checkbox" className='dark_mode_input' id='darkmode-toggle' onChange={handleToggle} />
        <label className='dark_mode_label' for="darkmode-toggle">
            <BsFillSunFill className='dark_mode_logo1' />
            <BsFillMoonFill className='dark_mode_logo2' />
        </label>
        </div>
    </div>
  )
}

export default DarkMode