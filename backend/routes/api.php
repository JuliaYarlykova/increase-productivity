<?php

use App\Http\Controllers\AllRisksController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CollectiveMetricController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\QualityController;
use App\Http\Controllers\SubscriptionController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\CompanyRatingController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\FileController;
use App\Http\Controllers\SurveyHistoryController;
use App\Http\Controllers\ValueController;
use App\Http\Controllers\MetricsController;
use App\Http\Controllers\MetricsGraphicsController;
use App\Http\Controllers\NotesController;
use App\Http\Controllers\PresetsController;
use App\Http\Controllers\QualityValueController;
use App\Http\Controllers\RisksGraphicsController;
use App\Http\Controllers\Top3RisksEmployeesController;
use App\Http\Controllers\TopQualitiesRiskController;
use App\Http\Controllers\ValueQualityController;
use App\Http\Controllers\ValuesGraphicsController;
use App\Http\Controllers\ValuesQualitiesGraphicsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function ($router) {
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login'])->name('api.auth.login');
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refresh', [AuthController::class, 'refresh']);
    Route::post('me', [AuthController::class, 'me']);
});

Route::group([
    'middleware' => 'auth',
], function ($router) {
    Route::get('employees', [EmployeeController::class, 'index']);
    Route::get('employees/{employee}', [EmployeeController::class, 'show']);
    Route::post('employees', [EmployeeController::class, 'store']);
    Route::put('employees/{employee}', [EmployeeController::class, 'update']);
    Route::delete('employees/{employee}', [EmployeeController::class, 'destroy']);
});

Route::group(['middleware' => 'auth'], function () {
    Route::get('companies', [CompanyController::class, 'index']);
    Route::get('companies/{company}', [CompanyController::class, 'show']);
    Route::post('companies', [CompanyController::class, 'store']);
    Route::put('companies/{company}', [CompanyController::class, 'update']);
    Route::delete('companies/{company}', [CompanyController::class, 'destroy']);
});


Route::group([
    'middleware' => 'auth',
], function ($router) {
    Route::resource('values', ValueController::class);
});

Route::group([
    'middleware' => 'auth',
], function ($router) {
    Route::resource('qualities', QualityController::class);
});

Route::group([
    'middleware' => 'auth',
], function ($router) {
    Route::resource('value_qualities', ValueQualityController::class);
});

Route::group([
    'middleware' => 'api',
], function ($router) {
    Route::post('/subscriptions', [SubscriptionController::class, 'store']);
    Route::post('/subscriptions/{id}/cancel', [SubscriptionController::class, 'cancel']);
});

Route::resource('events', EventController::class);

Route::resource('metrics', MetricsController::class);

Route::resource('survey_histories', SurveyHistoryController::class);

Route::resource('collective_metrics', CollectiveMetricController::class);

Route::resource('quality_values', QualityValueController::class);


Route::group([
    'middleware' => 'api',
], function ($router) {
    Route::get('personal_values_qualities_graphics/{employee_id}', [ValuesQualitiesGraphicsController::class, 'show']);
    Route::get('company_values_qualities_graphics/', [ValuesQualitiesGraphicsController::class, 'index']);
});

Route::group([
    'middleware' => 'api',
], function ($router) {
    Route::get('personal_metrics_graphics/{employee_id}', [MetricsGraphicsController::class, 'show']);
    Route::get('company_metrics_graphics/', [MetricsGraphicsController::class, 'index']);
});

Route::group([
    'middleware' => 'api',
], function ($router) {
    Route::get('personal_values_graphics/{employee_id}', [ValuesGraphicsController::class, 'show']);
    Route::get('company_values_graphics/', [ValuesGraphicsController::class, 'index']);
});

Route::group([
    'middleware' => 'api',
], function ($router) {
    Route::get('personal_top_qualities_risk_graphics/{employee_id}', [TopQualitiesRiskController::class, 'show']);
    Route::get('company_top_qualities_risk_graphics/', [TopQualitiesRiskController::class, 'index']);
});

Route::group(['middleware' => 'auth'], function () {
    Route::get('notes/{employee_id}', [NotesController::class, 'show']);
    Route::post('notes', [NotesController::class, 'store']);
    Route::put('notes/{note_id}', [NotesController::class, 'update']);
    Route::delete('notes/{note_id}', [NotesController::class, 'destroy']);
});

Route::group(['middleware' => 'auth'], function () {
    Route::get('files/{employee_id}', [FileController::class, 'show']);
    Route::post('files', [FileController::class, 'store']);
    Route::delete('files/{file_id}', [FileController::class, 'destroy']);
});

Route::group([
    'middleware' => 'api',
], function ($router) {
    Route::get('risk_graphics/{employee_id}', [RisksGraphicsController::class, 'show']);
    Route::get('company_risk_graphics/', [RisksGraphicsController::class, 'index']);
});

Route::group([
    'middleware' => 'api',
], function ($router) {
    Route::get('company_rating/', [CompanyRatingController::class, 'index']);
});

Route::group([
    'middleware' => 'api',
], function ($router) {
    Route::get('top_risks_employees/', [Top3RisksEmployeesController::class, 'index']);
});

Route::group([
    'middleware' => 'api',
], function ($router) {
    Route::get('all_company_risks/', [AllRisksController::class, 'index']);
    Route::get('all_employee_risks/{employee_id}', [AllRisksController::class, 'show']);
});

Route::apiResource('presets', PresetsController::class)->only(['index']);

