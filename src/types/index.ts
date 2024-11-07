export interface ICard {
    id: string,
    description: string,
    image: string,
    title: string,
    category: string,
    price: number
    index?: number
}

export interface IBasket {
    items: HTMLElement[]
    total: number
}

export interface IOrder {                 // возвращается {
    payment: string,                      // "id": "28c57cb4-3002-4445-8aa1-2a06a5055ae5",
    email: string,                        //  "total": 2200}
    phone: string,
    address: string
}

export interface IForm extends IOrder {
    error: string;
    valid: boolean;
}

export interface ICardData {
    cards: ICard[],  
    setSelectedCard(cardId:string): void,
    getSelectedCard(): void,
    getCard(cardId:string): ICard
}

export interface IBasketData {
    cardsBasket: ICard[],
    contains(id: string): boolean,
    add(card: ICard): void,
    remove(id: string): void,
    getBasketList(): void,
    getLengthBasketList():number,
    getIdBasketList(): string[],
    clear(): void
}

export interface IOrderData {
    getOrder(): IOrder;
    setField(field: keyof IOrder, value: string): void;
    setErrors(): Partial<IOrder>;
    clear(): void;
}

export interface IApi {
    baseUrl: string;
    get<T>(uri: string): Promise<T>
    post<T>(uri: string, data: object, method?: ApiPostMethods):Promise<T>
}

export type ApiListResponse = {
    total: number,
    items: ICard[]
};

export interface IPage {
    gallery: HTMLElement[]
    counterBasket: number
    blockPageScroll (): boolean
}

//Pick<> - даёт возможность использовать часть типов

export type TCatalogCard = Pick<ICard, 'id'|'category'|'image'|'title'|'price'>

export type TBasketCard = Pick<ICard & {index: number}, 'index'|'id'|'price'|'title'>

export type TOrderError = Partial<Pick<IOrder, 'address' | 'email' | 'payment' | 'phone'>>

export type TPayment = Pick<IOrder, 'payment'|'address'>

export type TProfileBuyer = Pick<IOrder, 'email'|'phone'>

export type TSuccess = Pick<IBasket, 'total'>

export type TDataOrder = Partial<IOrder & IBasketData>

export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';