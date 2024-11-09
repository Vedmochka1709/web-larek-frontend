import { IModal } from "../../types";
import { ensureElement, createElement } from "../../utils/utils";
import { Component } from "../base/component"
import { IEvents } from "../base/events";

export class Modal extends Component<IModal> {
    protected _modalCloseButton: HTMLButtonElement
    protected _modalContent: HTMLElement
    protected overlay: HTMLElement

    constructor(protected container: HTMLElement, protected events: IEvents) {
        super(container)

        this._modalCloseButton = ensureElement('.modal__close', this.container) as HTMLButtonElement;
        this._modalContent = ensureElement('.modal__content', this.container)

        // Создание оверлея
        this.overlay = createElement<HTMLElement>('div')
        container.append(this.overlay);
        this.overlay.className = 'overlay'
        this.overlay.style.width = '100%';
        this.overlay.style.height = '100%';
        this.overlay.style.position = 'fixed';
        this.overlay.style.top = '0';
        this.overlay.style.left = '0';
        this.overlay.style.left = '0';
        this.overlay.style.setProperty('z-index', '101');

        // Закрытие по кнопке
        this._modalCloseButton.addEventListener('click', () => this.closeModal())

        // Закрытие по оверлею 
        this.overlay.addEventListener('click', () => this.closeModal())
    }

    // Запоняем контентом
    set modalContent(content: HTMLElement) {
        this._modalContent.replaceChildren(content)
    }

    // создаем метод для переключения модального окна
    toggleModal(state: boolean) {
        this.toggleClass(this.container, 'modal_active', state);
    }

    handleEscape = (evt: KeyboardEvent) => {
        if (evt.key === 'Escape') {
            this.closeModal();
        }
    }

    openModal() {
        this.toggleModal(true)
        document.addEventListener('keydown', this.handleEscape);  // Закрытие по нажатию Escape
        this.events.emit('modal:open')
    }

    closeModal() {
        this.toggleModal(false)
        document.removeEventListener('keydown', this.handleEscape)
        this.modalContent = null;
        this.events.emit('modal:close')
    }

    render(data?: Partial<IModal>): HTMLElement {
        Object.assign(this, data)
        return this.container
    }
}