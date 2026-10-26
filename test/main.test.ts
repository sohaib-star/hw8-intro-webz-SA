import { bootstrap } from "@boots-edu/webz";
import { MainComponent } from "../src/app/main.component";

describe("Main Component", () => {
    let topLevel: MainComponent;
    beforeAll(() => {
        const html: string = `<div>Testing Environment</div><div id='main-target'></div>`;
        topLevel = bootstrap<MainComponent>(MainComponent, html);
    });

    test("Can construct MainComponent", () => {
        expect(topLevel).toBeInstanceOf(MainComponent);
    });

    test("MainComponent has HTML element with id 'example-text'", () => {
        const element = topLevel["shadow"].getElementById(
            "example-text",
        ) as HTMLElement;
        expect(element).not.toBeNull();
        expect(element.innerHTML).toMatch(/html/i);
        expect(element.innerHTML).not.toMatch(/typescript/i);
    });

    test("MainComponent has HTML element with id 'example-target'", () => {
        const element = topLevel["shadow"].getElementById(
            "example-target",
        ) as HTMLElement;
        expect(element).not.toBeNull();
    });

    test("MainComponent has variable named myText", () => {
        expect(topLevel["myText"]).toBeDefined();
        expect(typeof topLevel["myText"]).toBe("string");
    });

    test("MainComponent's 'example-target' is bound to the myText variable.", () => {
        const element = topLevel["shadow"].getElementById(
            "example-target",
        ) as HTMLElement;
        expect(element.innerHTML).toMatch(topLevel["myText"]);
        topLevel["myText"] = "Hello from the Jest side!";
        expect(element.innerHTML).toMatch("Hello from the Jest side!");
        topLevel["myText"] = "Should be able to change the text here!";
        expect(element.innerHTML).toMatch(
            "Should be able to change the text here!",
        );
    });
});
