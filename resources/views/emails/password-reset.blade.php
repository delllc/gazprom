{{-- Базовый шаблон писем Laravel --}}
@component('mail::layout')
    {{-- Заголовок --}}
    @slot('header')
        @component('mail::header', ['url' => config('app.url')])
            {{ config('app.name') }}
        @endcomponent
    @endslot

    {{-- Тело письма --}}
    # Сброс пароля

    Вы получили это письмо, потому что был запрошен сброс пароля для вашей учетной записи.

    @component('mail::button', ['url' => $resetUrl, 'color' => 'primary'])
        Сбросить пароль
    @endcomponent

    Ссылка действительна в течение {{ $expiration }} минут. Если вы не запрашивали сброс пароля, проигнорируйте это письмо.

    {{-- Подвал --}}
    @slot('footer')
        @component('mail::footer')
            © {{ date('Y') }} {{ config('app.name') }}. Все права защищены.
        @endcomponent
    @endslot
@endcomponent
