/*import { iOrder } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/component";

export class Form extends Component<iOrder> {
    protected buttonOnline: HTMLButtonElement
    protected buttonOffline: HTMLButtonElement
    protected addressDelivery: HTMLElement
    protected nextButton: HTMLButtonElement

    constructor(protected container: HTMLElement) {
        super(container);
        this.buttonOnline = ensureElement('.button_online', this.container) as HTMLButtonElement;
        this.buttonOffline = ensureElement('.button_offline', this.container) as HTMLButtonElement;
        this.addressDelivery = ensureElement('.address', this.container);
        this.nextButton = ensureElement('.next_button', this.container) as HTMLButtonElement;

        //слушатели
    }

    // Сеттер для отображения адреса
    set address(value: string) {
        this.setText(this.addressDelivery, value)
    }

    // Изменение отображение кнопки далее. Если true - остаётся заблокированным, если false - снимается disabled
    set disabled(state: boolean) {
        this.setDisabled(this.nextButton, state)
    }

    /* // Изменение стилей кнопок
     set selected (value: string) {
         this.toggleClass(this._buttonOnline, класс, когда кнопка выбрана, value)
         this.toggleClass(this._buttonOffline, класс, когда кнопка невыбрана, value)
         this.toggleClass(this._buttonOnline, класс, когда кнопка невыбрана, !value)
         this.toggleClass(this._buttonOffline, класс, когда кнопка выбрана, !value)
     }*/

    // ----
    /*render(data: Partial<iOrder>): HTMLElement {
        Object.assign(this as object, data)
        return this.container
    }
}*/

