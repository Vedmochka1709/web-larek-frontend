import { ICard } from "../../types";
import { CDN_URL } from "../../utils/constants";
import { cloneTemplate, createElement, ensureElement } from "../../utils/utils";
import { Component } from "../base/component";
import { IEvents } from "../base/events";

interface ICardActions {
    onClick: (event: MouseEvent) => void;
}

export class Card extends Component<ICard> {

    protected cardElement: HTMLElement;
    protected _image: HTMLImageElement
    protected _category: HTMLElement
    protected _title: HTMLElement
    protected _price: HTMLElement
    protected _description: HTMLElement
    protected _id: string
    protected _index: HTMLElement;
    protected cardButton: HTMLButtonElement;

    constructor(protected template: HTMLTemplateElement, protected events: IEvents) {
        super(template)

        this.cardElement = cloneTemplate(template)

        this._title = ensureElement('.card__title', this.cardElement);
        this._price = ensureElement('.card__price', this.cardElement);

        this._image = this.cardElement.querySelector('.card__image')
        this._category = this.cardElement.querySelector('.card__category')
        this._description = this.cardElement.querySelector('.card__text')
        this._index = this.cardElement.querySelector('.basket__item-index')
        this.cardButton = this.cardElement.querySelector('.card__button') // Кнопка в корзину и кнопка удалить
       

        if (this.cardElement.classList.contains('gallery__item')) {
            this.cardElement.addEventListener('click', () => {
                this.events.emit('modalPreview:open', {cardId: this._id})
            })
        }

      /*  if (this.cardButton) {
            if (!this.cardElement.classList.contains('selected') && this._description) {
                this.setText(this.cardButton, 'В корзину')
            } else if (this.cardElement.classList.contains('selected') && this._description) {
                this.setText(this.cardButton, 'Удалить из корзины')
            } 
        }*/

        if (this.cardButton) {
            this.cardButton.addEventListener('click', (event) => {
                event.preventDefault()
                if (!this.cardElement.classList.contains('selected') && this._description) {
                    this.cardElement.classList.add('selected')
                    this.setText(this.cardButton, 'Удалить из корзины')
                } else if (this.cardElement.classList.contains('selected') && this._description) {
                    this.cardElement.classList.remove('selected')
                    this.setText(this.cardButton, 'В корзину')
                } else if (this.cardElement.classList.contains('selected') && !this._description) {
                    this.cardElement.classList.remove('selected')
                }
            })
        }

    }
    set selected (value: boolean) {

    }

    set id(id: string) {
        this._id = id
    }

    set title(title: string) {
        this._title.textContent = title
    }

    set price(price: number) {
        if (price === null) {
            this._price.textContent = 'Бесценно'
        } else {
            this._price.textContent = `${price.toString()} синапсов`
        }
    }

    set description(description: string) {
        if (this._description) {
            this._description.textContent = description
        }
    }

    set category(category: string) {
        this._category.textContent = category
        // TODO: добавить разделение по цветам this.setColor(category)
    }
    /* protected setColor(category: string): void {
        const color = (Object.keys(CategoryColor) as (keyof typeof CategoryColor)[])
            .find(key => {
                return CategoryColor[key] === category
            });

        this.toggleClass(this._cardCategory, `card__category_${color}`, true);
    } */

    set image(link: string) {
        this.setImage(this._image, `${CDN_URL}${link}`, `${link}`)
    }

    set index(value: number) {
        this.setText(this._index, value);
    }

    // возвращает полностью заполненную карточку с установленными слушателями
    render(cardData: Partial<ICard>): HTMLElement {
        const { ...obj } = cardData
        Object.assign(this, obj)
        return this.cardElement
    }
}