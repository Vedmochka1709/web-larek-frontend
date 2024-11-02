import { AppApi } from './components/AppApi';
import { Api } from './components/base/api';
import { EventEmitter } from './components/base/events';
import { CardData } from './components/model/CardData';
import { OrderData } from './components/model/OrderData';
import { Card } from './components/view/Card';
import { Modal } from './components/view/Modal';
import { Page } from './components/view/Page';
import './scss/styles.scss';
import { IApi, ICard, IOrder, TCatalogCard } from './types/index';
import { API_URL, settings } from './utils/constants';
import { ensureElement } from './utils/utils';

// Находим тимплейты
const templateCardCatalog = ensureElement<HTMLTemplateElement>('#card-catalog')
const templateCardPreview = ensureElement<HTMLTemplateElement>('#card-preview')
const templateCardBasket = ensureElement<HTMLTemplateElement>('#card-basket')

const templateBasket = ensureElement<HTMLTemplateElement>('#basket')
const templateOrder = ensureElement<HTMLTemplateElement>('#order')
const templateContacts = ensureElement<HTMLTemplateElement>('#contacts')
const templateSuccess = ensureElement<HTMLTemplateElement>('#success')

// Находим контейнеры
const pageContainer = ensureElement<HTMLElement>('.page')
const galleryContainer = ensureElement<HTMLElement>('.gallery')
const modalContainer = ensureElement<HTMLElement>('#modal-container')

// Создаём экземпляры классов
const events = new EventEmitter();
const baseApi: IApi = new Api(API_URL, settings);
const api = new AppApi(baseApi);

const cardData = new CardData(events);
const orderData = new OrderData(events);

const card = new Card(templateCardCatalog, events); // дубль удалить TODO:
const page = new Page(pageContainer, events)
const modal = new Modal(modalContainer, events)

events.onAll((event) => {
    console.log(event.eventName, event.data);
});

// Получаем карточки с сервера и загружаем в галерею
api.getCards()
    .then((items) => {
        cardData.cards = items

        page.render({
            gallery: cardData.cards.map(item => {
                const card = new Card(templateCardCatalog, events);
                return card.render({
                    ...item
                })
            })
        })
    }).catch(console.error)

// Открытие модального окна Preview
events.on('modalPreview:open', (obj) => { // TODO: доделать выбранную карточку
    const cardId = Object.values(obj).toString()
    console.log(cardId)
    cardData.setCard(cardId)
    const cardPreview = new Card(templateCardPreview, events)
    modal.render({
        modalContent: cardPreview.render({
            ...cardData.getCard()
        })
    });
    
    modal.openModal()
})

events.on('modal:open', () => {
    page.blockPageScroll(true)
})

events.on('modal:close', () => {
    page.blockPageScroll(false)
})

//


/*const root:HTMLElement = document.querySelector('.page')

// Вывод счётчика на иконке корзины
const counterBasketIcon = new Page(root)
counterBasketIcon.render({
    counterBasket: 0
})
//TODO: вывести изменение количестка при добавлении и удалении*/





