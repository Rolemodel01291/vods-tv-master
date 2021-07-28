<?php

namespace App\Http\Controllers;
use stdClass;
use Illuminate\Http\Request;

class ApiController extends Controller
{

    // Validate access token
    private function validationToken($token)
    {
        $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_URL => "https://id.twitch.tv/oauth2/validate",
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_HTTPGET => TRUE,
            CURLOPT_HTTPHEADER => array(
                'Content-Type: application/json',
                "Authorization: Bearer ".$token,
            ),
        ));
        $response = curl_exec($curl);
        curl_close($curl);
    }
    // Validate access token
    public function validateToken(Request $request)
    {
        $data=$request->params;
        $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_URL => "https://id.twitch.tv/oauth2/validate",
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_HTTPGET => TRUE,
            CURLOPT_HTTPHEADER => array(
                'Content-Type: application/json',
                "Authorization: Bearer ".$data['token'],
            ),
        ));
        $response = curl_exec($curl);
        curl_close($curl);
        return response()->json($response);
    }

    // Get Token Information from client_id, client_secret
    public function getToken(Request $request)
    {
        $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_URL => "https://id.twitch.tv/oauth2/token",
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_POST => TRUE,
            CURLOPT_POSTFIELDS => json_encode($request->params),
            CURLOPT_HTTPHEADER => array(
                'Content-Type: application/json',
            ),
        ));

        $response = curl_exec($curl);
        curl_close($curl);
        return response()->json($response);
    }
    
    // Get Streamers
    public function getStreamers(Request $request)
    {
        // $this->validationToken($request->params['auth']);
        $response = $this->streamers(
            $request->params['auth'],
            $request->params['client_id'],
            $request->params['after'],
            $request->params['first']
        );
        return response()->json($response);
    }

    // Get Streamers Information from access_Token, Client-Id
    private function streamers($auth, $client_id, $after, $first)
    {
        $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_URL => "https://api.twitch.tv/helix/streams?first=".$first."&after=".$after,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_HTTPGET => TRUE,
            CURLOPT_HTTPHEADER => array(
                'Content-Type: application/json',
                "Authorization: Bearer ".$auth,
                'Client-Id: '.$client_id
            ),
        ));

        $response = curl_exec($curl);
        curl_close($curl);
        return $response;
    }

    // Get Streamer Viodes
    public function getStreamerVods(Request $request)
    {
        $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_URL => "https://api.twitch.tv/helix/videos?first=20&user_id=".$request->params['user_id']."&after=".$request->params['after'],
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_HTTPGET => TRUE,
            CURLOPT_HTTPHEADER => array(
                'Content-Type: application/json',
                "Authorization: Bearer ".$request->params['auth'],
                'Client-Id: '.$request->params['client_id']
            ),
        ));
        $response = curl_exec($curl);
        curl_close($curl);
        return response()->json($response);
    }

    public function getVods(Request $request)
    {
        $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_URL => "https://api.twitch.tv/kraken/videos/top?limit=20&offset=".$request->params['offset'],
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_HTTPGET => TRUE,
            CURLOPT_HTTPHEADER => array(
                'Content-Type: application/json',
                "Accept: application/vnd.twitchtv.v5+json",
                'Client-Id: '.$request->params['client_id']
            ),
        ));

        $response = curl_exec($curl);
        curl_close($curl);
        return response()->json($response);
    }
    
    // Get video from streamerId with Latest, most viewed, longest
    public function getVideosByUserId(Request $request)
    {
        $data = $this->streamers(
            $request->params['auth'],
            $request->params['client_id'],
            $request->params['after'],
            $request->params['first']
        );
        $streamers = json_decode($data, true);
        $emptyArray = array();
        $result = array();
        $curl = curl_init();
        foreach ($streamers['data'] as $streamer) {
            curl_setopt_array($curl, array(
            CURLOPT_URL => "https://api.twitch.tv/helix/videos?user_id=".$streamer['user_id'],
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_HTTPGET => TRUE,
            CURLOPT_HTTPHEADER => array(
                'Content-Type: application/json',
                "Authorization: Bearer ".$request->params['auth'],
                'Client-Id: '.$request->params['client_id']
            ),
            ));
            $response = curl_exec($curl);
            if(count(json_decode($response, true)['data']) == 0) continue;
            $emptyArray = array_merge($emptyArray, json_decode($response, true)['data']);
        }
        curl_close($curl);
        $result['data'] = $emptyArray;
        $result['page'] = $streamers['pagination'];
        return response()->json(json_encode($result));
    }

    // Get video from video Id
    public function getVodbyId(Request $request)
    {
        $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_URL => "https://api.twitch.tv/helix/videos?id=".$request->params['id'],
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_HTTPGET => TRUE,
            CURLOPT_HTTPHEADER => array(
                'Content-Type: application/json',
                "Authorization: Bearer ".$request->params['auth'],
                'Client-Id: '.$request->params['client_id']
            ),
        ));

        $response = curl_exec($curl);
        curl_close($curl);
        return response()->json($response);
    }

    // Get Stream from userName
    public function getStreambyUserName(Request $request)
    {
        $user_name = urlencode($request->params['user_name']);
        $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_URL => "https://api.twitch.tv/helix/users?login=".$user_name,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_HTTPGET => TRUE,
            CURLOPT_HTTPHEADER => array(
                'Content-Type: application/json',
                "Authorization: Bearer ".$request->params['auth'],
                'Client-Id: '.$request->params['client_id']
            ),
        ));

        $response = curl_exec($curl);
        curl_close($curl);
        return $response;
    }

    // Get Game from gamename
    public function getGameByGameName(Request $request)
    {
        $game_name = urlencode($request->params['game_name']);
        $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_URL => "https://api.twitch.tv/helix/games?name=".$game_name,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_HTTPGET => TRUE,
            CURLOPT_HTTPHEADER => array(
                'Content-Type: application/json',
                "Authorization: Bearer ".$request->params['auth'],
                'Client-Id: '.$request->params['client_id']
            ),
        ));

        $response = curl_exec($curl);
        curl_close($curl);
        return $response;
    }

    // Get Videos from gameId
    public function getVideosByGameId(Request $request)
    {
        $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_URL => "https://api.twitch.tv/helix/videos?period=month&sort=views&first=20&game_id=".$request->params['game_id']."&after=".$request->params['after'],
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_HTTPGET => TRUE,
            CURLOPT_HTTPHEADER => array(
                'Content-Type: application/json',
                "Authorization: Bearer ".$request->params['auth'],
                'Client-Id: '.$request->params['client_id']
            ),
        ));
        $response = curl_exec($curl);
        curl_close($curl);
        return response()->json($response);
    }

    // Get Top Games
    public function getGamesTop(Request $request)
    {
        $response = $this->getGames($request->params['first'], $request->params['after'], $request->params['auth'], $request->params['client_id']);
        return response()->json($response);
    }

    // Get Games
    private function getGames($first, $after, $auth, $client_id) {
        $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_URL => "https://api.twitch.tv/helix/games/top?first=".$first."&after=".$after,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_HTTPGET => TRUE,
            CURLOPT_HTTPHEADER => array(
                'Content-Type: application/json',
                "Authorization: Bearer ".$auth,
                'Client-Id: '.$client_id
            ),
        ));
        $response = curl_exec($curl);
        curl_close($curl);
        return $response;
    }
    // Get Top Clips
    public function getTopClips(Request $request)
    {
        $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_URL => "https://api.twitch.tv/kraken/clips/top?trending=true&limit=25&cursor=".$request->params['after'],
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_HTTPGET => TRUE,
            CURLOPT_HTTPHEADER => array(
                'Content-Type: application/json',
                "Accept:application/vnd.twitchtv.v5+json",
                'Client-Id: '.$request->params['client_id']
            ),
        ));
        $response = curl_exec($curl);
        curl_close($curl);
        return response()->json($response);
    }

    // Get Latest Videos with Game
    public function getLatest(Request $request) {
        $data = $this->getGames($request->params['first'],
                                $request->params['after'],
                                $request->params['auth'],
                                $request->params['client_id']
                                ); //Get GameList

        $games = json_decode($data, true);
        $result = new stdClass();
        $emptyArray  = array();
        $curl = curl_init();
        foreach ($games['data'] as $game) {
            $obj = new stdClass();
            curl_setopt_array($curl, array(
            CURLOPT_URL => "https://api.twitch.tv/helix/videos?sort=views&period=month&first=3&game_id=".$game['id'],
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_HTTPGET => TRUE,
            CURLOPT_HTTPHEADER => array(
                'Content-Type: application/json',
                "Authorization: Bearer ".$request->params['auth'],
                'Client-Id: '.$request->params['client_id']
            ),
            ));
            $response = curl_exec($curl);
            if(count(json_decode($response, true)['data']) == 0) continue;
            $obj->game = $game;
            $obj->vod = json_decode($response, true)['data'];
            array_push($emptyArray, $obj);
        }
        curl_close($curl);
        $result->data = $emptyArray;
        $result->pagination = $games['pagination'];
        return response()->json(json_encode($result));
    }
}