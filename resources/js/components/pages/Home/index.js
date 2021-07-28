import React, { useEffect, useState } from 'react'
import ListContent from '../../components/ListContent'
import { getLatest } from '../../rest/api'
import { client_id } from '../../global/twitchInfo'
import { Loading } from '../../global/Loading'

const Home = () => {
  const [vods, setVods] = useState([])
  const [queryAfter, setQueryAfter] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const auth_token = JSON.parse(localStorage.getItem('twitchToken'))['token']

  useEffect(() => {
    window.scrollTo(0, 0)
    getTopVods()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if ((queryAfter && window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        setIsLoading(true)
        getTopVods()
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [vods, queryAfter])

  // Get streamersList
  const getTopVods = () => {
    const params = {
      auth: auth_token,
      client_id: client_id,
      after: queryAfter,
      first: 5
    }
    getLatest(params)
      .then(data => {
        const res = JSON.parse(data)
        setVods(vods.slice().concat(res['data']))
        setQueryAfter(res['pagination'].cursor || false)
        setIsLoading(false)
      })
      .catch(error => console.log(JSON.stringify(error)));
  }

  return (
    <>
      <ListContent vods={vods} title="Twitch Vods Archive - Trending" />
      { isLoading && <Loading />}
    </>
  )
}

export default Home