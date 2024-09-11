import React from 'react'
import './Video.css'
import PlayVideo from '../../Components/PlayVideo/PlayVideo.jsx'
import Recommended from '../../Components/Recommended/Recommended.jsx'
import { useParams } from 'react-router-dom'
const Video = () => {
  const {categoryId,videoId}=useParams()
  
  return (
    <div className='play-container'>
      <PlayVideo categoryId={categoryId} videoId={videoId}/>
      <Recommended categoryId={categoryId}/>
    </div>
  )
}

export default Video
