export interface ICard {
    id: string,
    description: string,
    image: string,
    title: string,
    category: string,
    price: number
}

export interface IOrder {                 // возвращается {
    payment: string,                      // "id": "28c57cb4-3002-4445-8aa1-2a06a5055ae5",
    email: string,                        //  "total": 2200}
    phone: string,
    address: string,
    total: number,
    items: ICard[]
}

export interface ICardData {
    cards: ICard[],
    preview: string | null   // для id конкретной карточки, чтобы её открыть
    addCardBasket(cardId:string, fn: Function|null): void,
    deleteCardBasket(cardId:string, fn: Function|null): void,
    getCard(cardId:string): ICard
}

export interface IOrderData {
    items: ICard[],
    getLengthOrder(items:ICard[]) : number,
    getSumOrder(items:ICard[]) : number,
    /*checkValidation (): boolean, // TODO: что в аргументах*/
}

export interface IApi {
    baseUrl: string;
    get<T>(uri: string): Promise<T>
    post<T>(uri: string, data: object, method?: ApiPostMethods):Promise<T>
}

//Pick<> - даёт возможность использовать часть типов

export type TCatalogCard = Pick<ICard, 'id'|'category'|'image'|'title'|'price'>

export type TBasket = Pick<IOrder, 'items'|'total'>

export type TPayment = Pick<IOrder, 'payment'|'address'>

export type TProfileBuyer = Pick<IOrder, 'email'|'phone'>

export type TSuccess = Pick<IOrder, 'total'>

export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';