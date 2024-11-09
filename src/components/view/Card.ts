import { ICard } from "../../types";
import { CDN_URL } from "../../utils/constants";
import { cloneTemplate, ensureElement } from "../../utils/utils";
import { Component } from "../base/component";
import { IEvents } from "../base/events";

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
                this.events.emit('modalPreview:open', { cardId: this._id })
            })
        }

        if (this.cardButton) {
            this.cardButton.addEventListener('click', () => {
                if (this.cardButton && this._description) {   // Кнопка в модальном окне
                    this.events.emit('modalPreview:submit', { cardId: this._id })
                } else if (this.cardButton && !this._description) {  // Кнопка удалить в корзине
                    this.events.emit('basketCard: delete', { cardId: this._id })
                }
            })
        }
    }

    set id(id: string) {
        this._id = id
    }

    set title(title: string) {
        this.setText( this._title, title)
    }

    set price(price: number) {
        if (price === null) {
            this.setText(this._price, 'Бесценно')
            if (this.cardButton) {
                this.setDisabled( this.cardButton, true)
            }
        } else {
            this.setText(this._price, `${price.toString()} синапсов`)
        }
    }

    set description(description: string) {
        if (this._description) {
            this.setText( this._description, description)
        }
    }

    set category(categoryName: string) {
        this.setText( this._category, categoryName)
        this.setColorCategory(categoryName)
    }

    // Категории по цветам
    protected setColorCategory(categoryName: string): void {
        const colorsCategory: { [key: string]: string } = {
            "софт-скил": "soft",
            "хард-скил": "hard",
            "другое": "other",
            "дополнительное": "additional",
            "кнопка": "button"
        }

        const keys = (Object.keys(colorsCategory))
        keys.forEach((key) => {
            if (key === categoryName) {
                this.toggleClass(this._category, `card__category_${colorsCategory[key]}`, true)
            }
        })
    }

    set image(link: string) {
        this.setImage(this._image, `${CDN_URL}${link}`, `${link}`)
    }

    set index(value: number) {
        this.setText(this._index, value);
    }

    // Смена текста кнопки
    changeTextButton(value: boolean) {
        if (value) {
            this.setText(this.cardButton, 'Удалить из корзины')
        } else {
            this.setText(this.cardButton, 'В корзину')
        }
    }

    // возвращает полностью заполненную карточку с установленными слушателями
    render(cardData: Partial<ICard>): HTMLElement {
        const { ...obj } = cardData
        Object.assign(this, obj)
        return this.cardElement
    }
}