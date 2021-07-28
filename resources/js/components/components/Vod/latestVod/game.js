import React from 'react'
import defaultImg from '../../../assets/streamer.png'
import { useHistory } from "react-router-dom";
import styled from 'styled-components';

export const StyledP = styled.p`
    color: black;
    font-size: 1.1rem;
    font-weight: bold;
    margin: 5px 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    word-break:break-all;
`;

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
    <div className="col-sm-3 col-md-3 col-lg-3 mb-3" style={{ cursor: "pointer" }} onClick={() => goVods(game.name)}>
      <div className="d-flex align-items-center justify-content-center">
        <img src={imgUrlConvert(game.box_art_url)} className="rounded" />
      </div>
      <StyledP>&nbsp;{game.name}</StyledP>
    </div>
  )
}

export default Game