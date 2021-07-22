<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:api')
    ->namespace('App\Http\Controllers\Api')
    ->prefix('user')
    ->group(function () {
        Route::apiResource('submissions', 'SubmissionApiController', ['names' => 'api.user.submission']);
        Route::apiResource('villages', 'VillageApiController', ['names' => 'api.user.villages']);
    });
Route::middleware('auth:api')
    ->namespace('App\Http\Controllers\Api')
    ->prefix('admin')
    ->group(function () {
        Route::apiResource('users', 'UserApiController', ['names' => 'api.admin.users']);
    });
