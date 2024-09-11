import React, { useEffect, useState } from 'react'

import video from '../../assets/video.mp4'

import like from '../../assets/like.png'
import dislike from '../../assets/dislike.png'
import share from '../../assets/share.png'
import save from '../../assets/save.png'
import jack from '../../assets/jack.png'
import user_profile from '../../assets/user_profile.jpg'
import './PlayVideo.css'
import { API_KEY, value_counter } from '../../data'
import moment from 'moment'
import { useParams } from 'react-router-dom'
const PlayVideo = () => {
	const {videoId}=useParams()
	const [apiData, setApiData] = useState(null);
	const [channelData, setChannelData] = useState(null)
	const [commentData, setCommentData] = useState([])
	const fetchVideoData = async () => {
		//fetching video information
		const video_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`
		await fetch(video_url).then(res => res.json()).then(data => setApiData(data.items[0]))
		
	}
	const fetchOtherData = async () => {
		//fetch channel data
		const channelDetails_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY} `
		await fetch(channelDetails_url).then(res => res.json()).then(data => setChannelData(data.items[0]))

		//fetching comment data
		const commentDetails_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId=${videoId}&key=${API_KEY}`
		await fetch(commentDetails_url).then(res => res.json()).then(data => setCommentData(data.items))
		console.log(commentData)
	}   
	useEffect(() => {
		fetchVideoData();
	}
	, [videoId]);

	useEffect(() => {
		fetchOtherData();
	}
		, [apiData]);
	return (
		<div className='play-video'>
			{/*<video src={leo} controls autoPlay muted={false} tabIndex="LEO" ></video>*/}
			<iframe src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
			<h3>{apiData ? apiData.snippet.title : "title here"}</h3>
			<div className="play-video-info">
				<p>{apiData ? value_counter(apiData.statistics.viewCount) : "16K"} views &bull;{apiData ? moment(apiData.snippet.publishedAt).fromNow() : ""}</p>
				<div>
					<span > <img src={like} alt="" />{apiData ? value_counter(apiData.statistics.likeCount) : "23K"}</span>
					<span > <img src={dislike} alt="" /></span>
					<span > <img src={share} alt="" />Share</span>
					<span > <img src={save} alt="" />save</span>

				</div>

			</div>
			<hr />
			<div className="publisher">
				<img src={channelData ? channelData.snippet.thumbnails.medium.url : ""} alt="" />
				<div>
					<p>{apiData ? apiData.snippet.channelTitle : ""}</p>
					<span>{channelData ? value_counter(channelData.statistics.subscriberCount) : ""} Subscribers</span>
				</div>
				<button>Subsribe</button>
			</div>
			<div className="vid-description">
				<p>{apiData ? apiData.snippet.description.slice(0, 350) : "Description Here!!!"}</p>
				<hr />
				<h4>{apiData ? value_counter(apiData.statistics.commentCount) : "10K"} Comments</h4>

				{commentData.map((item, index) => {
					return (
						<div key={index} className="comment">
							<img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="" />
							<div>
								<h3>{item.snippet.topLevelComment.snippet.authorDisplayName}<span>2 days ago</span></h3>
								<p>{item.snippet.topLevelComment.snippet.textDisplay}</p>
								<div className="comment-action">
									<img src={like} alt="" />
									<span>{value_counter(item.snippet.topLevelComment.snippet.likeCount)}</span>
									<img src={dislike} alt="" />
								</div>
							</div>
						</div>
					)
				})}


			</div>
		</div >
	)
}

export default PlayVideo
