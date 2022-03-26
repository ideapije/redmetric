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
    }
}
