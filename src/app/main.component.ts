
import html from "./main.component.html";
import css from "./main.component.css";
import { WebzComponent, BindValue } from "@boots-edu/webz";
import { BoopButtonComponent } from "./boop-button/boop-button.component";
import { SimpleCalculatorComponent } from "./simple-calculator/simple-calculator.component";
import { BoxEditorComponent } from "./box-editor/box-editor.component";

export class MainComponent extends WebzComponent {
    @BindValue("example-target")
    private myText: string = "Hello from the TypeScript side!";

    private boopButton = new BoopButtonComponent();
    private calculator = new SimpleCalculatorComponent();
    private box = new BoxEditorComponent();

    constructor() {
        super(html, css);
        this.addComponent(this.boopButton, "boop-button");
        this.addComponent(this.calculator, "calculator");
        this.addComponent(this.box, "box");
    }
}
