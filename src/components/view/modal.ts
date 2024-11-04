import { ensureElement } from "../../utils/utils";
import { Component } from "../base/component"
import { IEvents } from "../base/events";

interface IModal {
    modalCloseButton: HTMLButtonElement
    modalContent: HTMLElement
}

export class Modal extends Component<IModal> {
    protected _modalCloseButton: HTMLButtonElement
    protected _modalContent: HTMLElement


    constructor(protected container: HTMLElement, protected events: IEvents) {
        super(container)

        this._modalCloseButton = ensureElement('.modal__close', this.container) as HTMLButtonElement;
        this._modalContent = ensureElement('.modal__content', this.container)

        // Закрытие по кнопке
        this._modalCloseButton.addEventListener('click', () => this.closeModal()) 
        
        // Закрытие по оверлею TODO:  исправить модальное окно, чтобы появился оверлей
        //this.overlay.addEventListener('click', () => this.closeModal())
    }

    // Запоняем контентом
    set modalContent(content: HTMLElement) {
        this._modalContent.replaceChildren(content)
    }

    openModal() {
        this.container.classList.add('modal_active');
        document.addEventListener('keyup', this.closeEsc); 
    }

    closeModal() {
        this.container.classList.remove('modal_active');
        this.modalContent = null;
        document.removeEventListener('keyup', this.closeEsc);
    }

    protected closeEsc(evt: KeyboardEvent) {
        if (evt.key === 'Escape')
            this.closeModal();
    }

    render(data?: Partial<IModal>): HTMLElement {
        Object.assign(this, data)
        return this.container
    }
}