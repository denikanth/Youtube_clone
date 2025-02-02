import React, { useState } from 'react'
import SideBar from '../../Components/SideBar/SideBar.jsx'
import './Home.css'
import Feed from '../../Components/Feed/Feed.jsx'
const Home = ({sidebar}) => {

  const [category,setCategory]=useState(0)
  return (
    <>
      <SideBar sidebar={sidebar} category={category} setCategory={setCategory}/>
      <div className={`container ${sidebar?'':'large-container'}`}>
        <Feed category={category}/>
      </div>
    </>
  )
}

export default Home
