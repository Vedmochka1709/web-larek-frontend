import { ensureElement, createElement } from "../../utils/utils";
import { Component } from "../base/component"
import { IEvents } from "../base/events";

interface IModal {
    modalCloseButton: HTMLButtonElement
    modalContent: HTMLElement
}

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
        
        // Закрытие по оверлею TODO:  исправить модальное окно, чтобы появился оверлей
        this.overlay.addEventListener('click', () => this.closeModal())

        // Закрытие по нажатию Escape
        document.addEventListener('keydown', (evt) => {
            if (evt.key === 'Escape') {
                this.closeModal()
            } 
        })
    }

    // Запоняем контентом
    set modalContent(content: HTMLElement) {
        this._modalContent.replaceChildren(content)
    }

    openModal() {
        this.container.classList.add('modal_active');
        this.events.emit('modal:open')
    }

    closeModal() {
        this.container.classList.remove('modal_active');
        this.modalContent = null;
        this.events.emit('modal:close')
    }

    render(data?: Partial<IModal>): HTMLElement {
        Object.assign(this, data)
        return this.container
    }
}