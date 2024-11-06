import { AppApi } from './components/AppApi';
import { Api } from './components/base/api';
import { EventEmitter } from './components/base/events';
import { BasketData } from './components/model/BasketData';
import { CardData } from './components/model/CardData';
import { OrderData } from './components/model/OrderData';
import { Basket } from './components/view/Basket';
import { Card } from './components/view/Card';
import { Contacts } from './components/view/Contacts';
import { Modal } from './components/view/Modal';
import { Page } from './components/view/Page';
import { Payment } from './components/view/Payment';
import './scss/styles.scss';
import { IApi, IOrder } from './types/index';
import { API_URL, settings } from './utils/constants';
import { cloneTemplate, ensureElement } from './utils/utils';

// Находим темплейты
const templateCardCatalog = ensureElement<HTMLTemplateElement>('#card-catalog')
const templateCardPreview = ensureElement<HTMLTemplateElement>('#card-preview')
const templateCardBasket = ensureElement<HTMLTemplateElement>('#card-basket')

const templateBasket = ensureElement<HTMLTemplateElement>('#basket')
const templatePayment = ensureElement<HTMLTemplateElement>('#order')
const templateContacts = ensureElement<HTMLTemplateElement>('#contacts')
const templateSuccess = ensureElement<HTMLTemplateElement>('#success')

// Находим контейнеры
const pageContainer = ensureElement<HTMLElement>('.page')
const galleryContainer = ensureElement<HTMLElement>('.gallery')    // TODO:
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
const paymentOrder = new Payment(cloneTemplate(templatePayment), events)
const contacts = new Contacts(cloneTemplate(templateContacts), events)

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

// Модального окно Preview
events.on('modalPreview:open', (data: { cardId: string }) => {
    const cardInBasket = basketData.contains(data.cardId) // возвращает true или false
    const selectedCard = cardData.getCard(data.cardId)
    const cardPreview = new Card(templateCardPreview, events)

    cardData.setCard(data.cardId)

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

events.on('modalPreview:submit', (data: { cardId: string }) => {
    const cardInBasket = basketData.contains(data.cardId) // возвращает true или false
    const selectedCard = cardData.getCard(data.cardId)
    const cardPreview = new Card(templateCardPreview, events)

    if (!cardInBasket) {
        basketData.add(selectedCard)
        cardPreview.changeTextButton(true)
    } else {
        basketData.remove(data.cardId)
        cardPreview.changeTextButton(false)
    }

    modal.render({
        modalContent: cardPreview.render({
            ...selectedCard
        })
    });

})

// Корзина
events.on('basket:open', () => {
    modal.render({
        modalContent: basket.render({
            total: basketData.total,
            items: basketData.getBasketList().map((item) => {
                const cardBasket = new Card(templateCardBasket, events)

                return cardBasket.render({
                    id: item.id,
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
                id: item.id,
                index: item.index,
                title: item.title,
                price: item.price
            })
        })
    })

    page.render({
        counterBasket: basketData.getLengthBasketList()
    });
})

events.on('basketCard: delete', (data: { cardId: string }) => {
    basketData.remove(data.cardId)
})

// Модальное окно Payment - открытие

events.on('basket:submit', () => {

    const payment = orderData.setErrors().payment;
    const address = orderData.setErrors().address;

    modal.render({
        modalContent: paymentOrder.render({
            payment: orderData.getOrder().payment,
            address: orderData.getOrder().address,
            valid: !payment && !address,
            error: getErrorMessage({ payment, address })
        })
    })

    modal.openModal()
})

// Модальное окно Contacts - открытие
events.on('order:submit', () => {

    const email = orderData.setErrors().email;
    const phone = orderData.setErrors().phone;

    modal.render({
        modalContent: contacts.render({
            email: orderData.getOrder().email,
            phone: orderData.getOrder().phone,
            valid: !email && !phone,
            error: getErrorMessage({ email, phone })
        })
    })

    modal.openModal()
})

// Настройка полей формы
events.on('form:change', (data: { field: keyof IOrder, value: string }) => {
    orderData.setField(data.field, data.value)
})

// Обновление форм
events.on('order:changed', () => {
    const payment = orderData.setErrors().payment;
    const address = orderData.setErrors().address;
    const email = orderData.setErrors().email;
    const phone = orderData.setErrors().phone;

    paymentOrder.render({
        payment: orderData.getOrder().payment,
        address: orderData.getOrder().address,
        valid: !payment && !address,
        error: getErrorMessage({ payment, address })
    })
    contacts.render({
        email: orderData.getOrder().email,
        phone: orderData.getOrder().phone,
        valid: !email && !phone,
        error: getErrorMessage({ email, phone })
    })
})

// Вывод ошибок
function getErrorMessage(errors: Partial<IOrder>): string {
    return Object.values(errors).filter(i => !!i).join(' и ');
}


// Закрепление модального окна

events.on('modal:open', () => {
    page.blockPageScroll(true)
})

events.on('modal:close', () => {
    page.blockPageScroll(false)
})
