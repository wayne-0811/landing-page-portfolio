import { Accordion } from '../components/Accordion';
import { questions } from '../content/homepage';

export function Questions() {
  return <Accordion id="faq" eyebrow={questions.eyebrow} items={questions.items} />;
}
