<?php

namespace App\Filament\Resources;

use App\Filament\Resources\NewsResource\Pages;
use App\Filament\Resources\NewsResource\RelationManagers;
use App\Models\News;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class NewsResource extends Resource
{
    protected static ?string $model = News::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('title')->required()->label('Заголовок'),
                Forms\Components\TextInput::make('content')->required()->label('Контент'),

                Forms\Components\FileUpload::make('image')->directory('public')->required()->label('Photo'),
                Forms\Components\TextInput::make('author_id')->required()->label('Чья новость'),
                Forms\Components\TextInput::make('published_at')->required()->label('Когда опубликована'),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                 Tables\Columns\TextColumn::make('title')->searchable()->label('Заголовок'),
                 Tables\Columns\TextColumn::make('content')->searchable()->label('Контент'),
                 Tables\Columns\TextColumn::make('published_at')->searchable()->label('Когда опубликована'),
                 Tables\Columns\TextColumn::make('author_id')->searchable()->label('Чья новость'),
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
            'index' => Pages\ListNews::route('/'),
            'create' => Pages\CreateNews::route('/create'),
            'edit' => Pages\EditNews::route('/{record}/edit'),
        ];
    }
}
