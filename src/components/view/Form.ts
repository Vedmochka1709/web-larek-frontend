import { Component } from "../base/component";
import { IEvents } from "../base/events";

export class Form<T> extends Component<T> {
    protected errorText: HTMLElement;
    protected submitButton: HTMLButtonElement;
    protected formInput: HTMLInputElement

    constructor(protected container: HTMLTemplateElement, protected events: IEvents) {
        super(container);

        this.submitButton = this.container.querySelector('button[type=submit]');
        this.errorText = this.container.querySelector('.form__errors');
        this.formInput = this.container.querySelector('.form__input');

        this.container.addEventListener('input', (evt) => {
            const currentElement = evt.target as HTMLInputElement;
            const field = currentElement.name;
            const value = currentElement.value;
            this.events.emit('form:change', { field, value })
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