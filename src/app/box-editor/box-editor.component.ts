
import { WebzComponent } from "@boots-edu/webz";
import html from "./box-editor.component.html";
import css from "./box-editor.component.css";

export class BoxEditorComponent extends WebzComponent {
    private _padding = 20;
    private _margin = 20;
    private _background = "lightblue";

    get padding(): number {
        return this._padding;
    }

    set padding(value: number) {
        this._padding = value;
        this.updatePreview();
    }

    get margin(): number {
        return this._margin;
    }

    set margin(value: number) {
        this._margin = value;
        this.updatePreview();
    }

    get background(): string {
        return this._background;
    }

    set background(value: string) {
        this._background = value;
        this.updatePreview();
    }

    constructor() {
        super(html, css);

        const root = (this as any).shadow as ShadowRoot;

        const paddingInput = root.getElementById(
            "padding-input"
        ) as HTMLInputElement;

        const marginInput = root.getElementById(
            "margin-input"
        ) as HTMLInputElement;

        const backgroundSelect = root.getElementById(
            "background-select"
        ) as HTMLSelectElement;

        paddingInput.addEventListener("input", () => {
            this.padding = Number(paddingInput.value);
        });

        marginInput.addEventListener("input", () => {
            this.margin = Number(marginInput.value);
        });

        backgroundSelect.addEventListener("change", () => {
            this.background = backgroundSelect.value;
        });

        this.updatePreview();
    }

    private updatePreview(): void {
        const root = (this as any).shadow as ShadowRoot;

        const paddingInput = root.getElementById(
            "padding-input"
        ) as HTMLInputElement | null;

        const marginInput = root.getElementById(
            "margin-input"
        ) as HTMLInputElement | null;

        const backgroundSelect = root.getElementById(
            "background-select"
        ) as HTMLSelectElement | null;

        const image = root.getElementById("image") as HTMLElement | null;

        if (paddingInput) {
            paddingInput.value = String(this._padding);
        }

        if (marginInput) {
            marginInput.value = String(this._margin);
        }

        if (backgroundSelect) {
            backgroundSelect.value = this._background;
        }

        if (image) {
            image.style.padding = `${this._padding}px`;
            image.style.margin = `${this._margin}px`;
            image.style.backgroundColor = this._background;
        }
    }
}
