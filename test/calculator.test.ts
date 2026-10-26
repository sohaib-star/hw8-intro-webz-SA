import { bootstrap } from "@boots-edu/webz";
import { MainComponent } from "../src/app/main.component";
import { SimpleCalculatorComponent } from "../src/app/simple-calculator/simple-calculator.component";

describe("Calculator", () => {
    let component: MainComponent;
    beforeEach(() => {
        const html: string = `<div>Testing Environment</div><div id='main-target'></div>`;
        component = bootstrap<MainComponent>(MainComponent, html);
    });

    test("(1 pts) calculator field is defined in MainComponent", () => {
        expect(component["calculator"]).toBeDefined();
        expect(component["calculator"]).toBeInstanceOf(
            SimpleCalculatorComponent,
        );
    });

    test("(1 pts) SimpleCalculatorComponent has been added to the id 'calculator'", () => {
        const element = component["shadow"].getElementById(
            "calculator",
        ) as HTMLElement;
        expect(element).not.toBeNull();
    });

    test("(1 pts) SimpleCalculatorComponent has HTML input with id 'first-number'", () => {
        const element = component["calculator"]["shadow"].getElementById(
            "first-number",
        ) as HTMLElement;
        expect(element).not.toBeNull();
        expect(element.tagName).toMatch(/input/i);
        expect(element.getAttribute("type")).toMatch(/number/i);
    });
    test("(1 pts) SimpleCalculatorComponent has HTML input with id 'second-number'", () => {
        const element = component["calculator"]["shadow"].getElementById(
            "second-number",
        ) as HTMLElement;
        expect(element).not.toBeNull();
        expect(element.tagName).toMatch(/input/i);
        expect(element.getAttribute("type")).toMatch(/number/i);
    });
    test("(1 pts) SimpleCalculatorComponent has HTML select with id 'operation-select'", () => {
        const element = component["calculator"]["shadow"].getElementById(
            "operation-select",
        ) as HTMLElement;
        expect(element).not.toBeNull();
        expect(element.tagName).toMatch(/select/i);
    });
    test("(1 pts) SimpleCalculatorComponent has 4 HTML Options representing 4 operations", () => {
        const element = component["calculator"]["shadow"].getElementById(
            "operation-select",
        ) as HTMLSelectElement;
        expect(element).not.toBeNull();
        expect(element.tagName).toMatch(/select/i);
        expect(element.options.length).toBe(4);
        expect(element.options[0].value).toBe("add");
        expect(element.options[1].value).toBe("subtract");
        expect(element.options[2].value).toBe("multiply");
        expect(element.options[3].value).toBe("divide");
    });
    test("(1 pts) SimpleCalculatorComponent has HTML button with id 'calculate-button'", () => {
        const element = component["calculator"]["shadow"].getElementById(
            "calculate-button",
        ) as HTMLElement;
        expect(element).not.toBeNull();
        expect(element.tagName).toMatch(/button/i);
    });
    test("(1 pts) SimpleCalculatorComponent has HTML div with id 'result'", () => {
        const element = component["calculator"]["shadow"].getElementById(
            "result",
        ) as HTMLElement;
        expect(element).not.toBeNull();
        expect(element.tagName).toMatch(/(?:div)|(?:span)/i);
    });

    test("(1 pts) SimpleCalculatorComponent has a field named 'firstNumber'", () => {
        expect(component["calculator"]["firstNumber"]).toBeDefined();
        expect(typeof component["calculator"]["firstNumber"]).toBe("number");
    });
    test("(1 pts) SimpleCalculatorComponent has a field named 'secondNumber'", () => {
        expect(component["calculator"]["secondNumber"]).toBeDefined();
        expect(typeof component["calculator"]["secondNumber"]).toBe("number");
    });
    test("(1 pts) SimpleCalculatorComponent has a field named 'operationSelect'", () => {
        expect(component["calculator"]["operationSelect"]).toBeDefined();
        expect(typeof component["calculator"]["operationSelect"]).toBe(
            "string",
        );
    });
    test("(1 pts) SimpleCalculatorComponent has a field named 'result'", () => {
        expect(component["calculator"]["result"]).toBeDefined();
        expect(typeof component["calculator"]["result"]).toBe("number");
    });

    test("(1 pts) Changing first-number input changes the firstNumber field", () => {
        const element = component["calculator"]["shadow"].getElementById(
            "first-number",
        ) as HTMLInputElement;
        // Input 100
        element.value = "100";
        element.dispatchEvent(new Event("input"));
        expect(component["calculator"]["firstNumber"]).toBe(100);
        // Input 201
        element.value = "201";
        element.dispatchEvent(new Event("input"));
        expect(component["calculator"]["firstNumber"]).toBe(201);
    });

    test("(1 pts) Changing second-number input changes the secondNumber field", () => {
        const element = component["calculator"]["shadow"].getElementById(
            "second-number",
        ) as HTMLInputElement;
        // Input 99
        element.value = "99";
        element.dispatchEvent(new Event("input"));
        expect(component["calculator"]["secondNumber"]).toBe(99);
        // Input 57
        element.value = "57";
        element.dispatchEvent(new Event("input"));
        expect(component["calculator"]["secondNumber"]).toBe(57);
    });

    test("(1 pts) Changing operation-select select changes the operationSelect field", () => {
        const element = component["calculator"]["shadow"].getElementById(
            "operation-select",
        ) as HTMLSelectElement;
        // Change select to subtract
        element.value = "subtract";
        element.dispatchEvent(new Event("change"));
        expect(component["calculator"]["operationSelect"]).toBe("subtract");
        // Change select to divide
        element.value = "divide";
        element.dispatchEvent(new Event("change"));
        expect(component["calculator"]["operationSelect"]).toBe("divide");
    });

    test("(1 pts) Changing firstNumber field changes the first-number input", () => {
        const element = component["calculator"]["shadow"].getElementById(
            "first-number",
        ) as HTMLInputElement;
        // Change firstNumber to 48
        component["calculator"]["firstNumber"] = 48;
        expect(element.value).toBe("48");
        // Change firstNumber to 62
        component["calculator"]["firstNumber"] = 62;
        expect(element.value).toBe("62");
    });

    test("(1 pts) Changing secondNumber field changes the second-number input", () => {
        const element = component["calculator"]["shadow"].getElementById(
            "second-number",
        ) as HTMLInputElement;
        // Change secondNumber to 34
        component["calculator"]["secondNumber"] = 34;
        expect(element.value).toBe("34");
        // Change secondNumber to 26
        component["calculator"]["secondNumber"] = 26;
        expect(element.value).toBe("26");
    });

    test("(1 pts) Changing operationSelect field changes the operation-select select", () => {
        const element = component["calculator"]["shadow"].getElementById(
            "operation-select",
        ) as HTMLSelectElement;
        // Change operationSelect to add
        component["calculator"]["operationSelect"] = "add";
        expect(element.value).toBe("add");
        // Change operationSelect to multiply
        component["calculator"]["operationSelect"] = "multiply";
        expect(element.value).toBe("multiply");
    });

    test("(1 pts) Changing result field changes the result in HTML", () => {
        const element = component["calculator"]["shadow"].getElementById(
            "result",
        ) as HTMLElement;
        // Change result to 100
        component["calculator"]["result"] = 100;
        expect(element.innerHTML).toBe("100");
        // Change result to 200
        component["calculator"]["result"] = 200;
        expect(element.innerHTML).toBe("200");
    });

    test("(1 pts) The calculate method correctly does basic addition", () => {
        component["calculator"]["firstNumber"] = 5;
        component["calculator"]["secondNumber"] = 7;
        component["calculator"]["operationSelect"] = "add";
        component["calculator"]["calculate"]();
        expect(component["calculator"]["result"]).toBe(12);
        // Change the numbers
        component["calculator"]["firstNumber"] = 10;
        component["calculator"]["secondNumber"] = 20;
        component["calculator"]["operationSelect"] = "add";
        component["calculator"]["calculate"]();
        expect(component["calculator"]["result"]).toBe(30);
    });

    test("(3 pts) The calculate method correctly does all four operations", () => {
        component["calculator"]["firstNumber"] = 5;
        component["calculator"]["secondNumber"] = 7;
        component["calculator"]["operationSelect"] = "add";
        component["calculator"]["calculate"]();
        expect(component["calculator"]["result"]).toBe(12);
        // Change the numbers
        component["calculator"]["firstNumber"] = 10;
        component["calculator"]["secondNumber"] = 20;
        component["calculator"]["calculate"]();
        expect(component["calculator"]["result"]).toBe(30);
        // Change the operation: subtract
        component["calculator"]["operationSelect"] = "subtract";
        component["calculator"]["calculate"]();
        expect(component["calculator"]["result"]).toBe(-10);
        // Change the operation: multiply
        component["calculator"]["operationSelect"] = "multiply";
        component["calculator"]["calculate"]();
        expect(component["calculator"]["result"]).toBe(200);
        // Change the operation: divide
        component["calculator"]["operationSelect"] = "divide";
        component["calculator"]["calculate"]();
        expect(component["calculator"]["result"]).toBeCloseTo(1 / 2);
    });

    test("(3 pts) The calculate-button button updates the result", () => {
        const element = component["calculator"]["shadow"].getElementById(
            "calculate-button",
        ) as HTMLButtonElement;
        const resultElement = component["calculator"]["shadow"].getElementById(
            "result",
        ) as HTMLElement;
        // Set the numbers
        const firstNumber = component["calculator"]["shadow"].getElementById(
            "first-number",
        ) as HTMLInputElement;
        const secondNumber = component["calculator"]["shadow"].getElementById(
            "second-number",
        ) as HTMLInputElement;
        firstNumber.value = "5";
        secondNumber.value = "7";
        firstNumber.dispatchEvent(new Event("input"));
        secondNumber.dispatchEvent(new Event("input"));
        // Set the operation
        const operationSelect = component["calculator"][
            "shadow"
        ].getElementById("operation-select") as HTMLSelectElement;
        operationSelect.value = "add";
        operationSelect.dispatchEvent(new Event("change"));
        // Click the button
        element.click();
        expect(resultElement.innerHTML).toBe("12");
        // Change the numbers
        firstNumber.value = "10";
        secondNumber.value = "20";
        firstNumber.dispatchEvent(new Event("input"));
        secondNumber.dispatchEvent(new Event("input"));
        // Click the button
        element.click();
        expect(resultElement.innerHTML).toBe("30");
        // Change the operation: multiply
        operationSelect.value = "multiply";
        operationSelect.dispatchEvent(new Event("change"));
        // Click the button
        element.click();
        expect(resultElement.innerHTML).toBe("200");
    });
});
