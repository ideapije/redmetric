<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
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
        });
        $todos = $todos->paginate();
        dd($todos);
        return Inertia::render('UserSubmission', [
            'todos' => $todos
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
