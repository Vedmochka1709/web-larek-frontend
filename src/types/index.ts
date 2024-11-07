export interface ICard {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number;
    index?: number;
}

export interface IOrder {                 
    payment: string;                     
    email: string;                        
    phone: string;
    address: string;
}

export interface IBasket {
    items: HTMLElement[];
    total: number;
}

export interface IPage {
    gallery: HTMLElement[];
    counterBasket: number;
}

export interface IModal {
    modalContent: HTMLElement;
}

export interface IForm extends IOrder {
    error: string;
    valid: boolean;
}

export interface ICardData {
    cards: ICard[];
    getCard(cardId:string): ICard;
    setSelectedCard(cardId:string): void;
    getSelectedCard(): void;
}

export interface IOrderData {
    getOrder(): IOrder;
    setField(field: keyof IOrder, value: string): void;
    setErrors(): TOrderError;
    clear(): void;
}

export interface IBasketData {
    cardsBasket: ICard[];
    getTotal(): number;
    contains(id: string): boolean;
    add(card: ICard): void;
    remove(id: string): void;
    getBasketList(): void;
    getLengthBasketList():number;
    getIdBasketList(): string[];
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

//Pick<> - даёт возможность использовать часть типов

export type TBasketCard = Pick<ICard & {index: number}, 'index'|'id'|'price'|'title'>

export type TOrderError = Partial<Pick<IOrder, 'address' | 'email' | 'payment' | 'phone'>> 

export type TPayment = Pick<IOrder, 'payment'|'address'> 

export type TProfileBuyer = Pick<IOrder, 'email'|'phone'> 

export type TSuccess = Pick<IBasket, 'total'>

export type TDataOrder = Partial<IOrder & IBasketData>

export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';