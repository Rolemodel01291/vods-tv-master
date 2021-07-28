import React, { useEffect, useState } from 'react';
import { getToken,checkToken } from '../rest/api'
import moment from 'moment'
import { PageLoading } from './Loading'

export default function ErrorBoundary(props) {
  const enableToken = localStorage.getItem("twitchToken", null);
  const [isToken, setIsToken] = useState(false)
  const { children } = props;

  // Get Token Info
  const getTokenInfo = () => {
    const credentials = {
      client_secret: '8t40rnvm08p6tu3pt406v6gkqcl1ws',
      grant_type: 'client_credentials',
      client_id: 'd6cffgyp1eia4eyr2askmkc0so7u24'
    }
    getToken(credentials)
      .then(data => {
        const res = JSON.parse(data)
        let expireDay = setDate(res['expires_in'])
        let date = new Date(); // Now
        date.setDate(date.getDate() + expireDay); // Set now + 30 days as the new date
        let __endTime = moment(date).format();
        const obj = {
          token: res['access_token'],
          expire: __endTime
        }
        localStorage.setItem('twitchToken', JSON.stringify(obj))
        setIsToken(true)
      })
      .catch(error => console.log(JSON.stringify(error)));
  }

  // Get expire day
  const setDate = (expire) => {
    let day = expire / 216000;
    return parseInt(day)
  }

  useEffect(() => {
    if (!enableToken) {
      getTokenInfo()
    } else {
      let expireDate = JSON.parse(localStorage.getItem('twitchToken'))['expire']
      let currentTime = moment(new Date()).format();
      let expireTime = moment(expireDate).format();
      let __duration = moment.duration(moment(expireTime).diff(currentTime));
        const credentials = {
      token: JSON.parse(localStorage.getItem('twitchToken'))['token'] 
         }
      checkToken(credentials).then(data =>{
        let tokenstatus=JSON.parse(data);
      console.log("tokencheck",tokenstatus);
      if (typeof tokenstatus.message !== 'undefined'&&tokenstatus.message=="invalid access token") {
        getTokenInfo()
      } else {
        setIsToken(true)
      }
      });

    }
  }, [enableToken])


  return (
    <>{isToken ? children : <PageLoading />}</>
  );
}