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

class AllRisksController extends Controller
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

        if (!$employees_id) {
            return response()->json(['error' => 'Add at least one employee'], 404);
        }

        $risks = array();

        $survey_date = SurveyHistory::whereIn('employee_id', $employees_id)
            ->orderBy('survey_date', 'DESC')
            ->pluck('survey_date')
            ->first();

        $metric_1_risk = (int) SurveyHistory::whereIn('employee_id', $employees_id)
            ->where('survey_date', $survey_date)
            ->avg('metric_1_risk');

        if ($metric_1_risk) {
            $metric_1_risk_name = Metric::where('id', 1)
            ->pluck('risk_name')
            ->first();

            array_push($risks, (object) [
                'risk_name' => $metric_1_risk_name,
                'risk_value' => $metric_1_risk,
                ]);
        }


        $metric_2_risk = (int) SurveyHistory::whereIn('employee_id', $employees_id)
            ->where('survey_date', $survey_date)
            ->avg('metric_2_risk');

        if ($metric_2_risk) {
            $metric_2_risk_name = Metric::where('id', 2)
            ->pluck('risk_name')
            ->first();

            array_push($risks, (object) [
                'risk_name' => $metric_2_risk_name,
                'risk_value' => $metric_2_risk,
                ]);
        }

        $metric_3_risk = (int) SurveyHistory::whereIn('employee_id', $employees_id)
            ->where('survey_date', $survey_date)
            ->avg('metric_3_risk');

        if ($metric_3_risk) {
            $metric_3_risk_name = Metric::where('id', 3)
            ->pluck('risk_name')
            ->first();

            array_push($risks, (object) [
                'risk_name' => $metric_3_risk_name,
                'risk_value' => $metric_3_risk,
                ]);
        }

        $date = ValueQuality::whereIn('employee_id', $employees_id)
            ->orderBy('date', 'DESC')
            ->pluck('date')
            ->first();

        $values = Value::where('company_id', $company->id)
            ->get();

        foreach ($values as $value) {
            $qualities = $value->qualities;

            foreach ($qualities as $quality) {
                array_push($risks, (object) [
                    'value_name' => $value->name,
                    'quality_name' => $quality->name,
                    'risk_name' => Quality::where('id', $quality->id)->pluck('risk_name')->first(),
                    'risk_value' => (int) ValueQuality::whereIn('employee_id', $employees_id)
                        ->where('date', $date)
                        ->where('quality_id', $quality->id)
                        ->avg('risk'),
                    ]);
            }
        }

        return response()->json($risks);
    }

    /**
     * Display the specified resource.
     */
    public function show(int $id)
    {
        $user = JWTAuth::parseToken()->authenticate();

        $employee = Employee::where('id', $id)->first();

        if (!$employee) {
            return response()->json(['error' => 'Not found'], 404);
        }

        $company = $user->company;

        if (!$company) {
            return response()->json(['error' => 'You have no companies'], 404);
        }

        $risks = array();

        $metric_1_risk = SurveyHistory::where('employee_id', $employee->id)
            ->orderBy('survey_date', 'DESC')
            ->pluck('metric_1_risk')
            ->first();

        if ($metric_1_risk) {
            $metric_1_risk_name = Metric::where('id', 1)
            ->pluck('risk_name')
            ->first();

            array_push($risks, (object) [
                'risk_name' => $metric_1_risk_name,
                'risk_value' => $metric_1_risk,
                ]);
        }


        $metric_2_risk = SurveyHistory::where('employee_id', $employee->id)
            ->orderBy('survey_date', 'DESC')
            ->pluck('metric_2_risk')
            ->first();

        if ($metric_2_risk) {
            $metric_2_risk_name = Metric::where('id', 2)
            ->pluck('risk_name')
            ->first();

            array_push($risks, (object) [
                'risk_name' => $metric_2_risk_name,
                'risk_value' => $metric_2_risk,
                ]);
        }

        $metric_3_risk = SurveyHistory::where('employee_id', $employee->id)
            ->orderBy('survey_date', 'DESC')
            ->pluck('metric_3_risk')
            ->first();

        if ($metric_3_risk) {
            $metric_3_risk_name = Metric::where('id', 3)
            ->pluck('risk_name')
            ->first();

            array_push($risks, (object) [
                'risk_name' => $metric_3_risk_name,
                'risk_value' => $metric_3_risk,
                ]);
        }

        $date = ValueQuality::where('employee_id', $employee->id)
            ->orderBy('date', 'DESC')
            ->pluck('date')
            ->first();

        $value_qialities = ValueQuality::where('employee_id', $id)
            ->where('date', $date)
            ->get();

        foreach ($value_qialities as $value_qiality) {
            array_push($risks, (object) [
                'value_name' => Value::where('id', $value_qiality->value_id)->pluck('name')->first(),
                'quality_name' => Quality::where('id', $value_qiality->quality_id)->pluck('name')->first(),
                'risk_name' => Quality::where('id', $value_qiality->quality_id)->pluck('risk_name')->first(),
                'risk_value' => $value_qiality->risk,
                ]);
        }

        return response()->json($risks);
    }
}
