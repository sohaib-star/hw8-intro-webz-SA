import { bootstrap } from "@boots-edu/webz";
import { MainComponent } from "../src/app/main.component";
import { BoxEditorComponent } from "../src/app/box-editor/box-editor.component";

describe("Box", () => {
    let component: MainComponent;
    beforeEach(() => {
        const html: string = `<div>Testing Environment</div><div id='main-target'></div>`;
        component = bootstrap<MainComponent>(MainComponent, html);
    });

    test("(1 pts) box field is defined in MainComponent", () => {
        expect(component["box"]).toBeDefined();
        expect(component["box"]).toBeInstanceOf(BoxEditorComponent);
    });

    test("(1 pts) BoxEditorComponent has been added to the id 'box'", () => {
        const element = component["shadow"].getElementById(
            "box",
        ) as HTMLElement;
        expect(element).not.toBeNull();
    });

    test("(1 pts) BoxEditorComponent has HTML input with id 'padding-input'", () => {
        const element = component["box"]["shadow"].getElementById(
            "padding-input",
        ) as HTMLElement;
        expect(element).not.toBeNull();
        expect(element.tagName).toMatch(/input/i);
        expect(element.getAttribute("type")).toMatch(/number/i);
    });

    test("(1 pts) BoxEditorComponent has HTML label with 'for' attribute 'padding-input'", () => {
        const element = component["box"]["shadow"].querySelector(
            "label[for='padding-input']",
        ) as HTMLElement;
        expect(element).not.toBeNull();
    });

    test("(1 pts) BoxEditorComponent has HTML input with id 'margin-input'", () => {
        const element = component["box"]["shadow"].getElementById(
            "margin-input",
        ) as HTMLElement;
        expect(element).not.toBeNull();
        expect(element.tagName).toMatch(/input/i);
        expect(element.getAttribute("type")).toMatch(/number/i);
    });

    test("(1 pts) BoxEditorComponent has HTML label with 'for' attribute 'margin-input'", () => {
        const element = component["box"]["shadow"].querySelector(
            "label[for='margin-input']",
        ) as HTMLElement;
        expect(element).not.toBeNull();
    });

    test("(1 pts) BoxEditorComponent has HTML select with id 'background-select'", () => {
        const element = component["box"]["shadow"].getElementById(
            "background-select",
        ) as HTMLElement;
        expect(element).not.toBeNull();
        expect(element.tagName).toMatch(/select/i);
    });

    test("(1 pts) BoxEditorComponent has HTML label with 'for' attribute 'background-select'", () => {
        const element = component["box"]["shadow"].querySelector(
            "label[for='background-select']",
        ) as HTMLElement;
        expect(element).not.toBeNull();
    });

    test("(1 pts) BoxEditorComponent has 3 HTML Options representing 3 colors", () => {
        const element = component["box"]["shadow"].getElementById(
            "background-select",
        ) as HTMLSelectElement;
        expect(element).not.toBeNull();
        expect(element.tagName).toMatch(/select/i);
        expect(element.options.length).toBe(3);
        // Must be three DIFFERENT colors
        expect(element.options[0].value).not.toBe(element.options[1].value);
        expect(element.options[1].value).not.toBe(element.options[2].value);
        expect(element.options[2].value).not.toBe(element.options[0].value);
        // **NOTE:** Can't easily check if they are valid HTML colors, so we'll allow you to pick whatever you want
        // Even if it's not a valid HTML color :)
    });

    test("(1 pts) BoxEditorComponent has an image with id 'image'", () => {
        const element = component["box"]["shadow"].getElementById(
            "image",
        ) as HTMLElement;
        expect(element).not.toBeNull();
        expect(element.tagName).toMatch(/img/i);
    });

    test("(1 pts) The 'frame' CSS class is on the div and the image tag", () => {
        const elements = component["box"]["shadow"].querySelectorAll(
            ".frame",
        ) as HTMLElement[];
        expect(elements).not.toBeNull();
        expect(elements.length).toBe(2);
        // First element should be the div
        expect(elements[0].tagName).toMatch(/div/i);
        // Second element should be the image
        expect(elements[1].tagName).toMatch(/img/i);
    });

    test("(1 pts) The BoxEditorComponent has a padding field", () => {
        expect(component["box"]["padding"]).toBeDefined();
        expect(typeof component["box"]["padding"]).toBe("number");
    });

    test("(1 pts) The BoxEditorComponent has a margin field", () => {
        expect(component["box"]["margin"]).toBeDefined();
        expect(typeof component["box"]["margin"]).toBe("number");
    });

    test("(1 pts) The BoxEditorComponent has a background field", () => {
        expect(component["box"]["background"]).toBeDefined();
        expect(typeof component["box"]["background"]).toBe("string");
    });

    test("(1 pts) Changing the padding input changes the padding field", () => {
        const input = component["box"]["shadow"].getElementById(
            "padding-input",
        ) as HTMLInputElement;
        input.value = "20";
        input.dispatchEvent(new Event("input"));
        expect(component["box"]["padding"]).toBe(20);
        input.value = "50";
        input.dispatchEvent(new Event("input"));
        expect(component["box"]["padding"]).toBe(50);
    });

    test("(1 pts) Changing the margin input changes the margin field", () => {
        const input = component["box"]["shadow"].getElementById(
            "margin-input",
        ) as HTMLInputElement;
        input.value = "20";
        input.dispatchEvent(new Event("input"));
        expect(component["box"]["margin"]).toBe(20);
        input.value = "50";
        input.dispatchEvent(new Event("input"));
        expect(component["box"]["margin"]).toBe(50);
    });

    test("(1 pts) Changing the background select changes the background field", () => {
        const select = component["box"]["shadow"].getElementById(
            "background-select",
        ) as HTMLSelectElement;
        let chosen = (select.value = select.options[0].value);
        select.dispatchEvent(new Event("change"));
        expect(component["box"]["background"]).toBe(chosen);
        chosen = select.value = select.options[1].value;
        select.dispatchEvent(new Event("change"));
        expect(component["box"]["background"]).toBe(chosen);
    });

    test("(1 pts) Changing the padding field changes the padding input", () => {
        const input = component["box"]["shadow"].getElementById(
            "padding-input",
        ) as HTMLInputElement;
        component["box"]["padding"] = 20;
        expect(input.value).toBe("20");
        component["box"]["padding"] = 50;
        expect(input.value).toBe("50");
    });

    test("(1 pts) Changing the margin field changes the margin input", () => {
        const input = component["box"]["shadow"].getElementById(
            "margin-input",
        ) as HTMLInputElement;
        component["box"]["margin"] = 20;
        expect(input.value).toBe("20");
        component["box"]["margin"] = 50;
        expect(input.value).toBe("50");
    });

    test("(1 pts) Changing the background field changes the background select", () => {
        const select = component["box"]["shadow"].getElementById(
            "background-select",
        ) as HTMLSelectElement;
        component["box"]["background"] = select.options[0].value;
        expect(select.value).toBe(select.options[0].value);
        component["box"]["background"] = select.options[1].value;
        expect(select.value).toBe(select.options[1].value);
    });

    test("(1 pts) Changing the padding field changes the padding style of the image", () => {
        const input = component["box"]["shadow"].getElementById(
            "padding-input",
        ) as HTMLInputElement;
        input.value = "20";
        input.dispatchEvent(new Event("input"));
        const image = component["box"]["shadow"].getElementById(
            "image",
        ) as HTMLElement;
        expect(image.style.padding).toBe("20px");
        input.value = "50";
        input.dispatchEvent(new Event("input"));
        expect(image.style.padding).toBe("50px");
    });

    test("(1 pts) Changing the margin field changes the margin style of the image", () => {
        const input = component["box"]["shadow"].getElementById(
            "margin-input",
        ) as HTMLInputElement;
        input.value = "20";
        input.dispatchEvent(new Event("input"));
        const image = component["box"]["shadow"].getElementById(
            "image",
        ) as HTMLElement;
        expect(image.style.margin).toBe("20px");
        input.value = "50";
        input.dispatchEvent(new Event("input"));
        expect(image.style.margin).toBe("50px");
    });

    test("(1 pts) Changing the background field changes the background style of the image", () => {
        const select = component["box"]["shadow"].getElementById(
            "background-select",
        ) as HTMLSelectElement;
        let chosen = (select.value = select.options[0].value);
        select.dispatchEvent(new Event("change"));
        const image = component["box"]["shadow"].getElementById(
            "image",
        ) as HTMLElement;
        expect(image.style.backgroundColor).toBe(chosen);
        chosen = select.value = select.options[1].value;
        select.dispatchEvent(new Event("change"));
        expect(image.style.backgroundColor).toBe(chosen);
    });
});
