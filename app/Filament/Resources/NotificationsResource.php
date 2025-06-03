<?php

namespace App\Filament\Resources;

use App\Filament\Resources\NotificationsResource\Pages;
use App\Models\Notifications;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class NotificationsResource extends Resource
{
    protected static ?string $model = Notifications::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Select::make('user_id')
                ->relationship('user', 'username')
                ->required()
                ->label('Пользователь'),
                Forms\Components\TextInput::make('message')->required()->label('Сообщение'),
                Forms\Components\Toggle::make('is_read')->label('Прочитано'),

            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([

                Tables\Columns\TextColumn::make('user.username')->label('Пользователь'),
                Tables\Columns\TextColumn::make('message')->limit(50)->label('Сообщение'),
                Tables\Columns\BooleanColumn::make('is_read')->label('Прочитано'),
                Tables\Columns\TextColumn::make('created_at')->label('Дата'),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListNotifications::route('/'),
            'create' => Pages\CreateNotifications::route('/create'),
            'edit' => Pages\EditNotifications::route('/{record}/edit'),
        ];
    }
}
