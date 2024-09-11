import React,{useEffect, useState} from 'react'
import { Link, useParams } from 'react-router-dom';

import './Recommended.css'
import { API_KEY, value_counter } from '../../data';
import moment from 'moment';

const Recommended = () => {
	const {categoryId}=useParams()
	const [apiData,setApiData]=useState([]);
	
	
	const fetchData=async()=>{
		const relatedVideo_url=`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=IN&videoCategoryId=${categoryId}&key=${API_KEY}`
		await fetch(relatedVideo_url).then(res=>res.json()).then(data=>setApiData(data.items))

	}
	useEffect(()=>{
		fetchData()
	},[]) 
	return (
		<div className='recommended'>
			{apiData.map((item,index)=>{
				return(
					<Link to={`/video/${item.snippet.categoryId}/${item.id}`} key={index} className="side-video-list">
					<img src={item.snippet.thumbnails.medium.url} alt="" />
					<div className="vid-info">
						<h4>{item.snippet.title}</h4>
						<p>{item.channelTitle}</p>
						<p>{value_counter(item.statistics.viewCount)} view &bull;{ moment(item.snippet.publishedAt).fromNow()}</p>
					</div>
				</Link>
				)
			})}
			
			
		</div>
	)
}

export default Recommended
