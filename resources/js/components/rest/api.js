import axios from 'axios';

axios.defaults.withCredentials = false;
axios.defaults.baseURL = `/`;

// axios.defaults.timeout = 5000;

export const getToken = async (params) => {
  return await axios.post(`/api/getToken`, { params })
    .then(data => data.data)
    .catch(error => { throw error.response.data });
}
export const checkToken = async (params) => {
   return await axios.post(`/api/validatetoken`, { params })
    .then(data => data.data)
    .catch(error => { throw error.response.data });
}

export const getStreamers = async (params) => {
  return await axios.post(`/api/getStreamers`, { params })
    .then(data => data.data)
    .catch(error => { throw error.response.data });
}

export const getLatest = async (params) => {
  return await axios.post(`/api/getLatest`, { params })
    .then(data => data.data)
    .catch(error => { throw error.response.data });
}

export const getVods = async (params) => {
  return await axios.post(`/api/getVods`, { params })
    .then(data => data.data)
    .catch(error => { throw error.response.data });
}

export const getStreamerVods = async (params) => {
  return await axios.post(`/api/getStreamerVods`, { params })
    .then(data => data.data)
    .catch(error => { throw error.response.data });
}

// get video from video Id
export const getVodbyId = async (params) => {
  return await axios.post(`/api/getVodbyId`, { params })
    .then(data => data.data)
    .catch(error => { throw error.response.data });
}

// Get stream from username
export const getStreambyUserName = async (params) => {
  return await axios.post(`/api/getStreambyUserName`, { params })
    .then(data => data.data)
    .catch(error => { throw error.response.data });
}

// Get Game from gamename
export const getGameByGameName = async (params) => {
  return await axios.post(`/api/getGameByGameName`, { params })
    .then(data => data.data)
    .catch(error => { throw error.response.data });
}

// Get Videos from gameId
export const getVideosByGameId = async (params) => {
  return await axios.post(`/api/getVideosByGameId`, { params })
    .then(data => data.data)
    .catch(error => { throw error.response.data });
}

// Get Videos from userId
export const getVideosByUserId = async (params) => {
  return await axios.post(`/api/getVideosByUserId`, { params })
    .then(data => data.data)
    .catch(error => { throw error.response.data });
}

// Get Videos from userId
export const getGamesTop = async (params) => {
  return await axios.post(`/api/getGamesTop`, { params })
    .then(data => data.data)
    .catch(error => { throw error.response.data });
}

// Get Videos from userId
export const getVodsByClip = async (params) => {
  return await axios.post(`/api/getVodsByClip`, { params })
    .then(data => data.data)
    .catch(error => { throw error.response.data });
}

// Get Videos from userId
export const getTopClips = async (params) => {
  return await axios.post(`/api/getTopClips`, { params })
    .then(data => data.data)
    .catch(error => { throw error.response.data });
}
