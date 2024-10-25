import { IApi, ICard } from "../types"
import { Api, ApiListResponse } from "./base/api"

export class AppApi {
    private _baseApi: IApi

    constructor(baseApi: IApi) {
        this._baseApi = baseApi
    }

    // Получение массива карточек с сервера

    getCards(): Promise<ICard[]> {
        return this._baseApi.get(`/product/`)
            .then((data: ApiListResponse<ICard>) => 
                data.map(x => x.items))
    }

    /*getCards(): Promise<ICard[]> {
        return this._baseApi.get(`/product/`).then((data: ApiListResponse<ICard>) => data)
    }
    /*
.then ((data) => {
        console.log(data)
        const result = data.map(x => x.items)
        cardData.cards = result
       
        console.log(cardData.getCard("854cef69-976d-4c2a-a18c-2aa45046c390"))
    */

    // TODO: Отправка выбранной карточки в корзину addCardBasket(cardId: string):Promise<ICard[]> {return this._baseApi.post<ICard[]>(`/order`, data, 'PATCH').then((res: ICard[]) => res)}
    // TODO: Получение массива выбранных карточек getCardBasket():Promise<ICard[]> {return this._baseApi.get<ICard[]>(`/order`).then((items: ICard[]) => items)}
    // Удаление карточки deleteCardBasket(cardId: string):Promise<ICard[]> {return this._baseApi.post<ICard[]>(`/order`, {}, 'DELETE').then((res: ICard[]) => res)}

    // Отправка способа оплаты
    // Отправка электронной почты
    // Отправка адреса
    // Отправка номера телефона


}