# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/styles/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```

## Ключевые типы данных

Карточка

```
interface ICard {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number;
    index?: number;
}
```
Заказ

```
interface IOrder {                 
    payment: string;                     
    email: string;                        
    phone: string;
    address: string;
}
```
Корзина

```
interface IBasket {
    items: HTMLElement[];
    total: number;
}
```
Главная страница

```
interface IPage {
    gallery: HTMLElement[];
    counterBasket: number;
}
```
Модальное окно

```
interface IModal {
    modalContent: HTMLElement;
}
```
Форма

```
interface IForm extends IOrder {
    error: string;
    valid: boolean;
}
```
Модель данных карточек

```
interface ICardData {
    cards: ICard[];
    getCard(cardId:string): ICard;
    setSelectedCard(cardId:string): void;
    getSelectedCard(): void;
}
```
Модель данных заказа

```
interface IOrderData {
    getOrder(): IOrder;
    setField(field: keyof IOrder, value: string): void;
    setErrors(): TOrderError;
    clear(): void;
}
```
Модель данных корзины

```
interface IBasketData {
    cardsBasket: ICard[];
    getTotal(): number;
    contains(id: string): boolean;
    add(card: ICard): void;
    remove(id: string): void;
    getBasketList(): void;
    getLengthBasketList():number;
    getIdBasketList(): string[];
    clear(): void;
}
```
Данные корзины

```
type TBasket = Pick<IOrder, 'items'|'total'>
```

Данные ошибок форм

```
TOrderError = Partial<Pick<IOrder, 'address' | 'email' | 'payment' | 'phone'>>
```

Данные формы оплаты

```
type TPayment = Pick<IOrder, 'payment'|'address'>
```

Данные формы покупателя

```
type TProfileBuyer = Pick<IOrder, 'email'|'phone'>
```

Данные формы успешного заказа

```
type TSuccess = Pick<IOrder, 'total'>
```

Данные передаваемого на сервер заказа

```
type TDataOrder = Partial<IOrder & IBasketData>
```

Данные методов сервера

```
type ApiPostMethods = 'POST' | 'PUT' | 'DELETE'
```

## Архитектура приложения

Код приложения разделён на слои согласно парадигме MVP:
- слой представления. Отвечает за отображение данных на странице.
- слой данных. Отвечает за хранение и изменение данных.
- презентер. Отвечает за связь слоя представления и слоя данных.

### Базовый код

#### Класс Api

Отвечает за запросы на сервер. 
Принимает в параметры конструктора адрес и объект с заголовками запроса.

Методы:
  - `get` - используются для получения информации с сервера. 
   Принимает в параметр Endpoint (указание на конкретный ресурс, к которому мы хотим получить доступ).
   Выполняет get запрос и возвращает promise (данные с сервера).

  - `post` - используются для отправки информации на сервер. 
   Принимает в параметр Endpoint, объект для передачи в JSON и метод запроса(по умолчанию post).

  - `handleResponse` - преобразует данные в формат, в котором мы хотим получить данные.
   Принимает в параметр поток Response.
   Возвращает promise, который разрешается в результат разбора тела ответа в качестве стоки JSON

#### Класс Component

Абстрактный класс для создания DOM-элементов. Принимает в параметры конструктора контейнер, куда будет вставляться DOM-элемент.

Методы:
 - `toggleClass` - переключает класс.
   Принимает в параметры элемент, название класса, и по необходимости - Логическое значение force.
   Если Логическое значение не указано вообще, метод «переключает» указанный атрибут className — удаляя его, если он присутствует, или добавляя, если он отсутствует. если Логическое значение - true, метод добавляет атрибут с именем className, если false - удаляет атрибут с именем className.

 - `setText` - устанавливает текстовое содержимое элементу.
   Принимает в параметры элемент и значение, которое нужно установить.

 - `setDisabled` - меняет статус блокировки.
   Принимает в параметры элемент и сатус, при котором необходима блокировка.

 - `setHidden` - скрывает элемент.
   Принимает в параметры элемент, который необходимо скрыть.

 - `setVisible` - показывает элемент.
   Принимает в параметры элемент, который необходимо показать.

 - `setImage` - устанавливает изображение с алтернативным текстом
   Принимает в параметры элемент картинки, адрес и, по необходимости, описание (алтернативный текст)

 - `render` - вставляет корневой DOM-элемент в разметку.     
    Принимает ....
    Возвращает корневой DOM-элемент.

    render(data?: Partial<T>): HTMLElement {
        Object.assign(this as object, data ?? {});
        return this.container;
    }

#### Класс EventEmitter

