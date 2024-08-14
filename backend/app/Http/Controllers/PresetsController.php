<?php

namespace App\Http\Controllers;

use App\Models\Quality;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

class PresetsController extends Controller
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

        $result = array();

        $result[0]['value_name'] = 'Страсть';
        $result[0]['qualities'] = array(
            '0' => (object)[
               'quality_name' => 'Командный дух',
               'quality_id' => Quality::where('name', 'Командный дух')->pluck('id')->first(),
            ],
            '1' => (object)[
               'quality_name' => 'Обучаемость',
               'quality_id' => Quality::where('name', 'Обучаемость')->pluck('id')->first(),
            ],
            '2' => (object)[
               'quality_name' => 'Амбициозность',
               'quality_id' => Quality::where('name', 'Амбициозность')->pluck('id')->first(),
            ],
            '3' => (object)[
               'quality_name' => 'Чувство юмора',
               'quality_id' => Quality::where('name', 'Чувство юмора')->pluck('id')->first(),
            ],
            '4' => (object)[
               'quality_name' => 'Лидерство',
               'quality_id' => Quality::where('name', 'Лидерство')->pluck('id')->first(),
            ],
        );

        $result[1]['value_name'] = 'Самоотдача';
        $result[1]['qualities'] = array(
            '0' => (object)[
               'quality_name' => 'Обучаемость',
               'quality_id' => Quality::where('name', 'Обучаемость')->pluck('id')->first(),
            ],
            '1' => (object)[
               'quality_name' => 'Серьезность',
               'quality_id' => Quality::where('name', 'Серьезность')->pluck('id')->first(),
            ],
            '2' => (object)[
               'quality_name' => 'Умение заниматься рутинной работой',
               'quality_id' => Quality::where('name', 'Умение заниматься рутинной работой')->pluck('id')->first(),
            ],
            '3' => (object)[
               'quality_name' => 'Нацеленность на результат',
               'quality_id' => Quality::where('name', 'Нацеленность на результат')->pluck('id')->first(),
            ],
        );

        $result[2]['value_name'] = 'Честность';
        $result[2]['qualities'] = array(
            '0' => (object)[
               'quality_name' => 'Честность',
               'quality_id' => Quality::where('name', 'Честность')->pluck('id')->first(),
            ],
            '1' => (object)[
               'quality_name' => 'Серьезность',
               'quality_id' => Quality::where('name', 'Серьезность')->pluck('id')->first(),
            ],
            '2' => (object)[
               'quality_name' => 'Ответственность',
               'quality_id' => Quality::where('name', 'Ответственность')->pluck('id')->first(),
            ],
            '3' => (object)[
               'quality_name' => 'Умение говорить',
               'quality_id' => Quality::where('name', 'Умение говорить')->pluck('id')->first(),
            ],
            '4' => (object)[
               'quality_name' => 'Умение слушать',
               'quality_id' => Quality::where('name', 'Умение слушать')->pluck('id')->first(),
            ],
        );

        $result[3]['value_name'] = 'Открытость';
        $result[3]['qualities'] = array(
            '0' => (object)[
               'quality_name' => 'Умение говорить',
               'quality_id' => Quality::where('name', 'Умение говорить')->pluck('id')->first(),
            ],
            '1' => (object)[
               'quality_name' => 'Коммуникабельность',
               'quality_id' => Quality::where('name', 'Коммуникабельность')->pluck('id')->first(),
            ],
            '2' => (object)[
               'quality_name' => 'Этичность',
               'quality_id' => Quality::where('name', 'Этичность')->pluck('id')->first(),
            ],
        );

        $result[4]['value_name'] = 'Практичный подход';
        $result[4]['qualities'] = array(
            '0' => (object)[
               'quality_name' => 'Системность мышления',
               'quality_id' => Quality::where('name', 'Системность мышления')->pluck('id')->first(),
            ],
            '1' => (object)[
               'quality_name' => 'Тайм-менеджмент и пунктуальность',
               'quality_id' => Quality::where('name', 'Тайм-менеджмент и пунктуальность')->pluck('id')->first(),
            ],
            '2' => (object)[
               'quality_name' => 'Профессионализм и компетентность',
               'quality_id' => Quality::where('name', 'Профессионализм и компетентность')->pluck('id')->first(),
            ],
            '3' => (object)[
               'quality_name' => 'Безопасность',
               'quality_id' => Quality::where('name', 'Безопасность')->pluck('id')->first(),
            ],
        );

        $result[5]['value_name'] = 'Приверженность команде';
        $result[5]['qualities'] = array(
            '0' => (object)[
               'quality_name' => 'Надежность',
               'quality_id' => Quality::where('name', 'Надежность')->pluck('id')->first(),
            ],
            '1' => (object)[
               'quality_name' => 'Стрессоустойчивость',
               'quality_id' => Quality::where('name', 'Стрессоустойчивость')->pluck('id')->first(),
            ],
            '2' => (object)[
               'quality_name' => 'Этичность',
               'quality_id' => Quality::where('name', 'Этичность')->pluck('id')->first(),
            ],
            '3' => (object)[
               'quality_name' => 'Непрерывное развитие и новаторство',
               'quality_id' => Quality::where('name', 'Непрерывное развитие и новаторство')->pluck('id')->first(),
            ],
            '4' => (object)[
               'quality_name' => 'Командный дух',
               'quality_id' => Quality::where('name', 'Командный дух')->pluck('id')->first(),
            ],
        );

        $result[6]['value_name'] = 'Проактивность';
        $result[6]['qualities'] = array(
            '0' => (object)[
               'quality_name' => 'Инициативность',
               'quality_id' => Quality::where('name', 'Инициативность')->pluck('id')->first(),
            ],
            '1' => (object)[
               'quality_name' => 'Самостоятельность',
               'quality_id' => Quality::where('name', 'Самостоятельность')->pluck('id')->first(),
            ],
            '2' => (object)[
               'quality_name' => 'Адаптивность',
               'quality_id' => Quality::where('name', 'Адаптивность')->pluck('id')->first(),
            ],
        );

        $result[7]['value_name'] = 'Клиентность';
        $result[7]['qualities'] = array(
            '0' => (object)[
               'quality_name' => 'Этичность',
               'quality_id' => Quality::where('name', 'Этичность')->pluck('id')->first(),
            ],
            '1' => (object)[
               'quality_name' => 'Честность',
               'quality_id' => Quality::where('name', 'Честность')->pluck('id')->first(),
            ],
            '2' => (object)[
               'quality_name' => 'Стремление к качественному результату',
               'quality_id' => Quality::where('name', 'Стремление к качественному результату')->pluck('id')->first(),
            ],
            '3' => (object)[
               'quality_name' => 'Профессионализм и компетентность',
               'quality_id' => Quality::where('name', 'Профессионализм и компетентность')->pluck('id')->first(),
            ],
            '4' => (object)[
               'quality_name' => 'Позитивное мышление',
               'quality_id' => Quality::where('name', 'Позитивное мышление')->pluck('id')->first(),
            ],
        );

        return response()->json($result);
    }
}
