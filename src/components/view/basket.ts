/*import { iOrder } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/component";
import { IEvents } from "../base/events";

export class Basket extends Component<iOrder> {
 
    protected basketListConteiner: HTMLElement;
    protected basketOrderButton: HTMLButtonElement;
    protected totalSum: HTMLElement;

    constructor(protected container: HTMLElement, protected events: IEvents) {
        super(container);
        
        this.basketListConteiner = ensureElement('.basket__list', this.container);
        this.basketOrderButton = ensureElement('.basket__button', this.container) as HTMLButtonElement;
        this.totalSum = ensureElement('.basket__price', this.container);

        //слушатели
    }

    // Получение общей суммы
    set total(value: number) {
        this.setText(this.totalSum, value)
    }

    // Заполнение контентом
    set items(items:HTMLElement[]) {
        this.basketListConteiner.replaceChildren(...items)
    }
}*/