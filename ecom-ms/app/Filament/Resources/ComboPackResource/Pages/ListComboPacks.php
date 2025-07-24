<?php

namespace App\Filament\Resources\ComboPackResource\Pages;

use App\Filament\Resources\ComboPackResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListComboPacks extends ListRecords
{
    protected static string $resource = ComboPackResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