Брокер событий. Позволяет отправлять события и подписываться на события, происходящие в системе. Класс используется в презентере для обработки событий и в слоях приложения для генерации событий. Основные методы, реализуемые классом описаны интерфейсом `IEvents`.

Методы: 
 - `emit` - инициирует событие. 
   Принимает в параметры имя события и данные, которые будут переданы в качестве параметров для функций обработчиков.

 - `on` - устанавливает слушатель на событие (заменяет addEventListener). 
   Принимает в параметры название события и функцию callback.

 - `off` - снимает слушатель с события.
   Принимает в параметры название события и функцию callback. 

 - `onAll` - устанавливает слушатель на все события.  
   Принимает в параметр функцию callback. 

 - `offAll` - снимает все слушатели. 

 - `trigger` - возвращает функцию, при вызове которой инициализируется требуемое в параметрах событие.

### Компоненты модели данных (бизнес-логика)

#### Класс CardData

Хранит массив карточек товара. Отвечает за хранение и логику работы с данными карточек.

В полях класса хранятся следующие данные: 
- _cards: ICard[] - массив объектов карточек
- _selectedCardId: string | null - id карточки, выбранной для просмотра в модальном окне
- events: IEvents - экземпляр класса `EventEmitter` для инициации событий при изменении данных.

Методы класса:

- `getCard(cardId:string): ICard` - возвращает карточку по её id.
- `setSelectedCard(cardId: string): void` - передаёт id выбранной карточки
- `getSelectedCard(): ICard` - возвращаем выбранную карточку
- геттеры и сеттеры для сохранения и получения данных их полей класса.

#### Класс OrderData

Хранит данные о заказе. Отвечает за хранение и работу с данными заказа.

В полях класса хранятся следующие данные: 
- _payment: string - способ оплаты
- _email: string - электронная почта покупателя
- _phone: string - телефон покупателя
- _address: string - адрес доставки
- events: IEvents - экземпляр класса `EventEmitter` для инициации событий при изменении данных.

Методы класса:

- `getOrder(): IOrder` - возвращает заказ
- `setField(field: keyof IOrder, value: string): void` - задаёт значения полей форм
- `setErrors(): TOrderError` - возвращает массив ошибок
- `clear(): void` - очистка значений полей заказа

#### Класс BasketData

Хранит данные корзины. Отвечает за хранение и работу с данными.

В полях класса хранятся следующие данные: 
- cardsBasket: ICard[] - массив объектов карточек, выбранных для оформленния заказа
- events: IEvents - экземпляр класса `EventEmitter` для инициации событий при изменении данных.

Методы класса:

- `getTotal(): number` - возвращает общую сумму корзины
- `contains` - проверяет на наличие карточки в корзине
- `add(card: ICard): void` - добавляет карточку в корзину
- `remove(id: string): void` - удаляет карточку из корзины
- `getBasketList(): void` - возвращает список в корзине.Нумерует карточки
- `getLengthBasketList():number` - Возвращает длину массива заказа
- `getIdBasketList(): string[]` - Возвращаем id карточек для передачи на сервер
- `clear(): void` - очищает корзину
- а также геттер для получения данных из поля класса

### Компоненты представления

Все классы представления отвечаю за отображение внутри контейнера (DOM-элемент) передаваемых в них данных.

#### Класс Card

Отвечает за отображение карточки, задавая в карточке данные названия, описания, изображения, категории и стоимости. Класс используется для отображения карточек на странице сайта, в модальном окне preview и корзине. В конструктор класса передается DOM элемент темплейта, что позволяет при необходимости формировать карточки разных вариантов верстки. В классе устанавливаются слушатели на все интерактивные элементы, в результате взаимодействия с которыми пользователя генерируются соответствующие события.\
Поля класса содержат элементы разметки элементов карточки. Конструктор, кроме темплейта принимает экземпляр `EventEmitter` для инициации событий.

Методы:

- `setColorCategory(categoryName: string): void` - изменяет цвет категории в зависимости от названия.
- `changeTextButton(value: boolean): void` - меняет текст кнопки при добавлении товара в корзину.
- `render(): HTMLElement` - метод возвращает полностью заполненную карточку с установленными слушателями
- сеттеры для сохранения данных в поля класса

#### Класс Page
Отвечает за отображение главной страницы и её элементов - галереи и иконки корзины. Предоставляет метод `addCards(cardElement: HTMLElement)` для вывода карточек на страницу.\
В классе устанавливаются слушатели на все интерактивные элементы, в результате взаимодействия с которыми пользователя генерируются соответствующие события.\
Конструктор, кроме темплейта принимает экземпляр `EventEmitter` для инициации событий.

