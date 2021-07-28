import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { VideoPlayer, PlayerSection, StyledSmall, UserSection } from './style'
import { getVodbyId } from '../../rest/api'
import HistoryRoundedIcon from '@material-ui/icons/HistoryRounded';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import moment from 'moment'
import { client_id } from '../../global/twitchInfo'
import { SkelePlayerLoading } from '../../global/skleton'
import { useHistory } from "react-router-dom";

const Player = () => {
  let history = useHistory()
  const { video_id } = useParams();
  const [vod, setVod] = useState({})
  const auth_token = JSON.parse(localStorage.getItem('twitchToken'))['token']

  useEffect(() => {
    if (video_id !== undefined) {
      const params = {
        auth: auth_token,
        client_id: client_id,
        id: video_id
      }
      getVodbyId(params)
        .then(data => {
          setVod(JSON.parse(data)['data'][0])
        })
        .catch(error => console.log(JSON.stringify(error)));
    }
  }, [video_id])

  // calculation created time
  const calculationTime = (published_at) => {
    if (published_at === null) return 'time ago'
    let __startTime = moment(published_at).format();
    let __endTime = moment(new Date()).format();
    let __duration = moment.duration(moment(__endTime).diff(__startTime));
    let __hours = __duration.asHours();
    let duration = (__hours < 24) ? (__hours < 1 ? `${parseInt(60 * __hours)}m` : `${parseInt(__hours)}h`) : `${parseInt(__hours / 24)}d`
    return `${duration} ago`
  }

  const goVods = (user_name) => {
    history.push(`/twitch/streamer/${user_name}`)
  }

  return (
    <div className="container">
      {
        Object.keys(vod).length > 0 ?
          <PlayerSection>
            <VideoPlayer>
              <iframe
                src={`https://player.twitch.tv/?video=v${vod.id}&parent=http://localhost`}
                height="100%"
                width="100%"
                allowFullScreen={true}>
              </iframe>
            </VideoPlayer>
            <div className="mt-2 mb-2">
              <h4>{vod.title}</h4>
            </div>
            <div className="d-flex">
              <UserSection onClick={() => goVods(vod.user_name)}><AccountCircleRoundedIcon /><span className="ml-1">{vod.user_name}</span></UserSection>
              <StyledSmall><HistoryRoundedIcon /><span className="ml-1">{calculationTime(vod.published_at)}</span></StyledSmall>
              <StyledSmall><AccessTimeIcon /><span className="ml-1">{vod.duration}</span></StyledSmall>
            </div>
          </PlayerSection> :
          <SkelePlayerLoading />
      }
    </div>
  )
}

export default Player