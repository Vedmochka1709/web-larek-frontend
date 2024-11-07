import { IForm, TPayment } from "../../types";
import { ensureAllElements, ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";
import { Form } from "./For";

export class Payment extends Form<IForm> implements TPayment {

    protected buttonPayment: HTMLButtonElement[]
    protected addressDelivery: HTMLInputElement;

    constructor(protected container: HTMLTemplateElement, protected events: IEvents) {
        super(container, events);

        this.buttonPayment = ensureAllElements('button[type=button]', this.container);
        this.addressDelivery = ensureElement('.address', this.container) as HTMLInputElement;

        this.buttonPayment?.forEach(button => {
            button.addEventListener('click', (evt) => {
                const currentButton = evt.target as HTMLButtonElement
                this.payment = currentButton.name

                this.events.emit('form:change', { field: 'payment', value: button.name })
            })
        })
    }

    set payment(name: string) { // передаём название кнопки для выделения
        this.buttonPayment.forEach(button => {
            this.toggleClass(button, 'button_alt-active', button.name === name)
        });
    }

    set address(value: string) {
        this.addressDelivery.value = value
    }
}