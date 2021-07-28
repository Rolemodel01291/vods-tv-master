import React, { useEffect, useState } from 'react'
import ListContent from '../../components/ListContent'
import { getGameByGameName, getVideosByGameId } from '../../rest/api'
import { client_id } from '../../global/twitchInfo'
import { useParams } from 'react-router-dom'
import { Loading } from '../../global/Loading'

const StreamerVods = () => {
  const [vods, setVods] = useState([])
  const [queryAfter, setQueryAfter] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [gameId, setGameId] = useState('')
  const [title, setTitle] = useState('')
  const { name } = useParams();
  const auth_token = JSON.parse(localStorage.getItem('twitchToken'))['token']

  useEffect(() => {
    window.scrollTo(0, 0)
    if (name === undefined) return;
    getGameInfo()
  }, [name])

  useEffect(() => {
    if (gameId === '') return;
    getVideos();
  }, [gameId])

  // Get Videos when detectiong to scroll bottom
  useEffect(() => {
    const handleScroll = () => {
      if (queryAfter && vods.length > 0 && (window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        setIsLoading(true)
        getVideos()
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [vods, queryAfter])

  // Get GameInfo from game name
  const getGameInfo = () => {
    const params = {
      auth: auth_token,
      client_id: client_id,
      game_name: name
    }
    getGameByGameName(params)
      .then(data => {
        if (data && data['data'].length > 0) {
          setGameId(data['data'][0].id)
          setTitle(data['data'][0].name)
        }
      })
      .catch(error => console.log(JSON.stringify(error)));
  }

  // Get Videos from streamer id
  const getVideos = () => {
    const params = {
      auth: auth_token,
      client_id: client_id,
      game_id: gameId,
      after: queryAfter
    }
    getVideosByGameId(params)
      .then(data => {
        const res = JSON.parse(data)
        if(!res.error) {
          setVods(vods.slice().concat(res['data']))
          setQueryAfter(res['pagination'].cursor || false)
        } else {
          setQueryAfter(false)
        }
        setIsLoading(false)
      })
      .catch(error => console.log(JSON.stringify(error)));
  }

  useEffect(() => {
    console.log(queryAfter)
  }, [queryAfter])

  return (
    <>
      <ListContent vods={vods} filter={false} title={title} />
      { isLoading && <Loading />}
    </>
  )
}

export default StreamerVods