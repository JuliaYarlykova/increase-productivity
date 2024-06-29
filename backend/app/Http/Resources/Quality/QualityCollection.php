<?php

namespace App\Http\Resources\Quality;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class QualityCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        return array_map(static fn ($quality) => new QualityResource($quality), $this->collection->all());
    }
}
