import { ICard, ICardData } from "../../types";
import { IEvents } from "../base/events";

export class CardData implements ICardData {
    protected _cards: ICard[]
    protected _selectedCardId: string | null   // id карточки, выбранной для просмотра в модальном окне
    
    constructor(protected events: IEvents) {    }
    
    // Получаем массив карточек
    set cards(cards: ICard[]) {
        this._cards = cards;
        this.events.emit('cards:changed')  // добавляем из-за присвоения свойства Selected?
    }

    get cards () {
        return this._cards
    }

    setCard(id: string) {
        this._selectedCardId = id;
        this.events.emit('selected-card:changed'); // TODO: ???
    }

    // Находим карточку по её id
    getCard(): ICard {
        return this._cards.find(card => card.id === this._selectedCardId)
    }

    // Передаём карточки со свойством Selected
    setSelectedCard(cardId:string): void {
        this._selectedCardId = cardId;
        this.events.emit('cards:changed');
    }

    // Получаем карточки со свойством Selected
    getSelectedCard(): ICard {
        return this.cards.find(card => card.id === this._selectedCardId)!;
    }
}
/**- `cards:changed` - изменение массива карточек
- `counterOrder:changed` - изменение количества карточек в корзине
- `card:selected` - изменение открываемой в модальном окне картинки карточки
- `card:previewClear` - необходима очистка данных выбранной для показа в модальном окне карточки */
