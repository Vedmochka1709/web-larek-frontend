import { IForm, } from "../../types";
import { cloneTemplate, ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";
import { Form } from "./Form";

export class Contacts extends Form<IForm> {
    protected emailUser: HTMLInputElement 
    protected phoneUser: HTMLInputElement
    protected contactsElement: HTMLElement

    constructor (protected form: HTMLTemplateElement, protected events: IEvents) {
        super(form, events)

        this.contactsElement = cloneTemplate(form)

        this.emailUser = ensureElement('.email', this.contactsElement) as HTMLInputElement;
        this.phoneUser = ensureElement('.phone', this.contactsElement) as HTMLInputElement;
    }

    // Сеттер для отображения почты
    set email(value: string) {
        this.setText(this.emailUser, value)
    }

    // Сеттер для отображения Адреса
    set phone(value: string) {
        this.setText(this.phoneUser, value)
    }

    // Возвращаем DOM- элемент
    render(data: Partial<IForm>): HTMLElement {
        Object.assign(this as object, data)
        return  this.contactsElement
    }
}