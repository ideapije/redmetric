<?php

namespace App\Http\Controllers;

use App\Models\IndicatorCriteria;
use App\Models\Period;
use App\Models\Submission;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SubmissionController extends Controller
{
    public function form(Request $request, Period $period, $page = 1)
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

        $all        = collect($questions->flatten(1));
        $total      = $all->count();
        $filled     = $all->filter(function ($question) {
            $value = trim($question['value']);
            return (is_numeric($value) && intval($value) >= 0);
        })->values()->count();
        $progress = number_format($filled / $total * 100, 2);

        $inputs = $questions[$page] ?? $questions[1];
        return Inertia::render('SubmissionForm', [
            'page' => $page,
            'inputs' => $inputs,
            'period' => $period,
            'steps' => $steps,
            'submission' => $submission,
            'progress' => $progress
        ]);
    }

    public function store(Request $request, Period $period)
    {
        $submission = Submission::firstOrCreate([
            'user_id' => $request->user()->id,
            'period_id' => $period->id
        ]);
        $inputs = collect($request->all());
        $submission->indicators()->syncWithoutDetaching($inputs->pluck('indicator_id')->toArray());
        collect($submission->indicators)
            ->filter(function ($indicator) use ($inputs) {
                return $inputs->pluck('indicator_id')->contains($indicator->id);
            })
            ->values()
            ->each(function ($indicator) use ($inputs) {
                $values = collect($inputs)->where('indicator_id', $indicator->id)->values();
                if ($indicator->pivot->values()->count() > 0) {
                    collect($indicator->pivot->values)->each(function ($item) use ($values) {
                        $updated = $values->where('id', $item->indicator_input_id)->first();
                        if ($updated['value'] ?? false) {
                            $item->value = $updated['value'];
                            $item->save();
                        }
                    });
                } else {
                    $values = $values->map(function ($value) {
                        return collect($value)->merge(['indicator_input_id' => $value['id']]);
                    });
                    $indicator->pivot->values()->createMany($values->toArray());
                }
                $files = $values->filter(function ($item) use ($indicator) {
                    return (($item['evidence']['file'] ?? false) && $item['indicator_id'] === $indicator->id);
                })->values();

                if ($indicator->pivot->evidence()->count()) {
                    if ($files->count() > 0) {
                        $evidence = $files->first()['evidence'];
                        $indicator->pivot->evidence()->update([
                            'name' => $evidence['name'],
                            'file' => $evidence['file']
                        ]);
                    } else {
                        $indicator->pivot->evidence()->update([
                            'name' => 'deleted',
                            'file' => '0'
                        ]);
                    }
                } else {
                    if ($files->count() > 0) {
                        $indicator->pivot
                            ->evidence()
                            ->create($files->first()['evidence']);
                    }
                }
            });
        return redirect()->back()->with([
            'alert' => [
                'status' => 'success',
                'message' => 'Success! your input stored'
            ]
        ]);
    }

    public function publish(Request $request, Period $period)
    {
        $submission = Submission::firstOrCreate([
            'user_id' => $request->user()->id,
            'period_id' => $period->id
        ]);
        $configFramework = config('redmetric-framework');
        $user = $submission->user;
        $submission->indicators->map(function ($indicator) use ($configFramework, $user) {
            $userDetails    = collect($user->load('village'));
            $values         = collect($indicator->pivot->values ?? [])->pluck('value');
            $formula        = collect($configFramework[$indicator->code] ?? [])->map(function ($config, $key) use ($values, $userDetails) {
                $item       = $values[$config] ?? $config;
                if ($config === 0) {
                    $item = $values[0];
                }
                if (strpos($config, 'village') !== false) {
                    $item = data_get($userDetails, $config, null);
                }
                return $item;
            });
            $result = $formula->join('');
            $result = number_format(eval("return $result;"), 2);
            $indicator->pivot->update([
                'result' => $result
            ]);
            return [
                'code' => $indicator->code,
                'formula' => $formula->join(''),
                'values' => $values,
                'result' => $result,
                'indicator_result' => data_get(collect($indicator->pivot), 'result', null)
            ];
        });
        $submission->publish = 1;
        $submission->save();
        return redirect()->route('dashboard.submission')->with([
            'alert' => [
                'status' => 'success',
                'message' => 'Success! your submission submitted'
            ]
        ]);
    }

    public function upload(Request $request, Period $period)
    {
        $submission = Submission::firstOrCreate([
            'user_id' => $request->user()->id,
            'period_id' => $period->id
        ]);
        $indicator = $submission->indicators()->where('indicator_id', $request->get('indicator_id'))->first();
        if ($indicator) {
            $indicator->pivot->evidence()->create([
                'name' => $indicator->code,
                'file' => $request->get('file')
            ]);
        }
        return redirect()->back();
    }
}
