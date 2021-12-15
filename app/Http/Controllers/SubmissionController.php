<?php

namespace App\Http\Controllers;

use App\Models\IndicatorCriteria;
use App\Models\Period;
use App\Models\Submission;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SubmissionController extends Controller
{
    public function form(Request $request, Period $period)
    {
        $pivot = collect([]);
        $submission = Submission::with('indicators')
            ->where('user_id', $request->user()->id)
            ->where('period_id', $period->id)
            ->first();
        if ($submission) {
            $pivot = $submission->indicators->map(function ($indicator) {
                return $indicator->pivot->load([
                    'values',
                    'evidence'
                ]);
            });
        }


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
                    'evidence' => $pivot->where('indicator_id', $item->indicator_id)->first()->evidence ?? null
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
        return Inertia::render('SubmissionForm', [
            'questions' => $questions,
            'period' => $period,
            'steps' => $steps,
        ]);
    }

    public function store(Request $request, Period $period)
    {
        $submission = Submission::firstOrCreate([
            'user_id' => $request->user()->id,
            'period_id' => $period->id
        ]);
        $evidences  = collect($request->all())->flatten(1);
        $inputs     = collect($request->all())->map(function($items){
            $data = collect($items)->map(function($item){
                $item = collect($item)
                ->only(['value', 'indicator_id'])
                ->merge(['indicator_input_id' => $item['id']]);
                return $item;
            });
            return $data;
        })->flatten(1);
        $indicators = $inputs->groupBy('indicator_id');
        $submission->indicators()->syncWithoutDetaching($indicators->keys()->toArray());
        $submission->indicators->each(function ($indicator) use ($indicators, $evidences) {
            $values = $indicators->get($indicator->id);
            if ($values) {
                $values = $values->map(function ($value) {
                    return collect($value)->except('indicator_id')->toArray();
                });

                if ($indicator->pivot->values()->count() > 0) {
                    $indicator->pivot->values()->whereIn('indicator_input_id', $values->pluck('indicator_input_id')->toArray())->delete();
                }
                $indicator->pivot->values()->createMany($values->toArray());
                $findEvidence = $evidences->where('indicator_id', $indicator->id)->first();
                if ($findEvidence['evidence'] ?? false) {
                    $indicator->pivot->evidence()->create([
                        'name' => $indicator->code,
                        'file' => $findEvidence['evidence']->store('evidences', 'public')
                    ]);
                }
            }
        });
        return redirect()->route('dashboard.submission');
    }
}
