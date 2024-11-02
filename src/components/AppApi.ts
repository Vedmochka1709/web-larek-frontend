import { ApiListResponse, IApi, ICard } from "../types"
import { Api } from "./base/api"

export class AppApi {
    private _baseApi: IApi

    constructor(baseApi: IApi) {
        this._baseApi = baseApi
    }

    // Получение массива карточек с сервера
    getCards(): Promise<ICard[]> {
        return this._baseApi.get(`/product/`)
            .then((data: ApiListResponse) =>
                data.items.map(item => ({
                    ...item
                })))
    }


    // TODO: Отправка выбранной карточки в корзину addCardBasket(cardId: string):Promise<ICard[]> {return this._baseApi.post<ICard[]>(`/order`, data, 'PATCH').then((res: ICard[]) => res)}
    // TODO: Получение массива выбранных карточек getCardBasket():Promise<ICard[]> {return this._baseApi.get<ICard[]>(`/order`).then((items: ICard[]) => items)}
    // Удаление карточки deleteCardBasket(cardId: string):Promise<ICard[]> {return this._baseApi.post<ICard[]>(`/order`, {}, 'DELETE').then((res: ICard[]) => res)}

    // Отправка способа оплаты
    // Отправка электронной почты
    // Отправка адреса
    // Отправка номера телефона


}