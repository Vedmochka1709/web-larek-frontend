import { cloneTemplate } from "../../utils/utils";
import { Component } from "../base/component";
import { IEvents } from "../base/events";

export class Form<T> extends Component<T> {
    protected errorText: HTMLElement;
    protected submitButton: HTMLButtonElement;
    protected formInput: HTMLInputElement

    constructor(protected container: HTMLTemplateElement, protected events: IEvents) {
        super(container);

        this.submitButton =  this.container.querySelector('button[type=submit]');
        this.errorText =  this.container.querySelector('.form__errors');
        this.formInput =  this.container.querySelector('.form__input');

        this.container.addEventListener('input', (evt) => {
            const currentElement = evt.target as HTMLInputElement;
                const field = currentElement.name;
                const value = currentElement.value;
                this.events.emit('form:сhange', { field, value })
        })

        this.container.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this.events.emit(`${this.container.getAttribute('name')}:submit`) 
        });
    }

    // Показать ошибку
    protected showInputError(errorMessage: string) {
        this.setText(this.errorText, errorMessage)
    }
    // Скрыть ошибку
    protected hideInputError() {
        this.setText(this.errorText, '')
    }

    // Задаём ошибку
    set error(error: string) {
        if (error) {
            this.showInputError(error)
        } else {
            this.hideInputError()
        }
    }

    // Проверяем на валидность
    set valid(isValid: boolean) {               
        this.setDisabled(this.submitButton, !isValid);  
    }
}


/*export class Form<T> extends Component<T> {
    protected errorText: HTMLElement;
    protected submitButton: HTMLButtonElement;
    protected formElement: HTMLElement;
    protected formInput: HTMLInputElement

    constructor(protected container: HTMLTemplateElement, protected events: IEvents) {
        super(container);

        this.formElement = cloneTemplate(container)

        this.submitButton =  this.formElement.querySelector('button[type=submit]');
        this.errorText =  this.formElement.querySelector('.form__errors');
        this.formInput =  this.formElement.querySelector('.form__input');

        this.formInput.addEventListener('input', (evt) => {
            console.log(1)
            const currentElement = evt.target as HTMLInputElement;

            if (currentElement.value.length !== 0) {
                const field = currentElement.name;
                const value = currentElement.value;
                this.events.emit('form:сhange', { field, value })}
            
        })

        this.formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this.events.emit(`${this.formElement.getAttribute('name')}:submit`) 
        });
    }

    // Показать ошибку
    protected showInputError(errorMessage: string) {
        this.setText(this.errorText, errorMessage)
    }
    // Скрыть ошибку
    protected hideInputError() {
        this.setText(this.errorText, '')
    }

    // Задаём ошибку
    set error(error: string) {
        if (error) {
            this.showInputError(error)
        } else {
            this.hideInputError()
        }
    }

    // Проверяем на валидность
    set valid(isValid: boolean) {               
        this.setDisabled(this.submitButton, !isValid);  
    }

    // Возвращаем DOM- элемент
    render(data: Partial<T>): HTMLElement {
        Object.assign(this as object, data)
        return  this.formElement
    }
} */