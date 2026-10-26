import { WebzComponent, BindValue, Click } from "@boots-edu/webz";
import html from "./simple-calculator.component.html";
import css from "./simple-calculator.component.css";

type HistoryItem = {
    id: string;
    expression: string;
    answer: string;
    date: string;
};

export class SimpleCalculatorComponent extends WebzComponent {
    private _firstNumber = 0;
    private _secondNumber = 0;
    private _operationSelect = "add";
    private _result = 0;

    get firstNumber(): number {
        return this._firstNumber;
    }

    set firstNumber(value: number) {
        this._firstNumber = value;
        const input = (this as any).shadow?.getElementById(
            "first-number"
        ) as HTMLInputElement | null;

        if (input) input.value = String(value);
    }

    get secondNumber(): number {
        return this._secondNumber;
    }

    set secondNumber(value: number) {
        this._secondNumber = value;
        const input = (this as any).shadow?.getElementById(
            "second-number"
        ) as HTMLInputElement | null;

        if (input) input.value = String(value);
    }

    get operationSelect(): string {
        return this._operationSelect;
    }

    set operationSelect(value: string) {
        this._operationSelect = value;
        const select = (this as any).shadow?.getElementById(
            "operation-select"
        ) as HTMLSelectElement | null;

        if (select) select.value = value;
    }

    get result(): number {
        return this._result;
    }

    set result(value: number) {
        this._result = value;

        const element = (this as any).shadow?.getElementById(
            "result"
        ) as HTMLElement | null;

        if (element) element.innerHTML = String(value);
    }

    // Basic arithmetic method required by the homework tests.
    public calculate(): void {
        switch (this.operationSelect) {
            case "add":
                this.result = this.firstNumber + this.secondNumber;
                break;

            case "subtract":
                this.result = this.firstNumber - this.secondNumber;
                break;

            case "multiply":
                this.result = this.firstNumber * this.secondNumber;
                break;

            case "divide":
                this.result = this.firstNumber / this.secondNumber;
                break;

            default:
                this.result = 0;
        }
    }

    @BindValue("result")
    private display = "0";

    @BindValue("expression")
    private expression = "";

    private current = "0";
    private formula = "";
    private finished = false;
    private history: HistoryItem[] = [];
    private readonly storageKey = "iphone-calculator-history";

    constructor() {
        super(html, css);

        const root = (this as any).shadow as ShadowRoot;

        const firstInput = root.getElementById(
            "first-number"
        ) as HTMLInputElement | null;

        const secondInput = root.getElementById(
            "second-number"
        ) as HTMLInputElement | null;

        const operationInput = root.getElementById(
            "operation-select"
        ) as HTMLSelectElement | null;

        firstInput?.addEventListener("input", () => {
            this._firstNumber = Number(firstInput.value);
        });

        secondInput?.addEventListener("input", () => {
            this._secondNumber = Number(secondInput.value);
        });

        operationInput?.addEventListener("change", () => {
            this._operationSelect = operationInput.value;
        });

        root.getElementById("calculate-button")?.addEventListener(
            "click",
            () => this.calculate()
        );

        this.loadHistory();

        document.addEventListener("keydown", (event) => {
            const target = event.target as HTMLElement | null;

            if (
                target?.tagName === "INPUT" ||
                target?.tagName === "TEXTAREA"
            ) {
                return;
            }

            const key = event.key;

            if (/^[0-9]$/.test(key)) {
                this.number(key);
            } else if (key === ".") {
                this.decimal();
            } else if (["+", "-", "*", "/"].includes(key)) {
                event.preventDefault();
                this.operator(key);
            } else if (key === "Enter" || key === "=") {
                event.preventDefault();
                this.calculateExpression();
            } else if (key === "Backspace") {
                this.backspace();
            } else if (key === "Escape") {
                this.clear();
            } else if (key === "%") {
                this.percent();
            }
        });
    }

