import React, { useEffect, useState } from 'react'
import GameContent from './gameContent'
import { getGamesTop } from '../../rest/api'
import { client_id } from '../../global/twitchInfo'
import { Loading } from '../../global/Loading'

const GamePage = () => {
  const [games, setGames] = useState([])
  const [queryAfter, setQueryAfter] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const auth_token = JSON.parse(localStorage.getItem('twitchToken'))['token']

  useEffect(() => {
    window.scrollTo(0, 0)
    getGamesList()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if ((queryAfter && window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        setIsLoading(true)
        getGamesList()
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [games, queryAfter])

  // Get streamersList
  const getGamesList = () => {
    const params = {
      auth: auth_token,
      client_id: client_id,
      after: queryAfter,
      first: 80
    }
    getGamesTop(params)
      .then(data => {
        const res = JSON.parse(data)
        setGames(games.slice().concat(res['data']))
        setQueryAfter(res['pagination'].cursor || false)
        setIsLoading(false)
      })
      .catch(error => console.log(JSON.stringify(error)));
  }

  return (
    <>
      <GameContent games={games} />
      { isLoading && <Loading />}
    </>
  )
}

export default GamePage