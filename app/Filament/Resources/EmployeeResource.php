<?php

namespace App\Filament\Resources;

use App\Filament\Resources\EmployeeResource\Pages;
use App\Filament\Resources\EmployeeResource\RelationManagers;
use App\Models\User;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class EmployeeResource extends Resource
{
    protected static ?string $model = User::class;
    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';


    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('username')->required()->label('ФИО'),
                Forms\Components\TextInput::make('departament')->required()->label('Департамент'),
                Forms\Components\TextInput::make('position')->required()->label('Позиция'),
                Forms\Components\TextInput::make('phone')->required()->label('Телефон'),
                Forms\Components\TextInput::make('email')->required()->label('Почта'),
                Forms\Components\TextInput::make('password')->required()->label('Пароль'),
                Forms\Components\Select::make('Роль')->required()->label('Роль')->options([
                    'admin' => 'Администратор',
                    'employee' => 'Сотрудник'
                ])
                ->default('employee'),

            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([

                 Tables\Columns\TextColumn::make('username')->searchable()->label('ФИО'),
                 Tables\Columns\TextColumn::make('departament')->searchable()->label('Департамент'),
                 Tables\Columns\TextColumn::make('position')->searchable()->label('Позиция'),
                 Tables\Columns\TextColumn::make('phone')->searchable()->label('Телефон'),
                 Tables\Columns\TextColumn::make('email')->searchable()->label('Почта'),
               //
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
            'index' => Pages\ListEmployees::route('/'),
            'create' => Pages\CreateEmployee::route('/create'),
            'edit' => Pages\EditEmployee::route('/{record}/edit'),
        ];
    }
}
