<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\IndicatorCriteria;
use App\Models\Period;
use App\Models\Submission;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Modules\Membership\Member;

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
        $pivot = $submission->indicators->map(function ($indicator) {
            return $indicator->pivot->load([
                'values',
                'evidence'
            ]);
        });
        $categories     = IndicatorCriteria::with(['indicators.inputs'])->get();
        $questions      = $categories->mapWithKeys(function ($criteria) use ($pivot) {
            $items = $criteria->indicators->map(function ($indicator) {
                return $indicator->inputs->load('indicator');
            })->flatten();
            $items = $items->map(function ($item, $index) use ($pivot) {
                $input      = $pivot->pluck('values')->flatten()->where('indicator_input_id', $item->id)->first();
                $question   = collect($item)->merge([
                    'index' => $index,
                    'value' => $input->value ?? '',
                    'evidence' => $pivot->where('indicator_id', $item->indicator_id)->first()->evidence ?? null,
                    'result' => $pivot->where('indicator_id', $item->indicator_id)->first()->result
                ]);
                return $question;
            });
            return [$criteria->id => $items];
        });
        $steps = $categories->map(function ($category) {
            return [
                'id' => $category->id,
                'title' => "Step {$category->id}",
                'subtitle' => $category->name,
                'active' => $category->id === 1
            ];
        });
        return Inertia::render('JudgingForm', [
            'questions' => $questions,
            'period' => $submission->period,
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
