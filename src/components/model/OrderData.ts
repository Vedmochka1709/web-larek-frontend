import { IOrder, IOrderData, TOrderError } from "../../types";
import { IEvents } from "../base/events";

export class OrderData implements IOrderData { //TODO: заполнить интерфейс методами
    protected _order: IOrder = {
        payment: '',
        email: '',
        phone: '',
        address: ''
    }
    
    constructor(protected events: IEvents) {}    

    // Получаем значение заказа
    getOrder() {                                               // возвращается {
        const order = { ...this._order }                       // "id": "28c57cb4-3002-4445-8aa1-2a06a5055ae5",
        return Object.freeze(order);                           //  "total": 2200} 
       //return  order
    }

    // Поля формы
    setField(field: keyof IOrder, value: string) {
        this._order[field] = value;
        this.events.emit('order:changed');
    }

    // Валидация заказа
    setErrors() {
        const errors: TOrderError = {};

        if (!this._order.payment) {
            errors.payment = 'Необходимо выбрать способ оплаты'
        }
        if (!this._order.address) {
            errors.address = 'Необходимо указать адрес доставки'
        }
        if (!this._order.email) {
            errors.email = 'Необходимо указать email'
        }
        if (!this._order.phone) {
            errors.phone = 'Необходимо указать телефон'
        }

        return errors;
    } 

    // очистка заказа TODO:
    clear() {
        /*(Object.keys(this._order) as (keyof typeof this._order)[])
            .forEach(key => { this._order[key] = '' });

        this.events.emit('order:changed')*/
    }
}