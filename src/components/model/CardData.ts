import { ICard, ICardData } from "../../types";
import { IEvents } from "../base/events";

export class CardData implements ICardData {
    protected _cards: ICard[]
    protected _preview: string | null   // id карточки, выбранной для просмотра в модальном окне
    protected events: IEvents

    constructor(events: IEvents) {
        this.events = events;
    }
    
    // Получаем массив карточек
    set cards(cards: ICard[]) {
        this._cards = cards;
        this.events.emit('cards:changed')
    }

    get preview () {    // не проверен метод
        return this._preview
    }

    // Находим карточку по её id
    getCard(cardId:string): ICard {
        return this._cards.find(card => card.id === cardId)
    }

    // Добавляет карточку в массив заказа
    addCardBasket(cardId:string, fn: Function|null): void {
        /*if (!cardId) {
            items =
        }*/
    }

    // удаляет карточку из массива заказа
    deleteCardBasket(cardId:string, fn: Function|null): void {

    }
}
/**- `cards:changed` - изменение массива карточек
- `counterOrder:changed` - изменение количества карточек в корзине
- `card:selected` - изменение открываемой в модальном окне картинки карточки
- `card:previewClear` - необходима очистка данных выбранной для показа в модальном окне карточки */
