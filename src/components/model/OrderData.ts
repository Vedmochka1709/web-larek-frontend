import { ICard, IOrderData } from "../../types";
import { IEvents } from "../base/events";

export class OrderData implements IOrderData {
    protected _items: ICard[]
    protected _payment: string
    protected _email: string
    protected _phone: string
    protected _address: string
    protected events: IEvents

    constructor(events: IEvents) {
        this.events = events;
    }

    // массив объектов карточек, выбранных для оформленния заказа
    get items() {
        return this._items
    }

   // TODO: геттеры и сеттеры

    // возвращает длину массива заказа
    getLengthOrder(items: ICard[]) {
        return items.length
    }

    // возвращает общую сумму массива заказа
    getSumOrder(items: ICard[]) {
        return items.reduce((sum, item) => {
            return sum + item.price
        }, 0)
    }

    /*checkValidation (): boolean  // TODO: проверяет форму на валидность    */
}
