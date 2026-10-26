import { describe, expect, test, beforeAll } from "@jest/globals";
import { SimpleCalculatorComponent } from "./simple-calculator.component";
import { bootstrap } from "@boots-edu/webz";

describe("SimpleCalculatorComponent", () => {
    let component: any = undefined;
    beforeAll(() => {
        const html: string = `<div>Testing Environment</div><div id='main-target'></div>`;
        component = bootstrap<SimpleCalculatorComponent>(SimpleCalculatorComponent, html);
    });
    describe("Constructor", () => {
        test("Create Instance", () => {
            expect(component).toBeInstanceOf(SimpleCalculatorComponent);
        });
    });
});