Методы:

- `blockPageScroll(value: boolean): void` - блокирует прокрутку страницы при открытии модального окна
- сеттеры для сохранения данных в поля класса

#### Класс Modal

Реализует модальное окно. Так же предоставляет методы `openModal` и `closeModal` для управления отображением модального окна. Устанавливает слушатели на клавиатуру, для закрытия модального окна по Esc, на клик в оверлей и кнопку-крестик для закрытия попапа. \
Метод `render(): HTMLElement` возвращает полностью заполненную карточку с установленными слушателями

Конструктор, кроме темплейта принимает экземпляр `EventEmitter` для инициации событий.

Поле класса
- modalContent: HTMLElement - элемент модального окна

#### Класс Basket

Отвечает за отображение корзины. Класс используется для отображения выбранных для заказа карточеки общей суммы заказа. В конструктор класса передается DOM элемент темплейта и экземпляр `EventEmitter` для инициации событий. В классе устанавливаются слушатели на все интерактивные элементы, в результате взаимодействия с которыми пользователя генерируются соответствующие события.

Поля класса
- total: number - общая сумма заказа
- items: HTMLElement[] - массив выбранных карточек

Методы:

- `render(): HTMLElement` - метод возвращает полностью заполненную карточку с установленными слушателями
- сеттеры для сохранения данных в поля класса

#### Класс Form

Реализует форму в модальном окне. 
Устанавливает слушатели на все интерактивные элементы, в результате взаимодействия с которыми пользователя генерируются соответствующие события.

Поля класса:

- error: string - отображение ошибки
- valid: boolean - смена блокировки кнопки

Методы:

- `showInputError(errorMessage: string): void` - показывает ошибку
- `hideInputError(): void` - скрывает ошибку
- сеттеры для сохранения данных в поля класса

#### Класс Payment

Отвечает за заполнение формы Order. Класс используется для заполнения способа оплаты и адреса доставка. В конструктор класса передается DOM элемент темплейта и экземпляр `EventEmitter` для инициации событий. В классе устанавливаются слушатели на все интерактивные элементы, в результате взаимодействия с которыми пользователя генерируются соответствующие события.\ 
Используются сеттеры для сохранения данных в поля класса

Поля класса
- payment: string - способ оплаты
- address: string - адрес доставки

#### Класс Contacts

Отвечает за заполнение формы Contacts. Класс используется для заполнения телефона и электронной почты заказчика. В конструктор класса передается DOM элемент темплейта и экземпляр `EventEmitter` для инициации событий.\ 
Используются сеттеры для сохранения данных в поля класса

Поля класса
- email: string - электронная почтка
- phone: string - телефон

#### Класс Success

Отвечает за отображение успешного заказа в модальном окне Success. В конструктор класса передается DOM элемент темплейта и экземпляр `EventEmitter` для инициации событий. В классе устанавливается слушатель на кнопку для взаимодействия пользователя.\ 
Используются сеттеры для сохранения данных в поле класса

Поля класса
- total: number - общая сумма заказа

### Слой коммуникации

#### Класс AppApi
Принимает в конструктор экземпляр класса Api и предоставляет методы реализующие взаимодействие с бэкендом сервиса.

## Взаимодействие компонентов
Код, описывающий взаимодействие представления и данных между собой находится в файле `index.ts`, выполняющем роль презентера.\
Взаимодействие осуществляется за счет событий генерируемых с помощью брокера событий и обработчиков этих событий, описанных в `index.ts`\
В `index.ts` сначала создаются экземпляры всех необходимых классов, а затем настраивается обработка событий.

*Список всех событий, которые могут генерироваться в системе:*\

*События изменения данных (генерируются классами моделями данных)*

- `basket:changed` - изменение массива выбранных для заказа карточек
- `order:changed` - изменение данных заказа

*События, возникающие при взаимодействии пользователя с интерфейсом (генерируются классами, отвечающими за представление)*
- `modalPreview:open` - открытие модального окна просмотра карточки
- `modalPreview:submit` - добавление и удаление карточки из корзины
- `basketCard: delete` - удаление карточки из корзины
- `basket:submit` - открытие модального окна способа оплаты
- `basket:open` - открытие модального окна корзины
- `form:change` - обновление полей формы
- `order:submit` - открытие модального окна контактов покупателя
- `contacts:submit` - открытие модального окна успешной сделки
- `modal:open` - открытие модального окна
- `modal:close` - закрытие модального окна
- `success:close` - событие, генерируемое при нажатии "За новыми покупками" в форме успешного заказа

## Размещение в сети

Проект не размещён в сети. Но готов к проверке