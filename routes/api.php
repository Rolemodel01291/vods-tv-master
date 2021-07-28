<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ApiController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::post('validatetoken', [ApiController::class, 'validateToken']);
Route::post('getToken', [ApiController::class, 'getToken']);
Route::post('getStreamers', [ApiController::class, 'getStreamers']);
Route::post('getLatest', [ApiController::class, 'getLatest']);
Route::post('getVods', [ApiController::class, 'getVods']);
Route::post('getStreamerVods', [ApiController::class, 'getStreamerVods']);
Route::post('getVodbyId', [ApiController::class, 'getVodbyId']);
Route::post('getStreambyUserName', [ApiController::class, 'getStreambyUserName']);
Route::post('getGameByGameName', [ApiController::class, 'getGameByGameName']);
Route::post('getVideosByGameId', [ApiController::class, 'getVideosByGameId']);
Route::post('getVideosByUserId', [ApiController::class, 'getVideosByUserId']);
Route::post('getGamesTop', [ApiController::class, 'getGamesTop']);
Route::post('getTopClips', [ApiController::class, 'getTopClips']);