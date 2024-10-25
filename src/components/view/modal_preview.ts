/*import { iProduct } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/component";

export class CardPreview extends Component<iProduct> {
    
    protected cardConteiner: iProduct[];
    protected imageCard: HTMLElement
    protected categoryCard: HTMLElement
    protected titleCard: HTMLElement 
    protected descriptionCard: HTMLElement
    protected priceCard: HTMLElement
    protected buttonCard: HTMLButtonElement


    constructor (protected conteiner: HTMLElement) {
        super(conteiner)

        this.cardConteiner = []; // или card_full??
        this.imageCard = ensureElement('.card__image', this.container)
        this.categoryCard = ensureElement('.card__category', this.container)
        this.titleCard = ensureElement('.card__title', this.container)
        this.descriptionCard = ensureElement('.card__text', this.container)        
        this.priceCard = ensureElement('.card__price', this.container)
        this.buttonCard = ensureElement('.card-preview_button', this.container) as HTMLButtonElement;
    }
    
    // открытие модального окна при ножатии на карточку
}*/