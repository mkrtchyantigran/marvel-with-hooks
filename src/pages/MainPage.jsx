import { useState } from "react"
import { ErrorBoundary } from "../components/errorBoundary/ErrorBoundary"
import RandomChar from "../components/random-char/RandomChar"
import CharList from "../components/char-list/CharList"
import CharInfo from "../components/char-info/CharInfo"
import decoration from "../resources/img/decoration.png";


export default function MainPage() {
    const [selectedChar, setSelectedChar] = useState(null);
    const onCharSelected = (id) => setSelectedChar(id);

    return (
        <>
            <ErrorBoundary>
                <RandomChar />
            </ErrorBoundary>

            <div className="char__content">
                <CharList onCharSelected={onCharSelected} />
                <ErrorBoundary>
                    <CharInfo charId={selectedChar} />
                </ErrorBoundary>
            </div>
            <img src={decoration} alt="decoration" className="bg-decoration" />
        </>
    )
}