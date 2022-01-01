<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use TCG\Voyager\Models\Post;

class WelcomeController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('Welcome', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
            'appName' => config('app.name')
        ]);
    }

    public function about(Request $request)
    {
        return Inertia::render('About', [
            'appName' => config('app.name')
        ]);
    }

    public function news(Request $request, Post $posts)
    {
        $posts = $posts->published()->orderBy('created_at', 'DESC')->get();
        return Inertia::render('News', [
            'posts' => $posts,
            'appName' => config('app.name')
        ]);
    }

    public function read(Post $post)
    {
        return Inertia::render('NewsItem', [
            'post' => $post,
            'appName' => config('app.name')
        ]);
    }
}
