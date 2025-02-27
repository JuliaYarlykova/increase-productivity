<?php

namespace App\Http\Requests\Value;

use Illuminate\Foundation\Http\FormRequest;

class StoreValueRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'quality1' => 'required|exists:qualities,name',
            'quality2' => 'nullable|exists:qualities,name',
            'quality3' => 'nullable|exists:qualities,name',
            'quality4' => 'nullable|exists:qualities,name',
            'quality5' => 'nullable|exists:qualities,name',
        ];
    }
}
