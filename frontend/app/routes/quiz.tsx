import { useState, type FormEvent } from "react";
import { Link } from "react-router";
import SheetPage from "../components/SheetPage";
import { liveEssay, previewNote, quizCopy } from "../content";

const choices = ["1", "2", "4"] as const;

export function meta() {
  return [{ title: "Quiz | Programming in Depth" }];
}

export default function Quiz() {
  const [selected, setSelected] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selected) {
      return;
    }
    setRevealed(true);
  }

  return (
    <SheetPage
      index="SEC / QIZ"
      title="Quiz"
      definitions={[
        { term: "PURPOSE", detail: quizCopy },
        { term: "PREVIEW", detail: previewNote },
      ]}
    >
      <form className="quiz-block" onSubmit={onSubmit}>
        <fieldset className="quiz-question">
          <legend>
            A .NET string contains only the grinning-face emoji (😀). What does <code>String.Length</code>{" "}
            return?
          </legend>
          <div className="choice-row">
            {choices.map((choice) => (
              <label key={choice} className="quiz-choice">
                <input
                  type="radio"
                  name="length"
                  value={choice}
                  checked={selected === choice}
                  onChange={() => {
                    setSelected(choice);
                  }}
                />
                {choice}
              </label>
            ))}
          </div>
        </fieldset>
        <button type="submit" className="mono-btn quiz-submit" disabled={selected === null}>
          SHOW EXPLANATION
        </button>
        {revealed ? (
          <dl className="def-list explain">
            <div>
              <dt>SELECTION</dt>
              <dd>{selected}</dd>
            </div>
            <div>
              <dt>ANSWER</dt>
              <dd>2</dd>
            </div>
            <div>
              <dt>WHY</dt>
              <dd>
                The grinning-face emoji is encoded as a UTF-16 surrogate pair. String.Length counts
                UTF-16 code units, not Unicode scalar values, so the length is 2.
              </dd>
            </div>
            <div>
              <dt>SEE</dt>
              <dd className="quiz-see">
                <Link to={liveEssay.path}>{liveEssay.title}</Link>
              </dd>
            </div>
          </dl>
        ) : (
          <p className="quiz-see return-line">
            <Link to={liveEssay.path}>{liveEssay.title}</Link>
          </p>
        )}
      </form>
    </SheetPage>
  );
}
