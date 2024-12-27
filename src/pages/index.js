import styles from "@styles/Home.module.css";
import Head from "next/head";
import { useState } from "react";


export const EMPTY_RESULT_HINT = "Geben Sie einen Wert > 1 ein in das Formular ein.";

function Home() {
    const [number, setNumber] = useState("");
    const [showError, setShowError] = useState(false);
    const [results, setResults] = useState([]);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (number > 1) {
            setShowError(false);
            const fizzBuzzResults = Array.from({ length: number }, (_, i) => {
                const value = i + 1;
                if (value % 3 === 0 && value % 5 === 0) return "FizzBuzz";
                if (value % 3 === 0) return "Fizz";
                if (value % 5 === 0) return "Buzz";
                return value;
            });
            setResults(fizzBuzzResults);
        } else {
            setShowError(true); // Zeige den Hinweistext
        }
    };

    return (
        <>
            <Head>
                <title>Bewerber-Quiz - FizzBuzz</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1>FizzBuzz - Bewerber Quiz</h1>
                <div>

                    <form className={styles.form} onSubmit={handleSubmit}>
                        <input
                            type="number"
                            name="number"
                            title="Zahl > 1 eingeben."
                            placeholder="Zahl > 1 eingeben."
                            value={number}
                            onChange={(e) => setNumber(e.target.value)}
                            onFocus={() => setResults([])}
                        />
                        <input type="submit" value="Start" />
                    </form>

                    <div style={{ display: showError ? 'block' : 'none', color: 'red' }} name="error">
                        {EMPTY_RESULT_HINT}
                    </div>

                    <div style={{ display: !showError ? 'block' : 'none' }} name="error">
                        <ul className="result">
                            {results.map((result, index) => (
                                <li key={`${result}-${index}`}>{result}</li>
                            ))}
                        </ul>
                    </div>

                </div>
            </main >
        </>
    );
}

export default Home;
