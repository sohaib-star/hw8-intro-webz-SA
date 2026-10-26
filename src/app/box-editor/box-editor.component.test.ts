import { describe, expect, test, beforeAll } from "@jest/globals";
import { BoxEditorComponent } from "./box-editor.component";
import { bootstrap } from "@boots-edu/webz";

describe("BoxEditorComponent", () => {
    let component: any = undefined;
    beforeAll(() => {
        const html: string = `<div>Testing Environment</div><div id='main-target'></div>`;
        component = bootstrap<BoxEditorComponent>(BoxEditorComponent, html);
    });
    describe("Constructor", () => {
        test("Create Instance", () => {
            expect(component).toBeInstanceOf(BoxEditorComponent);
        });
    });
});
