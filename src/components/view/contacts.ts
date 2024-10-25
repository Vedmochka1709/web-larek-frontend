/*import { iOrder } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/component";

export class Contacts extends Component<iOrder>{
    protected emailUser: HTMLElement 
    protected phoneUser: HTMLElement
    protected payButton: HTMLButtonElement

    constructor (container: HTMLElement) {
        super(container)

        this.emailUser = ensureElement('.email', this.container);
        this.phoneUser = ensureElement('.phone', this.container);
        this.payButton = ensureElement('.pay_button', this.container) as HTMLButtonElement;

      // слушатели
    }

    // Сеттер для отображения почты
    set email(value: string) {
        this.setText(this.emailUser, value)
    }

    // Сеттер для отображения Адреса
    set phone(value: string) {
        this.setText(this.phoneUser, value)
    }

    // Изменение отображения кнопки оплаты. Если true - остаётся заблокированным, если false - снимается disabled
    set disabled(state: boolean) {  
        this.setDisabled(this.payButton, state)
    }
    
    // ----
    render(data:Partial<iOrder>): HTMLElement {
        Object.assign(this as object, data)
        return this.container
    }

}*/