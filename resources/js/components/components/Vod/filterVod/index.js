import React from 'react'
import { StyledP, StyledSmall, StyledSpan, UserSection } from './style'
import HistoryRoundedIcon from '@material-ui/icons/HistoryRounded';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import moment from 'moment'
import defaultImg from '../../../assets/defaultImg.jpg'
import { useHistory } from "react-router-dom";

const FilterVod = (props) => {
  const { vod, title } = props
  let history = useHistory()

  // thumb url convert
  const imgUrlConvert = (url) => {
    let string = url.replace('{width}', '500')
    string = string.replace('{height}', '280')
    return (vod.thumbnail_url !== "") ? string : defaultImg
  }

  // calculation created time
  const calculationTime = (published_at) => {
    let __startTime = moment(published_at).format();
    let __endTime = moment(new Date()).format();
    let __duration = moment.duration(moment(__endTime).diff(__startTime));
    let __hours = __duration.asHours();
    let duration = (__hours < 24) ? (__hours < 1 ? `${parseInt(60 * __hours)}m` : `${parseInt(__hours)}h`) : `${parseInt(__hours / 24)}d`
    return `${duration} ago`
  }

  // calculation duration
  const calculationDuration = (duration) => {
    let d = Number(duration);
    let h = Math.floor(d / 3600);
    let m = Math.floor(d % 3600 / 60);
    let s = Math.floor(d % 3600 % 60);

    let hDisplay = h > 0 ? h + "h" : "";
    let mDisplay = m > 0 ? m + "m" : "";
    let sDisplay = s > 0 ? s + "s" : "";
    return hDisplay + mDisplay + sDisplay;
  }

  // go to video player
  const player = (id) => {
    let videoId = id.replace('v', '')
    history.push(`/twitch/video/${videoId}`)
  }

  const showVideoList = (username) => {
    history.push(`/twitch/streamer/${username}`)
  }

  return (
    <div className="col-sm-6 col-md-4 col-lg-3 mb-3">
      <div className="position-relative" style={{ cursor: "pointer" }} onClick={() => player(vod._id)}>
        <img src={imgUrlConvert(vod['preview'].template)} className="rounded w-100" />
        {title === "Most viewed" && <StyledSpan>{vod.views} views</StyledSpan>}
      </div>
      <div>
        <StyledP>{vod.title}</StyledP>
        <div className="d-flex flex-wrap">
          <UserSection onClick={() => showVideoList(vod['channel'].name)}><AccountCircleRoundedIcon /><span className="ml-1">{vod['channel'].name}</span></UserSection>
          <StyledSmall><HistoryRoundedIcon /><span className="ml-1">{calculationTime(vod.published_at)}</span></StyledSmall>
          <StyledSmall><AccessTimeIcon /><span className="ml-1">{calculationDuration(vod.length)}</span></StyledSmall>
        </div>
      </div>
    </div>
  )
}

export default FilterVod