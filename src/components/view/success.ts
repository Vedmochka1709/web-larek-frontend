import { TSuccess } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/component";
import { IEvents } from "../base/events";


export class Success extends Component<TSuccess> {
    protected statusSuccess: HTMLElement
    protected buttonSuccess: HTMLButtonElement

    constructor(protected container: HTMLTemplateElement, protected events: IEvents) {
        super(container)

        this.statusSuccess = ensureElement('.order-success__description', this.container);
        this.buttonSuccess = ensureElement('.order-success__close', this.container) as HTMLButtonElement;

        this.buttonSuccess.addEventListener('click', () => {
            this.events.emit('success:close')
        });
    }

    // Сеттер для отображения почты
    set total(value: number) {
        this.setText(this.statusSuccess, `Списано ${value} синапсов`)
    }
}