import { render, screen, fireEvent } from '@testing-library/react';
import Home, { EMPTY_RESULT_HINT } from "@pages/";

describe("<Home/>...", () => {

    //--------------------------------------
    //-  feel free to add more test cases  -
    //--------------------------------------

    describe("renders properly the...", () => {

        it("headline", () => {
            render(<Home />);

            screen.getByRole("heading", { name: "FizzBuzz - Bewerber Quiz", level: 1 });
        });

        it("input for target digit", () => {
            render(<Home />);
            screen.getByRole("spinbutton");
        });


        it("submit button", () => {
            render(<Home />);
            screen.getByRole("button", { name: /start/i });
        });

        it("hint text that a digit greater 1 has to be submitted", () => {
            render(<Home />);
            screen.getByTitle("Zahl > 1 eingeben.");

        });

        it("error message when a digit lower than 1 was submitted", () => {
            render(<Home />);
            const input = screen.getByPlaceholderText("Zahl > 1 eingeben.");
            const button = screen.getByRole("button", { name: /start/i });
        
            // Simuliere die Eingabe einer Zahl <= 1
            fireEvent.change(input, { target: { value: '0' } });
            fireEvent.click(button);
        
            // Überprüfe, ob die Fehlermeldung angezeigt wird
            expect(screen.getByText(EMPTY_RESULT_HINT)).toBeVisible();
        });

        describe("result when...", () => {

            it("only digits has to be rendered", async () => {
                render(<Home />);

                submitFormWith(2);

                // hint should be disappeared
                expect(screen.queryByText(EMPTY_RESULT_HINT, { selector: ".result" })).toBeNull();

                screen.getByText(/^1$/, { selector: ".result li" });
                screen.getByText(/^2$/, { selector: ".result li" });
            });

            it("Fizz has to be rendered", () => {
                render(<Home />);
                submitFormWith(3);
            
                // Überprüfen, ob "Fizz" in der Ergebnisliste enthalten ist
                expect(screen.getByText("Fizz")).toBeInTheDocument();
            });

            it("Buzz has to be rendered",() => {
                render(<Home />);
            
                submitFormWith(5);
            
                // Überprüfen, ob "Fizz" in der Ergebnisliste enthalten ist
                expect(screen.getByText("Buzz")).toBeInTheDocument();

            });

            it("FizzBuzz has to be rendered",() => {
                render(<Home />);
            
                submitFormWith(15);
            
                // Überprüfen, ob "Fizz" in der Ergebnisliste enthalten ist
                expect(screen.getByText("FizzBuzz")).toBeInTheDocument();

            });

        });

        

    });

    it("clears result list when input gains focus", () => {
        // Komponente rendern
        render(<Home />);
    
        // Ergebnisse initialisieren durch Nutzung der Hilfsfunktion
        submitFormWith(15);
    
        // Sicherstellen, dass Ergebnisse angezeigt werden
        expect(screen.queryAllByRole("listitem").length).toBeGreaterThan(0);
    
        // Eingabefeld fokussieren
        const input = screen.getByPlaceholderText("Zahl > 1 eingeben.");
        fireEvent.focus(input);
    
        // Überprüfen, ob die Ergebnisliste geleert wurde
        expect(screen.queryAllByRole("listitem").length).toBe(0);
    
        // Hinweistext sollte nicht angezeigt werden
        expect(screen.queryByText(EMPTY_RESULT_HINT, { exact: false })).not.toBeVisible();
    });
    

    // Hilfsfunktion zum Ausfüllen und Absenden des Formulars
    function submitFormWith(value) {
        const input = screen.getByPlaceholderText("Zahl > 1 eingeben.");
        const button = screen.getByRole("button", { name: /start/i });
    
        fireEvent.change(input, { target: { value: String(value) } });
        fireEvent.click(button);
    }


});