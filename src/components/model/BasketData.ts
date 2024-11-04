import { IBasketData, ICard, TBasketCard } from "../../types";
import { IEvents } from "../base/events";

export class BasketData implements IBasketData {
    protected _cardsBasket: ICard[] = []
    protected _total: number

    constructor(protected events: IEvents) { }

    get cardsBasket () {
        return this._cardsBasket
    }

    // Получаем общую сумму корзины
    get total():number {
        if (!this._cardsBasket.length) return 0;
        return this._cardsBasket.map((item) => item.price).reduce((a, b) => a + b);
    }

    // Проверка на наличие
    contains(id: string): boolean {
        return this._cardsBasket.some(item => item.id === id);
    }

    // Добавляем карточку в корзину    
    add(card: ICard): void {
        if (!this.contains(card.id)) {
            this._cardsBasket.push(card);   // возвращает новую длину массива
            this.events.emit('basket:changed')
        }
    }

    // Удаляем карточку из корзины
    remove(id: string): void {
        if (this.contains(id)) {
            this._cardsBasket = this._cardsBasket.filter(item => item.id !== id);
            this.events.emit('basket:changed')
        }
    }

    // Получаем список в корзине Нумеруем карточки
    getBasketList(): TBasketCard[] {
        return this._cardsBasket.map((item, index) => {
            return {
                id: item.id,
                title: item.title,
                price: item.price,
                index: index + 1
            }
        })
    }

    // Возвращает длину массива заказа
    getLengthBasketList():number {
        return this._cardsBasket.length ?? 0;
    }

    // Возвращаем ID карточек для передачи на сервер
    getIdBasketList(): string[] {
        return this._cardsBasket.map(card => card.id);
    }
    
    // Очистка корзины
    clear(): void {
        this._cardsBasket = [];
        this.events.emit('basket:changed')
    }
}
