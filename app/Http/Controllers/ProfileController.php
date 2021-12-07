<?php

namespace App\Http\Controllers;

use App\Http\Requests\UploadIdentity;
use App\Http\Requests\VillageStore;
use App\Http\Requests\VillageUpdate;
use App\Models\Village;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Inertia\Inertia;
use Modules\Membership\Member;

class ProfileController extends Controller
{
    public function form(Request $request)
    {
        $user = collect($request->user()->load(['membership', 'village']));
        $provinces = json_decode(File::get(resource_path('json/provinces.json')));
        return Inertia::render('ProfileForm', [
            'membership' => $user->get('membership'),
            'village' => $user->get('village'),
            'provinces' => $provinces
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(VillageStore $request, Village $village)
    {
        $data = $request->all();
        $data['user_id'] = $request->user()->id;
        $data['since'] = Carbon::parse($request->get('since'))->format('Y-m-d');
        $village = $village->create($data);
        if ($village) {
            if ($village->account()->count()) {
                return redirect()->route('dashboard')->with([
                    'success' => 'Success! Your village is stored'
                ]);
            } else {
                return redirect()->back()->with([
                    'error' => 'Error! failed to store village'
                ]);
            }
        } else {
            return redirect()->route('dashboard')->with([
                'error' => 'Error! failed to store village'
            ]);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Village  $village
     * @return \Illuminate\Http\Response
     */
    public function update(VillageUpdate $request, Village $village)
    {
        $data = $request->all();
        $data['since'] = Carbon::parse($request->get('since'))->format('Y-m-d');
        $village->update($data);
        return redirect()->route('dashboard')->with([
            'success' => 'Success! Your village is stored'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Village  $village
     * @return \Illuminate\Http\Response
     */
    public function destroy(Village $village)
    {
        //
    }

    public function upload(UploadIdentity $request, Member $membership)
    {
        try {
            $data = $request->except('document');
            $data['document'] = $request->document->store('identities');
            $membership->identities()->create($data);
            return redirect()->route('dashboard')->with(['success' => 'Success!']);
        } catch (\Throwable $th) {
            return redirect()->route('dashboard')->with(['error' => 'Error!']);
        }
    }
}
