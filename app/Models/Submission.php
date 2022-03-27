<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Period;
use App\Models\IndicatorSubmission;

class Submission extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'period_id',
        'publish',
        'pp',
        'ev',
        'ec',
        'gv',
        'is',
        'lv'
    ];

    protected $appends = ['status'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function period()
    {
        return $this->belongsTo(Period::class);
    }

    public function indicators()
    {
        return $this->belongsToMany(Indicator::class)
            ->using(IndicatorSubmission::class)
            ->withPivot('result', 'id');
    }

    public function jurySubmissions()
    {
        return $this->hasMany(JurySubmission::class, 'submission_id', 'id');
    }

    public function getStatusAttribute()
    {
        return [
            'color' => $this->publish ? 'green' : 'yellow',
            'text' => $this->publish ? 'SUBMITTED' : 'DRAFT'
        ];
    }
}
