import { bootstrap } from "@boots-edu/webz";
import { MainComponent } from "../src/app/main.component";
import { BoopButtonComponent } from "../src/app/boop-button/boop-button.component";

describe("Main Component", () => {
    let component: MainComponent;
    beforeEach(() => {
        const html: string = `<div>Testing Environment</div><div id='main-target'></div>`;
        component = bootstrap<MainComponent>(MainComponent, html);
    });

    test("(1 pts) boopButton field is defined in MainComponent", () => {
        expect(component["boopButton"]).toBeDefined();
        expect(component["boopButton"]).toBeInstanceOf(BoopButtonComponent);
    });

    test("(1 pts) BoopButtonComponent has been added to the id 'boop-button'", () => {
        const element = component["shadow"].getElementById(
            "boop-button",
        ) as HTMLElement;
        expect(element).not.toBeNull();
    });

    test("(1 pts) BoopButtonComponent has HTML button with id 'booper'", () => {
        const element = component["boopButton"]["shadow"].getElementById(
            "booper",
        ) as HTMLElement;
        expect(element).not.toBeNull();
        expect(element.tagName).toMatch(/button/i);
    });

    test("(1 pts) BoopButtonComponent has a span with id 'boops'", () => {
        const element = component["boopButton"]["shadow"].getElementById(
            "boops",
        ) as HTMLElement;
        expect(element).not.toBeNull();
        expect(element.tagName).toMatch(/span/i);
    });

    test("(1 pts) BoopButtonComponent's 'boops' span is initially empty", () => {
        const element = component["boopButton"]["shadow"].getElementById(
            "boops",
        ) as HTMLElement;
        expect(element.innerHTML).toBe("");
    });

    test("(1 pts) BoopButtonComponent has a field named 'boops'", () => {
        expect(component["boopButton"]["boops"]).toBeDefined();
        expect(typeof component["boopButton"]["boops"]).toBe("string");
        expect(component["boopButton"]["boops"]).toBe("");
    });

    test("(1 pts) BoopButtonComponent has a method named 'boop'", () => {
        expect(component["boopButton"]["boop"]).toBeDefined();
        expect(typeof component["boopButton"]["boop"]).toBe("function");
    });

    test("(1 pts) BoopButtonComponent's 'boops' field is updated when the boop method is called", () => {
        expect(component["boopButton"]["boops"]).toBe("");
        component["boopButton"]["boop"]();
        expect(component["boopButton"]["boops"]).not.toBe("");
        const contents = component["boopButton"]["boops"];
        component["boopButton"]["boop"]();
        expect(component["boopButton"]["boops"]).toBe(contents.repeat(2));
        component["boopButton"]["boop"]();
        expect(component["boopButton"]["boops"]).toBe(contents.repeat(3));
    });

    test("(1 pts) BoopButtonComponent's 'boops' span is updated when the boop method is called", () => {
        const element = component["boopButton"]["shadow"].getElementById(
            "boops",
        ) as HTMLElement;
        expect(element.innerHTML).toBe("");
        component["boopButton"]["boop"]();
        const contents = element.innerHTML;
        expect(element.innerHTML).not.toBe("");
        component["boopButton"]["boop"]();
        expect(element.innerHTML).toBe(contents.repeat(2));
        component["boopButton"]["boop"]();
        expect(element.innerHTML).toBe(contents.repeat(3));
    });

    test("(1 pts) BoopButtonComponent's 'boops' span is updated when the button is clicked", () => {
        const element = component["boopButton"]["shadow"].getElementById(
            "boops",
        ) as HTMLElement;
        const button = component["boopButton"]["shadow"].getElementById(
            "booper",
        ) as HTMLButtonElement;
        expect(element.innerHTML).toBe("");
        button.click();
        expect(element.innerHTML).not.toBe("");
        const contents = element.innerHTML;
        button.click();
        expect(element.innerHTML).toBe(contents.repeat(2));
        button.click();
        expect(element.innerHTML).toBe(contents.repeat(3));
    });

    test("(1 pts) BoopButtonComponent's 'boops' field is updated when the button is clicked", () => {
        const button = component["boopButton"]["shadow"].getElementById(
            "booper",
        ) as HTMLButtonElement;
        expect(component["boopButton"]["boops"]).toBe("");
        button.click();
        expect(component["boopButton"]["boops"]).not.toBe("");
        const contents = component["boopButton"]["boops"];
        button.click();
        expect(component["boopButton"]["boops"]).toBe(contents.repeat(2));
        button.click();
        expect(component["boopButton"]["boops"]).toBe(contents.repeat(3));
    });
});
