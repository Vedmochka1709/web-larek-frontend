import { ApiListResponse, IApi, ICard, TDataOrder, TSuccess } from "../types"

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

    postOrderAll (data: TDataOrder): Promise<TSuccess> {
        console.log(data)
        return this._baseApi.post('/order', data, 'POST')
        .then((result: TSuccess) => result);
    }
}