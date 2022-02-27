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
        if (!$user->membership()->count()) {
            $user->membership()->create([
                'uuid' => Str::uuid()
            ]);
            return redirect()->route('dashboard');
        }
        $user = collect($user);
        $provinces = json_decode(File::get(resource_path('json/provinces.json')));
        return Inertia::render('Dashboard', [
            'membership' => $user->get('membership'),
            'village' => $user->get('village'),
            'provinces' => $provinces,
            'title' => $request->user()->role->name === 'jury' ? 'Data Diri Jury' : 'Data Kelurahan',
            'jury' => $user->get('jury')
        ]);
    }

    public function uploads(Request $request)
    {
        $user = $request->user()->load(['membership.identities', 'village']);
        return Inertia::render('DashboardUploads', [
            'membership' => $user->membership,
            'village' => $user->village,
            'title' => 'Upload Dokumen'
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
        return Inertia::render('Submission', [
            'submissions' => $submissions,
            'title' => 'Join Red Metric'
        ]);
    }

    public function download()
    {
        return response()->download(resource_path('docs/surat-pernyataan-peserta-red-metric.pdf'));
    }
}
