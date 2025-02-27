<?php

namespace App\Http\Requests\Employee;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class StoreEmployeeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'first_name' => 'required|string|max:25',
            'middle_name' => 'nullable|string|max:25',
            'last_name' => 'nullable|string|max:25',
            'role_id' => 'exists:roles,id',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => [
                'required',
                'string',
                Password::min(6)->letters()->numbers(),
                'confirmed', // Ensure password_confirmation matches password
            ],
            'imgSrc' => 'required|string|max:255',
            'birth_date' => 'required|date',
            'position' => 'required|string|max:255',
            'work_experience' => 'required|numeric|between:0,9999.99',
            'status' => 'required|string|in:working,fired',
            'salary' => 'required|numeric',
            'balance' => 'required|numeric',
            'date_of_hiring' => 'required|date',
            'company_id' => 'exists:companies,id',  // Validate that company_id exists in companies table
        ];
    }

    /**
     * Prepare the data for validation.
     */
    protected function prepareForValidation()
    {
        $company = \App\Models\Company::where('user_id', auth()->id())->first();

        if ($company) {
            $this->merge([
                'company_id' => $company->id,
            ]);
        }
    }
}
