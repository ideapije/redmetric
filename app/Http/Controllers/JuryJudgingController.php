<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Indicator;
use App\Models\Submission;
use Illuminate\Http\Request;

class JuryJudgingController extends Controller
{
    public function store(Request $request, Submission $submission)
    {
        $submission->indicators->each(function ($indicator) use ($request) {
            $inputs = collect($request->all())->flatten(1);
            $point = collect(collect($inputs)->where('id', $indicator->id)->first())->get('jury_values')['point'];
            $juryValue = $indicator->pivot->juryValues()->where([
                'indicator_submission_id' => $indicator->pivot->id,
                'jury_id' => auth()->user()->jury->id ?? null
            ])->first();
            if ($juryValue) {
                $juryValue->point = $point;
                $juryValue->save();
            } else {
                $indicator->pivot->juryValues()->create([
                    'jury_id' => auth()->user()->jury->id ?? null,
                    'point' => $point
                ]);
            }
        });
        return redirect()->route('dashboard.jury.index')->with([
            'success' => 'Success! Judging is stored'
        ]);
    }

    public function publish(Submission $submission)
    {
        $points = $submission->indicators->map(function ($indicator) {
            $juryValue = $indicator->pivot->juryValues()->where([
                'indicator_submission_id' => $indicator->pivot->id,
                'jury_id' => auth()->user()->jury->id ?? null
            ])->first();
            return [
                'criteria' => $indicator->indicator_criteria_id,
                'point' => $juryValue->point
            ];
        });
        $fields = ['pp', 'ev', 'ec', 'gv', 'is', 'lv'];
        $points = collect($points)->groupBy('criteria')->map(function ($point) {
            $values = collect($point)->pluck('point');
            $total = $values->count() * 5;
            $sum = $values->sum();
            return round(($sum * 100) / $total, 2);
        });
        $updates = collect($fields)->combine($points);
        $submission->update($updates->toArray());

        return redirect()->route('dashboard.jury.index')->with([
            'success' => 'Success! Judging is published'
        ]);
    }
}
