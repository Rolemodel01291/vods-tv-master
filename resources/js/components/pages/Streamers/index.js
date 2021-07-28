import React, { useEffect, useState } from 'react'
import { getStreamers } from '../../rest/api'
import { client_id } from '../../global/twitchInfo'
import StreamerList from '../../components/StreamerList'
import { Loading } from '../../global/Loading'

const Streamers = () => {
  const [streamers, setStreamers] = useState([])
  const [queryAfter, setQueryAfter] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const auth_token = JSON.parse(localStorage.getItem('twitchToken'))['token']

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  
  useEffect(() => {
    getStreamersList()
  }, [auth_token])

  useEffect(() => {
    const handleScroll = () => {
      if ((queryAfter && window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        setIsLoading(true)
        getStreamersList()
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [streamers, queryAfter])

  // Get streamersList
  const getStreamersList = () => {
    const params = {
      auth: auth_token,
      client_id: client_id,
      after: queryAfter,
      first: 80
    }
    getStreamers(params)
      .then(data => {
        const res = JSON.parse(data)
        setStreamers(streamers.slice().concat(res['data']))
        setQueryAfter(res['pagination'].cursor || false)
        setIsLoading(false)
      })
      .catch(error => console.log(JSON.stringify(error)));
  }

  return (
    <>
      <StreamerList streamers={streamers} />
      {
        isLoading && <Loading />
      }

    </>
  )
}

export default Streamers