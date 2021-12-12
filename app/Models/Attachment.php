<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Facades\Storage;
use Illuminate\Database\Eloquent\Model;

class Attachment extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'file'];
    protected $hidden = ['attachable_type'];

    protected $appends = ['file_url'];
    /**
     * Get the parent attachable model.
     */
    public function attachable()
    {
        return $this->morphTo();
    }

    public function getFileUrlAttribute()
    {
        return Storage::url($this->file);
    }
}
