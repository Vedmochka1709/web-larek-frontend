/*import { iProduct } from "../../types";
import { Component } from "../base/component";
import { IEvents } from "../base/events";

export class BasketList extends Component<iProduct> {

	protected basketList: iProduct[];
	protected basketListItem: HTMLElement;
    protected cardNumber: HTMLElement;
	protected cardTitle: HTMLElement;
	protected cardPrice: HTMLElement;
    protected cardDeleteButton: HTMLButtonElement;

	constructor(protected container: HTMLElement, protected events: IEvents) {
        super(container);
        
		this.basketList = [];
        this.basketListItem = container.querySelector('.basket__item');               // элемент li - нужен???????????
        this.cardNumber = container.querySelector('.basket__item-index');             // Нумерация в корзине
		this.cardTitle = container.querySelector('.card__title');                     // наименование товара
		this.cardPrice = container.querySelector('.card__price');                      // цена товара
        this.cardDeleteButton = container.querySelector('.basket__item-delete');   // Кнопка удаления товара
            
        // слушатели                  
    }

	// Присвоение номера в корзине
	protected makeItemNumber() {                                                                
        let cardNumber: number = 1;
        this.container.querySelectorAll('.basket__item-index').forEach((item) => {
            item.textContent = String(cardNumber++)
        })
    }

	// Заполнение контентом basketListItem
    protected setBasketListItem(card: iProduct) {
        this.setText(this.cardTitle, card.title);
		this.setText(this.cardPrice, card.price);
    }

	// подсчёт общей суммы заказа
	getSumOrder(): number {                                
        if (this.basketList.length)
            return this.basketList.map((item) => item.price).reduce((prevVal, price) => prevVal + price) ?? 0;
    }

	// Подсчёт количества для изменение количества в корзине на иконке
	getCounterBasket() {                               
        return this.basketList.length ?? 0;
    }

	// Проверка на наличие в корзине
	protected ContainsProductInBasket(card: iProduct) {             
        return this.basketList.some(item => item.id === card.id);
    } 

	// Добавление в корзину товара
	addProduct(card: iProduct): void {                
        if (!this.ContainsProductInBasket(card)) {
            this.basketList.push(card);
            this.getCounterBasket();
            this.getSumOrder()
        }
    }

	// Удаление карточки
	deleteProduct(card: iProduct): void {              
        if (this.ContainsProductInBasket(card)) {
            this.basketList = this.basketList.filter(item => item.id !== card.id);
            this.getCounterBasket();
            this.getSumOrder()
        }
    }

	// Очистка корзины после заказа
	clearBasket() {                                         
        this.basketList = [];
        this.getCounterBasket();
        this.getSumOrder()
    }
}*/