<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\WelcomeController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\JuryController;
use App\Http\Controllers\JuryJudgingController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SubmissionController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [WelcomeController::class, 'index'])->name('welcome');
Route::get('/about-us', [WelcomeController::class, 'about'])->name('about-us');
Route::get('/news', [WelcomeController::class, 'news'])->name('news');
Route::get('/news/{post}/read', [WelcomeController::class, 'read'])->name('news.read');
Route::group(['prefix' => 'dashboard', 'middleware' => ['auth', 'verified']], function () {
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/uploads', [DashboardController::class, 'uploads'])->name('dashboard.uploads');
    Route::get('/submission', [DashboardController::class, 'submission'])->name('dashboard.submission');
    Route::get('/destroy-alert', [DashboardController::class, 'destroyAlert'])->name('dashboard.destroy-alert');
    Route::get('/download', [DashboardController::class, 'download'])->name('dashboard.download');

    Route::get('/profile', [ProfileController::class, 'form'])->name('dashboard.profile.form');
    Route::post('/profile', [ProfileController::class, 'store'])->name('dashboard.profile.store');
    Route::put('/profile/{village}', [ProfileController::class, 'update'])->name('dashboard.profile.update');
    Route::post('/profile/{membership}/upload', [ProfileController::class, 'upload'])->name('dashboard.profile.upload');
    Route::get('/profile/{identity}/preview', [ProfileController::class, 'preview'])->name('dashboard.profile.preview');

    Route::get('/submission/{period}/form/{page}', [SubmissionController::class, 'form'])->name('dashboard.user.submission.form');
    Route::post('/submission/{period}/form/{page}', [SubmissionController::class, 'store'])->name('dashboard.user.submission.store');
    Route::put('/submission/{period}/publish', [SubmissionController::class, 'publish'])->name('dashboard.user.submission.publish');
    Route::put('/submission/{period}/upload', [SubmissionController::class, 'upload'])->name('dashboard.user.submission.upload');
    
    Route::put('/jury/{member}', [JuryController::class, 'update'])->name('dashboard.jury.update');
    Route::get('/jury', [JuryController::class, 'index'])->name('dashboard.jury.index');
    Route::get('/jury/{submission}', [JuryController::class, 'show'])->name('dashboard.jury.show');
    Route::post('/jury/{submission}/judging', [JuryJudgingController::class, 'store'])->name('dashboard.jury.judging.store');
    Route::get('/jury/{submission}/publish', [JuryJudgingController::class, 'publish'])->name('dashboard.jury.judging.publish');
});

require __DIR__ . '/auth.php';


Route::group(['prefix' => 'admin'], function () {
    Voyager::routes();
});
