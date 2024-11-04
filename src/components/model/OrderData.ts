import { ICard, IOrderData } from "../../types";
import { IEvents } from "../base/events";

export class OrderData implements IOrderData {
    protected _payment: string
    protected _email: string
    protected _phone: string
    protected _address: string
    protected events: IEvents

    constructor(events: IEvents) {
        this.events = events;
    }

   // TODO: геттеры и сеттеры

    /*checkValidation (): boolean*/ // TODO: проверяет форму на валидность 
}