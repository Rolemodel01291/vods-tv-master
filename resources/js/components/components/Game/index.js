import React from 'react'
import defaultImg from '../../assets/streamer.png'
import { StyledP } from './style'
import { useHistory } from "react-router-dom";

const Game = (props) => {
  const { game } = props
  let history = useHistory()

  // thumb url convert
  const imgUrlConvert = (url) => {
    let string = url.replace('{width}', '136')
    string = string.replace('{height}', '190')
    return (game.box_art_url !== "") ? string : defaultImg
  }

  const goVods = (name) => {
    history.push(`/twitch/games/${name}`)
  }

  return (
    <div className="col-sm-4 col-md-3 col-lg-2 mb-3" style={{ cursor: "pointer" }} onClick={() => goVods(game.name)}>
      <div>
        <img src={imgUrlConvert(game.box_art_url)} className="rounded w-100" />
      </div>
      <StyledP>&nbsp;{game.name}</StyledP>
    </div>
  )
}

export default Game