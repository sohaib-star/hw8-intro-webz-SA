import { describe, expect, test, beforeAll } from "@jest/globals";
import { BoopButtonComponent } from "./boop-button.component";
import { bootstrap } from "@boots-edu/webz";

describe("BoopButtonComponent", () => {
    let component: any = undefined;
    beforeAll(() => {
        const html: string = `<div>Testing Environment</div><div id='main-target'></div>`;
        component = bootstrap<BoopButtonComponent>(BoopButtonComponent, html);
    });
    describe("Constructor", () => {
        test("Create Instance", () => {
            expect(component).toBeInstanceOf(BoopButtonComponent);
        });
    });
});
