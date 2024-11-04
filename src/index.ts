import { AppApi } from './components/AppApi';
import { Api } from './components/base/api';
import { EventEmitter } from './components/base/events';
import { BasketData } from './components/model/BasketData';
import { CardData } from './components/model/CardData';
import { OrderData } from './components/model/OrderData';
import { Basket } from './components/view/Basket';
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
const basketData = new BasketData(events)
const orderData = new OrderData(events);

const card = new Card(templateCardCatalog, events); // дубль удалить TODO:
const page = new Page(pageContainer, events)
const modal = new Modal(modalContainer, events)
const basket = new Basket(templateBasket, events)

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
events.on('modalPreview:open', (obj) => {
    const cardId = Object.values(obj).toString()
    const cardInBasket = basketData.contains(cardId) // возвращает true или false
    const selectedCard = cardData.getCard(cardId)
    const cardPreview = new Card(templateCardPreview, events)

    cardData.setCard(cardId)

    if (!cardInBasket) {
        cardPreview.changeTextButton(false)
    } else {
        cardPreview.changeTextButton(true)
    }

    modal.render({
        modalContent: cardPreview.render({
            ...selectedCard
        })
    });

    modal.openModal()
})

events.on('modalPreview:submit', (obj) => {
    const cardId = Object.values(obj).toString()
    const cardInBasket = basketData.contains(cardId) // возвращает true или false
    const selectedCard = cardData.getCard(cardId)
    const cardPreview = new Card(templateCardPreview, events)

    if (!cardInBasket) {
        basketData.add(selectedCard)
        cardPreview.changeTextButton(true)
    } else {
        basketData.remove(cardId)
        cardPreview.changeTextButton(false)
    }

    modal.render({
        modalContent: cardPreview.render({
            ...selectedCard
        })
    });

})

// Открытие корзины
events.on('basket:open', () => {
    modal.render({
        modalContent: basket.render({
            total: basketData.total,
            items: basketData.getBasketList().map((item) => {
                const cardBasket = new Card(templateCardBasket, events)

                return cardBasket.render({
                    index: item.index,
                    title: item.title,
                    price: item.price
                })
            })
        })
    });

    modal.openModal()
})

events.on('basket:changed', () => {
    basket.render({
        total: basketData.total,
        items: basketData.getBasketList().map((item) => {
            const cardBasket = new Card(templateCardBasket, events)

            return cardBasket.render({
                index: item.index,
                title: item.title,
                price: item.price
            })
        })
    })
   /* basketData.cardsBasket.map((item) => {
        console.log(basketData.cardsBasket)
        events.on('basketCard: delete', () => {
            basketData.remove(item.id)
        })
    })   */ 

    page.render({
        counterBasket: basketData.getLengthBasketList()
    });
})

events.on('basketCard: delete', () => {
                    basketData.remove(item.id)
                })

/*events.on('basketCard: delete', (cardBasket) => {
    console.log(cardBasket)
    //basketData.remove(.id)

    /*modal.render({
        modalContent: basket.render({
            total: basketData.total,
            items: basketData.getBasketList().map((item) => {
                const cardBasket = new Card(templateCardBasket, events)
                return cardBasket.render({
                    index: item.index,
                    title: item.title,
                    price: item.price
                })
            })
        })
    });*//*
})*/







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





