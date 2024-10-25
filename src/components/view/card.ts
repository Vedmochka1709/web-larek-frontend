/*import { ICard } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/component";

export class Card extends Component<ICard> {
    
    //protected cardCatalog: HTMLButtonElement;
    protected _image: HTMLElement
    protected _category: HTMLElement
    protected _title: HTMLElement 
    protected _price: HTMLElement
    protected _description: HTMLElement
   
    constructor (protected conteiner: HTMLElement, /*ивент имитер ) {
        super(conteiner)

       // this.cardCatalog = ensureElement('.gallery__item', this.container) as HTMLButtonElement;
        this._image = ensureElement('.card__image', this.container)
        this._category = ensureElement('.card__category', this.container)
        this._title = ensureElement('.card__title', this.container)      
        this._price = ensureElement('.card__price', this.container)
        this._description = ensureElement('.card__text', this.container)   // или через квелиселектор???
    }
    
    // заполняет атрибуты элементов карточки данными
    setData(cardData: ICard): void {    }

    // определяет, помещён ли товар уже в корзину
    isSelected(): boolean { }
    
    // удаление карточки из корзины
    deleteCard(): void {}
    
    // возвращает полностью заполненную карточку с установленными слушателями
    render(): HTMLElement {}

    set id (id:string): string {}

    get id (): string {}
}*/