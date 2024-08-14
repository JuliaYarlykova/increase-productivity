<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\Quality;
use App\Models\QualityValue;
use App\Models\Value;
use App\Models\ValueQuality;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Tymon\JWTAuth\Facades\JWTAuth;

class QualityValueController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = JWTAuth::parseToken()->authenticate();

        $company = $user->company;

        if (!$company) {
            return response()->json(['error' => 'You have no companies'], 404);
        }

        $employees_id = Employee::where('company_id', $company->id)->pluck('id');

        $values = Value::where('company_id', $company->id)
            ->get();

        if (!$values) {
            return response()->json(['error' => 'You have no values'], 404);
        }

        $result[0] = array ();
        $i = 0;

        foreach ($values as $value) {
            $result[$i]['value_id'] = $value->id;
            $result[$i]['value_name'] = $value->name;

            $count = $value->qualities->count();

            $qualities_id = $value->qualities->pluck('id');

            $qualities_name = $value->qualities->pluck('name');


            for ($j = 0; $j < $count; $j++) {
                $result[$i]['qualities'][$j]['quality_id'] = $qualities_id[$j];
                $result[$i]['qualities'][$j]['quality_name'] = $qualities_name[$j];
            }

            $i++;
        }

        return response()->json($result);
    }

}
