<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Value extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'company_id'];

    public function qualities()
    {
        return $this->belongsToMany(Quality::class, 'quality_value');
    }

    public function qualitiesForEmployees()
    {
        return $this->belongsToMany(Quality::class, 'quality_value');
    }

    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    public function valueQualities()
    {
        return $this->hasMany(ValueQuality::class);
    }
}
