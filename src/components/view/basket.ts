import { IBasket } from "../../types";
import { cloneTemplate, ensureElement } from "../../utils/utils";
import { Component } from "../base/component";
import { IEvents } from "../base/events";

export class Basket extends Component<IBasket> {

    protected basketElement: HTMLElement;
    protected basketListContainer: HTMLElement;
    protected basketOrderButton: HTMLButtonElement;
    protected totalSum: HTMLElement;
    protected basketItemIndex: HTMLSpanElement;

    constructor(protected template: HTMLTemplateElement, protected events: IEvents) {
        super(template);

        this.basketElement = cloneTemplate(template)

        this.basketListContainer = ensureElement('.basket__list', this.basketElement);
        this.basketOrderButton = ensureElement('.basket__button', this.basketElement) as HTMLButtonElement;
        this.totalSum = ensureElement('.basket__price', this.basketElement);
        this.basketItemIndex = this.basketElement.querySelector('.basket__item-index');

        this.basketOrderButton.addEventListener('click', () => {
            this.events.emit('basket:submit') // при этом закрывается корзина и открывается окно order
        });
    }

    // Получение общей суммы
    set total(value: number) {
        if (value) {
            this.setText(this.totalSum, `${value} синапсов`)
            this.basketOrderButton.disabled = false
        } else {
            this.setText(this.totalSum, `0 синапсов`)
            this.basketOrderButton.disabled = true
        }
    }

    // Заполнение контентом
    set items(cards: HTMLElement[]) {
        this.basketListContainer.replaceChildren(...cards)
    }

    render(data?: IBasket): HTMLElement {
        Object.assign(this as object, data ?? {});
        return this.basketElement;
    }
}