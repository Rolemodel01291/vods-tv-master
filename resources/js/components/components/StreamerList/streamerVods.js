import React, { useEffect, useState } from 'react'
import ListContent from '../ListContent'
import { getStreamerVods, getStreambyUserName } from '../../rest/api'
import { client_id } from '../../global/twitchInfo'
import { useParams } from 'react-router-dom'
import { Loading } from '../../global/Loading'

const StreamerVods = () => {
  const [vods, setVods] = useState([])
  const [queryAfter, setQueryAfter] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [userId, setUserId] = useState('')
  const [title, setTitle] = useState('')
  const { name } = useParams();
  const auth_token = JSON.parse(localStorage.getItem('twitchToken'))['token']

  useEffect(() => {
    window.scrollTo(0, 0)
    if (name === undefined) return;
    getUserInfo()
  }, [name])

  useEffect(() => {
    if (userId === '') return;
    getVideos();
  }, [userId])

  // Get Videos when detectiong to scroll bottom
  useEffect(() => {
    const handleScroll = () => {
      if (queryAfter !== 'noData' && vods.length > 0 && (window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        setIsLoading(true)
        getVideos()
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [vods, queryAfter])

  // Get userInfo from user_name
  const getUserInfo = () => {
    const params = {
      auth: auth_token,
      client_id: client_id,
      user_name: name
    }
    getStreambyUserName(params)
      .then(data => {
        if (data && data['data'].length > 0) {
          setUserId(data['data'][0].id)
          setTitle(data['data'][0].display_name)
        }
      })
      .catch(error => console.log(JSON.stringify(error)));
  }

  // Get Videos from streamer id
  const getVideos = () => {
    const params = {
      auth: auth_token,
      client_id: client_id,
      user_id: userId,
      after: queryAfter
    }
    getStreamerVods(params)
      .then(data => {
        const res = JSON.parse(data)
        setVods(vods.slice().concat(res['data']))
        setQueryAfter(res['pagination'].cursor || 'noData')
        setIsLoading(false)
      })
      .catch(error => console.log(JSON.stringify(error)));
  }

  return (
    <>
      <ListContent vods={vods} filter={false} title={title} />
      { isLoading && <Loading />}
    </>
  )
}

export default StreamerVods