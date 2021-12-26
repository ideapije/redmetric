<?php

namespace App\Http\Controllers;

use App\Models\Period;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Inertia\Inertia;
use Mockery\Matcher\Subset;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user()->load(['membership.identities', 'village']);
        if (!$user->membership) {
            $user->membership()->create([
                'uuid' => Str::uuid()
            ]);
            return redirect()->route('dashboard');
        }
        return Inertia::render('Dashboard', [
            'membership' => $user->membership,
            'village' => $user->village
        ]);
    }

    public function submission(Request $request, Period $periods)
    {
        $periods = $periods
        ->where('is_ended', false)
        ->with([
            'submissions' => function($query) use($request){
                $query->where('user_id', $request->user()->id);
            }
        ])
        ->orderBy('created_at', 'desc')
        ->get();
        $submissions = $periods->map(function($period){
            return collect($period)->merge([
                'submissions' => collect($period->submissions)->first()
            ]);
        });
        return Inertia::render('Submission', ['submissions' => $submissions]);
    }

    public function download()
    {
        return response()->download(resource_path('docs/surat-pernyataan-peserta-red-metric.pdf'));
    }
}
