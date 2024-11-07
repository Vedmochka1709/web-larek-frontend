import { IForm, TProfileBuyer, } from "../../types";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";
import { Form } from "./For";

export class Contacts extends Form<IForm> implements TProfileBuyer {
    protected emailUser: HTMLInputElement 
    protected phoneUser: HTMLInputElement

    constructor (protected container: HTMLTemplateElement, protected events: IEvents) {
        super(container, events)

        this.emailUser = ensureElement('.email', this.container) as HTMLInputElement;
        this.phoneUser = ensureElement('.phone', this.container) as HTMLInputElement;
    }

    // Сеттер для отображения почты
    set email(value: string) {
        this.emailUser.value = value
    }

    // Сеттер для отображения Адреса
    set phone(value: string) {
        this.phoneUser.value = value
    }
}