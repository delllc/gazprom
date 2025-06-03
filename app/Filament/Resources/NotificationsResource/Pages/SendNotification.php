<?php

namespace App\Filament\Resources\NotificationsResource\Pages;

use Filament\Pages\Page;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Form;
use Filament\Notifications\Notification as FilamentNotification;

class SendNotification extends Page
{
    protected static ?string $navigationIcon = 'heroicon-o-bell';
    protected static string $view = 'filament.pages.send-notification';

    public ?array $data = [];

    public function mount(): void
    {
        $this->form->fill();
    }

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                Select::make('user_ids')
                    ->multiple()
                    ->relationship('users', 'username')
                    ->required()
                    ->label('Кому отправить'),

                TextInput::make('title')->label('Заголовок')->required(),
                Textarea::make('message')->label('Сообщение')->required(),
            ]);
    }

    public function send(): void
    {
        $validated = $this->form->getState();

        foreach ($validated['user_ids'] as $userId) {
            \App\Models\Notifications::create([
                'user_id' => $userId,
                'message' => $validated['message'],
                'is_read' => false,
            ]);
        }

        FilamentNotification::make()
            ->title('Уведомления отправлены')
            ->success()
            ->send();
    }
}
