/*import { ensureElement } from "../../utils/utils";
import { Component } from "../base/component";
import { EventEmitter } from "../base/events";

interface iPage {
    gallary: HTMLElement[],
    counterBasket: number,
    iconBasket: HTMLElement
}

export class CardsContainer extends Component<iPage> {
    protected gallaryContainer: HTMLElement;
  //  protected countBasket: HTMLElement;
   // protected iconButtonBasket: HTMLButtonElement

    constructor (container: HTMLElement) {
        super(container)

       // this.countBasket = ensureElement('.header__basket-counter', this.container);
        this.gallaryContainer = ensureElement('.gallery', this.container);
       // this.iconButtonBasket = ensureElement('.header__basket', this.container)  as HTMLButtonElement; 

       /* this.iconButtonBasket.addEventListener('click', () => this.events.emit('icon:click', this.)) - надо ли?*/ 
    /*}

    // Заполение контентом
    getCards(cardElement: HTMLElement) {
        
    }

    /*//* Отображение счётчика на иконке корзины
    set counterBasket(value:number) {
        this.setText(this.countBasket, value)
    }
    // Получение данных счётчика на иконке корзины
    get counterBasket() {
        return Number(this.countBasket.textContent)
    }
}
*/