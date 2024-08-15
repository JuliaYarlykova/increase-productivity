<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\SurveyHistory;
use App\Models\User;
use App\Models\Value;
use App\Models\ValueQuality;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

class Top3RisksEmployeesController extends Controller
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

        $employees = Employee::where('company_id', $company->id)
            ->get();

        $employee_risk = array();

        foreach ($employees as $employee) {
            $metric_1_risk = SurveyHistory::where('employee_id', $employee->id)
                ->orderBy('survey_date', 'DESC')
                ->pluck('metric_1_risk')
                ->first();

            $max = 0;
            if ($metric_1_risk) {
                $metric_2_risk = SurveyHistory::where('employee_id', $employee->id)
                    ->orderBy('survey_date', 'DESC')
                    ->pluck('metric_2_risk')
                    ->first();

                if ($metric_2_risk) {
                    $metric_3_risk = SurveyHistory::where('employee_id', $employee->id)
                        ->orderBy('survey_date', 'DESC')
                        ->pluck('metric_3_risk')
                        ->first();
                    if ($metric_3_risk) {
                        $value_date = ValueQuality::where('employee_id', $employee->id)
                            ->orderBy('date', 'DESC')
                            ->pluck('date')
                            ->first();

                        if ($value_date) {
                            $sum_risks = ValueQuality::where('employee_id', $employee->id)
                            ->where('date', $value_date)
                            ->sum('risk');

                            $risk_result = $sum_risks + $metric_1_risk + $metric_2_risk + $metric_3_risk;



                            if ($max < $risk_result) {
                                array_push($employee_risk, array(
                                    'user' => User::where('id', $employee->user_id)->first(),
                                    'employee' => $employee,
                                    'employee_risk' => $risk_result,));
                            }
                            else {
                                array_unshift($employee_risk, array(
                                    'user' => User::where('id', $employee->user_id)->first(),
                                    'employee' => $employee,
                                    'employee_risk' => $risk_result,));

                                $max = $risk_result;
                            }
                        }
                    }
                }
            }
        }
        return response()->json(array_slice($employee_risk, 0, 3));
    }
}
