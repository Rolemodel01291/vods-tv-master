import React from 'react'
import { PageTitleSection } from './style'
import Game from '../../components/Game'
import { SkeleGameListLoading } from '../../global/skleton'
import { Helmet } from 'react-helmet';

const Content = (props) => {
  const { games } = props

  return (
    <div className="container">
      <PageTitleSection>
      <h1>Trending Twitch Vods By Games</h1>
       </PageTitleSection>
      <div className="mt-3">
      </div>
      <div className="mt-3">
        <div className="row">
          {
            games.length > 0 ? games.map((game, i) => (
              <Game game={game} key={i} />
            )) :
              [...Array(12)].map((item, i) => (
                <SkeleGameListLoading key={i} />
              ))
          }
        </div>
      </div>
    </div>
  )
}

export default Content