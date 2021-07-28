import React from 'react'
import Game from './Game'
import Vod from './Vod'
const LatestVod = (props) => {
  const { data } = props

  return (
    <div className="row">
      <Game game={data['game']} />
      {
        data && data['vod'].length > 0 && data['vod'].map((item, i) => (
          <Vod vod={item} key={i} />
        ))
      }
    </div>
  )
}

export default LatestVod