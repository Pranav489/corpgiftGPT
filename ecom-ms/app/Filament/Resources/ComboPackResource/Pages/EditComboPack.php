<?php

namespace App\Filament\Resources\ComboPackResource\Pages;

use App\Filament\Resources\ComboPackResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditComboPack extends EditRecord
{
    protected static string $resource = ComboPackResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