    private update() {
        const shown = this.finished ? this.current : this.formula || "0";

        this.display = shown
            .replace(/\*/g, " × ")
            .replace(/\//g, " ÷ ")
            .replace(/\+/g, " + ")
            .replace(/-/g, " − ");

        this.expression = "";
    }

    private number(n: string) {
        if (this.finished) {
            this.formula = n;
            this.current = n;
            this.finished = false;
        } else if (/[+\-*/]$/.test(this.formula)) {
            this.formula += n;
            this.current = n;
        } else {
            this.formula += n;
            this.current = this.formula.split(/[+\-*/]/).pop() || n;
        }

        this.update();
    }

    private operator(op: string) {
        if (this.finished) {
            this.formula = this.current;
            this.finished = false;
        }

        if (!this.formula && op === "-") {
            this.formula = "-";
        } else if (!this.formula) {
            return;
        } else if (/[+\-*/]$/.test(this.formula)) {
            this.formula = this.formula.slice(0, -1) + op;
        } else {
            this.formula += op;
        }

        this.update();
    }

    private decimal() {
        if (this.finished) {
            this.formula = "0";
            this.current = "0";
            this.finished = false;
        }

        const last = this.formula.split(/[+\-*/]/).pop() || "";

        if (!last.includes(".")) {
            this.formula += last ? "." : "0.";
        }

        this.current = this.formula.split(/[+\-*/]/).pop() || "0";
        this.update();
    }

    // Expression calculation for the iPhone-style calculator.
    private calculateExpression() {
        if (
            !this.formula ||
            /[+\-*/.]$/.test(this.formula) ||
            this.formula === "-"
        ) {
            return;
        }

        const originalFormula = this.formula;

        try {
            const tokens = originalFormula.match(
                /(?:\d+\.?\d*|\.\d+)|[+\-*/]/g
            );

            if (!tokens || tokens.join("") !== originalFormula) {
                return;
            }

            const values: number[] = [];
            const ops: string[] = [];

            const applyOperation = () => {
                const b = values.pop();
                const a = values.pop();
                const op = ops.pop();

                if (a === undefined || b === undefined || !op) {
                    throw new Error("Invalid calculation");
                }

                if (op === "+") {
                    values.push(a + b);
                } else if (op === "-") {
                    values.push(a - b);
                } else if (op === "*") {
                    values.push(a * b);
                } else if (op === "/") {
                    values.push(b === 0 ? NaN : a / b);
                }
            };

            for (const token of tokens) {
                if (!isNaN(Number(token))) {
                    values.push(Number(token));
                } else {
                    while (
                        ops.length > 0 &&
                        ["*", "/"].includes(ops[ops.length - 1])
                    ) {
                        applyOperation();
                    }

                    ops.push(token);
                }
            }

            while (ops.length > 0) {
                applyOperation();
            }

            const answer = values[0];

            this.current = Number.isFinite(answer)
                ? String(Number(answer.toPrecision(10)))
                : "Error";

            if (this.current !== "Error") {
                this.addToHistory(originalFormula, this.current);
            }

            this.formula = this.current;
            this.finished = true;
            this.update();
        } catch {
            this.current = "Error";
            this.formula = "";
            this.finished = true;
            this.update();
        }
    }

    private clear() {
        this.current = "0";
        this.formula = "";
        this.finished = false;
        this.update();
    }

    private backspace() {
        if (this.finished) {
            this.clear();
            return;
        }

        this.formula = this.formula.slice(0, -1);
        this.current = this.formula.split(/[+\-*/]/).pop() || "0";
        this.update();
    }

    private percent() {
        const value = Number(this.current) / 100;

        this.current = String(value);

        this.formula = this.formula.replace(
            /(?:\d+\.?\d*|\.\d+)$/,
            this.current
        );

        this.finished = false;
        this.update();
    }

    private sign() {
        if (this.current === "0") return;

        this.current = String(-Number(this.current));

        this.formula = this.formula.replace(
            /(?:\d+\.?\d*|\.\d+)$/,
            this.current
        );

        this.update();
    }

    private addToHistory(expression: string, answer: string) {
        const item: HistoryItem = {
            id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
            expression,
            answer,
            date: new Date().toLocaleString()
        };

        this.history.unshift(item);
        this.history = this.history.slice(0, 100);
        this.saveHistory();
        this.renderHistory();
    }

    private loadHistory() {
        try {
            const saved = localStorage.getItem(this.storageKey);
            this.history = saved
                ? JSON.parse(saved) as HistoryItem[]
                : [];
        } catch {
            this.history = [];
        }

        this.renderHistory();
    }

    private saveHistory() {
        try {
            localStorage.setItem(
                this.storageKey,
                JSON.stringify(this.history)
            );
        } catch {
            // History still works until the page is closed.
        }
    }

    private getElement<T extends HTMLElement>(id: string): T | null {
        return (this as any).shadow?.getElementById(id) as T | null;
    }

    private renderHistory() {
        const list = this.getElement<HTMLDivElement>("history-list");
        const empty = this.getElement<HTMLParagraphElement>("history-empty");

        if (!list || !empty) return;

        list.replaceChildren();
        empty.style.display = this.history.length ? "none" : "block";

        for (const item of this.history) {
            const row = document.createElement("div");
            row.className = "history-item";

            const expression = document.createElement("div");
            expression.className = "history-expression";
            expression.textContent = item.expression.replace(
                /[*\/+\-]/g,
                (op) => ({
                    "*": " × ",
                    "/": " ÷ ",
                    "+": " + ",
                    "-": " − "
                })[op] || op
            );

            const answer = document.createElement("div");
            answer.className = "history-answer";
            answer.textContent = `= ${item.answer}`;

            const date = document.createElement("div");
            date.className = "history-expression";
            date.textContent = item.date;

            const actions = document.createElement("div");
            actions.className = "history-actions";

            const makeButton = (label: string, action: string) => {
                const button = document.createElement("button");
                button.textContent = label;
                button.dataset.action = action;
                button.dataset.id = item.id;
                return button;
            };

            actions.append(
                makeButton("Open", "open"),
                makeButton("Copy sum", "copy-answer"),
                makeButton("Copy expression", "copy-expression"),
                makeButton("Delete", "delete")
            );

            row.append(expression, answer, date, actions);
            list.append(row);
        }
    }

    private showHistory() {
        this.getElement("history-panel")?.classList.add("open");
        this.renderHistory();
    }

    private hideHistory() {
        this.getElement("history-panel")?.classList.remove("open");
    }

    private clearHistory() {
        if (!this.history.length) return;

        if (confirm("Delete all calculator history?")) {
            this.history = [];
            this.saveHistory();
            this.renderHistory();
        }
    }

    private async copyText(value: string) {
        try {
            await navigator.clipboard.writeText(value);
        } catch {
            const input = document.createElement("textarea");
            input.value = value;
            document.body.append(input);
            input.select();
            document.execCommand("copy");
            input.remove();
        }
    }

    private handleHistoryAction(event: Event) {
        const target = event.target as HTMLElement;
        const button = target.closest("button") as HTMLButtonElement | null;

        if (!button) return;

        const id = button.dataset.id;
        const action = button.dataset.action;

        if (!id || !action) return;

        const item = this.history.find((entry) => entry.id === id);
        if (!item) return;

        if (action === "open") {
            this.formula = item.expression;
            this.current = item.answer;
            this.finished = false;
            this.update();
            this.hideHistory();
        } else if (action === "copy-expression") {
            this.copyText(item.expression);
        } else if (action === "copy-answer") {
            this.copyText(item.answer);
        } else if (action === "delete") {
            this.history = this.history.filter((entry) => entry.id !== id);
            this.saveHistory();
            this.renderHistory();
        }
    }

    @Click("history-button")
    private historyButton() {
        this.showHistory();
    }

    @Click("history-close")
    private historyClose() {
        this.hideHistory();
    }

    @Click("history-clear")
    private historyClear() {
        this.clearHistory();
    }

    @Click("history-list")
    private historyListClick(event: Event) {
        this.handleHistoryAction(event);
    }

    @Click("zero")
    private zero() {
        this.number("0");
    }

    @Click("one")
    private one() {
        this.number("1");
    }

    @Click("two")
    private two() {
        this.number("2");
    }

    @Click("three")
    private three() {
        this.number("3");
    }

    @Click("four")
    private four() {
        this.number("4");
    }

    @Click("five")
    private five() {
        this.number("5");
    }

    @Click("six")
    private six() {
        this.number("6");
    }

    @Click("seven")
    private seven() {
        this.number("7");
    }

    @Click("eight")
    private eight() {
        this.number("8");
    }

    @Click("nine")
    private nine() {
        this.number("9");
    }

    @Click("add-button")
    private add() {
        this.operator("+");
    }

    @Click("subtract-button")
    private subtract() {
        this.operator("-");
    }

    @Click("multiply-button")
    private multiply() {
        this.operator("*");
    }

    @Click("divide-button")
    private divide() {
        this.operator("/");
    }

    @Click("equals-button")
    private equals() {
        this.calculateExpression();
    }

    @Click("clear-button")
    private clearButton() {
        this.clear();
    }

    @Click("sign-button")
    private signButton() {
        this.sign();
    }

    @Click("percent-button")
    private percentButton() {
        this.percent();
    }

    @Click("decimal-button")
    private decimalButton() {
        this.decimal();
    }

    @Click("backspace-button")
    private backspaceButton() {
        this.backspace();
    }
}