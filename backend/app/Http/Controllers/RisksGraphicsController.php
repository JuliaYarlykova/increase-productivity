<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\Metric;
use App\Models\Quality;
use App\Models\SurveyHistory;
use App\Models\Value;
use App\Models\ValueQuality;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

class RisksGraphicsController extends Controller
{
    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $user = JWTAuth::parseToken()->authenticate();

        $company = $user->company;

        if (!$company) {
            return response()->json(['error' => 'You have no companies'], 404);
        }

        $employee = Employee::where('id', $id)->first();

        if (!$employee) {
            return response()->json(['error' => 'Not found'], 404);
        }

        $employees_id = Employee::where('company_id', $company->id)->pluck('id');

        $values_id = ValueQuality::whereIn('employee_id', $employees_id)->pluck('value_id')->unique();

        $values = Value::where('company_id', $company->id)
            ->whereIn('id', $values_id)->get();

        if (!$values) {
            return response()->json(['error' => 'You have no values'], 404);
        }

        $date = ValueQuality::whereIn('employee_id', $employees_id)
            ->orderBy('date', 'DESC')
            ->pluck('date')
            ->first();

        $value_qialities = ValueQuality::where('employee_id', $id)
            ->where('date', $date)
            ->orderBy('risk', 'DESC')
            ->limit(5)
            ->get();

        $count = ValueQuality::where('employee_id', $id)
            ->where('date', $date)
            ->orderBy('risk', 'DESC')
            ->limit(5)
            ->count();

        $buff = 0;

        $metric_1_risk = SurveyHistory::where('employee_id', $id)
            ->orderBy('survey_date', 'DESC')
            ->pluck('metric_1_risk')
            ->first();

        if (!$metric_1_risk) {
            return response()->json(['error' => 'You have no survey_history'], 404);
        }

        $metric_1_risk_name = Metric::where('id', 1)
            ->pluck('risk_name')
            ->first();

        $metric_2_risk = SurveyHistory::where('employee_id', $id)
            ->orderBy('survey_date', 'DESC')
            ->pluck('metric_2_risk')
            ->first();

        if (!$metric_2_risk) {
            return response()->json(['error' => 'You have no survey_history'], 404);
        }

        $metric_2_risk_name = Metric::where('id', 2)
            ->pluck('risk_name')
            ->first();

        if ($metric_1_risk < $metric_2_risk) {
            $buff = $metric_1_risk;
            $metric_1_risk = $metric_2_risk;
            $metric_2_risk = $buff;

            $buff = $metric_1_risk_name;
            $metric_1_risk_name = $metric_2_risk_name;
            $metric_2_risk_name = $buff;
        }

        $metric_3_risk = SurveyHistory::where('employee_id', $id)
            ->orderBy('survey_date', 'DESC')
            ->pluck('metric_3_risk')
            ->first();

        if (!$metric_3_risk) {
            return response()->json(['error' => 'You have no survey_history'], 404);
        }

        $metric_3_risk_name = Metric::where('id', 3)
            ->pluck('risk_name')
            ->first();

        if ($metric_3_risk > $metric_2_risk) {
            $buff = $metric_3_risk;
            $metric_3_risk = $metric_2_risk;
            $metric_2_risk = $buff;

            $buff = $metric_3_risk_name;
            $metric_3_risk_name = $metric_2_risk_name;
            $metric_2_risk_name = $buff;
        }

        if ($metric_1_risk < $metric_2_risk) {
            $buff = $metric_1_risk;
            $metric_1_risk = $metric_2_risk;
            $metric_2_risk = $buff;

            $buff = $metric_1_risk_name;
            $metric_1_risk_name = $metric_2_risk_name;
            $metric_2_risk_name = $buff;
        }

        $result = (array) [];
        $result['labels'][0] = 'Риски по метрикам';
        $result['labels'][1] = 'Риски по качествам';

        $result['datasets'] = array(
            0 => (object) [
                'label' => $metric_1_risk_name,
                'data' => array(
                    0 => $metric_1_risk,
                    1 => null,
                ),
            ],
            1 => (object) [
                'label' => $metric_2_risk_name,
                'data' => array(
                    0 => $metric_2_risk,
                    1 => null,
                ),
            ],
            2 => (object) [
                'label' => $metric_3_risk_name,
                'data' => array(
                    0 => $metric_3_risk,
                    1 => null,
                ),
            ],
        );

        for ($j = 0; $j < $count; $j++) {
            $result['datasets'][$j + 3] = (object) [
                'label' => Quality::where('id', $value_qialities[$j]->quality_id)->pluck('risk_name')->first(),
                'data' => array(
                    0 => null,
                    1 => $value_qialities[$j]->risk,
                ),
            ];
        }

        return response()->json($result);
    }
}
