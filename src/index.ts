import { AppApi } from './components/AppApi';
import { Api, ApiListResponse } from './components/base/api';
import { EventEmitter } from './components/base/events';
import { CardData } from './components/model/CardData';
import { OrderData } from './components/model/OrderData';
import './scss/styles.scss';
import { IApi, ICard, IOrder } from './types/index';
import { API_URL, settings } from './utils/constants';

//Создаём экземпляры классов
const events = new EventEmitter(); 
const cardData = new CardData(events);
const orderData = new OrderData(events);
const baseApi: IApi = new Api(API_URL, settings);
const api = new AppApi(baseApi)

// Получаем карточки с сервера
api.getCards()
    .then ((data) => {
        console.log(data)
        const result = data.map(x => x.items)
        cardData.cards = result
       
        console.log(cardData.getCard("854cef69-976d-4c2a-a18c-2aa45046c390"))
    })


/*const root:HTMLElement = document.querySelector('.page')

// Вывод счётчика на иконке корзины
const counterBasketIcon = new Page(root)
counterBasketIcon.render({
    counterBasket: 0
})
//TODO: вывести изменение количестка при добавлении и удалении*/





