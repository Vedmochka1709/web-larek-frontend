import { ICard, ICardData } from "../../types";
import { IEvents } from "../base/events";

export class CardData implements ICardData {
    protected _cards: ICard[]
    protected _selectedCardId: string | null   // id карточки, выбранной для просмотра в модальном окне
    
    constructor(protected events: IEvents) {    }
    
    // Получаем массив карточек
    set cards(cards: ICard[]) {
        this._cards = cards;
    }

    get cards () {
        return this._cards
    }

    setCard(id: string) {
        this._selectedCardId = id;
    }

    // Находим карточку по её id
    getCard(id: string): ICard {
        return this._cards.find(card => card.id === id)
    }

    // Передаём карточки со свойством Selected
    setSelectedCard(cardId:string): void {
        this._selectedCardId = cardId;
    }

    // Получаем карточки со свойством Selected
    getSelectedCard(): ICard {
        return this.cards.find(card => card.id === this._selectedCardId)!;
    }
}