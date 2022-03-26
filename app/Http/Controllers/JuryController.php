<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\IndicatorCriteria;
use App\Models\Period;
use App\Models\Submission;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Modules\Membership\Member;
use stdClass;

class JuryController extends Controller
{
    public function index(Request $request, Submission $todos)
    {
        $todos = $todos->with([
            'user.village',
            'period'
        ]);
        $todos = $todos->where('publish', 1);
        $todos = $todos->whereDoesntHave('jurySubmissions', function ($query) use ($request) {
            $query->where('jury_id', $request->user()->jury->id);
        })->get();
        return Inertia::render('UserSubmission', [
            'todos' => $todos
        ]);
    }

    public function show(Request $request, Submission $submission)
    {
        $indicators = $submission->indicators->map(function ($indicator) {
            $pivot = $indicator->pivot->load([
                'juryValues' => function ($query) {
                    $query->where('jury_id', auth()->user()->jury->id ?? null);
                }
            ]);
            $juryValues = collect(collect($pivot)->get('jury_values'))->first();
            $juryValues = $juryValues ?? ['point' => null];
            $juryValues = (object)($juryValues);
            return collect($indicator->load('inputs'))->merge([
                'jury_values' => $juryValues
            ]);
        });
        $indicators = collect($indicators)->groupBy('indicator_criteria_id')->all();
        $categories = IndicatorCriteria::all();
        $steps      = $categories->map(function ($category) {
            return [
                'id' => $category->id,
                'title' => "Step {$category->id}",
                'subtitle' => $category->name,
                'active' => $category->id === 1
            ];
        });
        return Inertia::render('JudgingForm', [
            'indicators' => $indicators,
            'submission' => $submission,
            'steps' => $steps,
            'village' => $submission->user->village ?? null
        ]);
    }

    public function update(Request $request, Member $member)
    {
        $member->update($request->except('email'));
        if ($request->filled('email')) {
            $member->user->email = $request->email;
            $member->user->save();
        }
        return redirect()->route('dashboard')->with([
            'success' => 'Success! Profile is stored'
        ]);
    }
}
