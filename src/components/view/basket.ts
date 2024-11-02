import { ensureElement } from "../../utils/utils";
import { Component } from "../base/component";
import { IEvents } from "../base/events";

/*<h2 class="modal__title">Корзина</h2>
					<ul class="basket__list">
                    <button class="button">Оформить</button>
						<span class="basket__price">153 250 синапсов</span>*/
interface IBasket {
    items: HTMLElement
    total: number
}

export class Basket extends Component<IBasket> {
 
    protected titleBusket: HTMLElement
    protected basketListConteiner: HTMLElement;
    protected basketOrderButton: HTMLButtonElement;
    protected totalSum: HTMLElement;

    constructor(protected container: HTMLElement, protected events: IEvents) {
        super(container, events);
        this.events = events

        this.basketListConteiner = ensureElement('.basket__list', this.container);
        this.basketOrderButton = ensureElement('.basket__button', this.container) as HTMLButtonElement;
        this.totalSum = ensureElement('.basket__price', this.container);

        this.basketOrderButton.addEventListener('click', () => {
            this.events.emit('basket:close') 
            this.events.emit('Order:open') 
        });
    }
/*checkValidation (): boolean  // TODO: проверяет форму на валидность    */
    // Получение общей суммы
    set total(value: number) {
        this.setText(this.totalSum, value)
    }

    // Заполнение контентом
    set items(items:HTMLElement[]) {
        this.basketListConteiner.replaceChildren(...items)
    }
}