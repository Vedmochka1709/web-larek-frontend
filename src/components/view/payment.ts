import { IForm } from "../../types";
import { ensureAllElements, ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";
import { Form } from "./Form";

export class Payment extends Form<IForm> {
   
    protected buttonPayment: HTMLButtonElement[]
    protected addressDelivery: HTMLInputElement;
    

    constructor(protected container: HTMLTemplateElement, protected events: IEvents) {
        super(container, events);

        this.buttonPayment = ensureAllElements('button[type=button]', this.container);
        this.addressDelivery = ensureElement('.address', this.container) as HTMLInputElement;

        this.buttonPayment?.forEach(button => {
            button.addEventListener('click', (evt) => {
                const currenButton = evt.target as HTMLButtonElement
                this.payment = currenButton.name
                
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

/*export class Payment extends Form<IForm> {
   
    protected buttonPayment: HTMLButtonElement[]
    protected addressDelivery: HTMLInputElement;
    protected paymentElement: HTMLElement

    constructor(protected form: HTMLTemplateElement, protected events: IEvents) {
        super(form, events);
        
        this.paymentElement = cloneTemplate(form)

        this.buttonPayment = ensureAllElements('button[type=button]', this.paymentElement);
        this.addressDelivery = ensureElement('.address', this.paymentElement) as HTMLInputElement;

        this.buttonPayment?.forEach(button => {
            button.addEventListener('click', () => {
                this.events.emit('form:change', { field: 'payment', value: button.name })
                // TODO: сделать выделение кнопки
            })
        })
    }
    
    set payment(name: string) { // передаём название кнопки
        this.buttonPayment.forEach(button => {
            this.toggleClass(button, 'button_alt-active', button.name === name)
        });
    }

    set address(value: string) {
        this.setText(this.addressDelivery, value)
    }

    // Возвращаем DOM- элемент
    render(data: Partial<IForm>): HTMLElement {
        Object.assign(this as object, data)
        return  this.paymentElement
    }
} */