import { cloneTemplate } from "../../utils/utils";
import { Component } from "../base/component";
import { IEvents } from "../base/events";

export class Form<T> extends Component<T> {
    protected errorText: HTMLElement;
    protected submitButton: HTMLButtonElement;
    protected formElement: HTMLElement;

    constructor(protected container: HTMLTemplateElement, protected events: IEvents) {
        super(container);

        this.formElement = cloneTemplate(container)

        this.submitButton =  this.formElement.querySelector('button[type=submit]');
        this.errorText =  this.formElement.querySelector('.form__errors');


        this.formElement.addEventListener('input', (evt) => {
            console.log(1)
            const input = evt.target as HTMLInputElement;
            const field = input.name;
            const value = input.value;
            this.events.emit('form:сhange', { field, value })
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
}