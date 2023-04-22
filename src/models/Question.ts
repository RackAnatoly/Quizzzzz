export interface Question {
    id: number;
    app_id: number;
    category_id: number;
    question: string;
    explanation: string;
    answer: string;
    distractor1: string;
    distractor2: string;
    distractor3: string;
    shuffledOptions: string[];

    // Method to return an array of answer and distractors shuffled
    getShuffledOptions(): string[];

    // Method to check if a given answer is correct
    isAnswerCorrect(answer: string): boolean;

    // Method to get the currently selected option
    getSelectedOption(): string | null;

    // Method to set the currently selected option
    setSelectedOption(option: string): void;

    // Method to check if the currently selected option is correct
    isSelectedOptionCorrect(): boolean;

    // Method to check if the provided option is the selected one
    isOptionSelected(option: string): boolean;

    isAnyOptionSelected(): boolean;

    isOptionCorrect(item: string): Boolean;
}

export class QuestionModel implements Question {
    id: number;
    app_id: number;
    category_id: number;
    question: string;
    explanation: string;
    answer: string;
    distractor1: string;
    distractor2: string;
    distractor3: string;
    selectedOption: string | null;
    shuffledOptions: string[];

    constructor(question: Question) {
        this.id = question.id;
        this.app_id = question.app_id;
        this.category_id = question.category_id;
        this.question = question.question;
        this.explanation = question.explanation;
        this.answer = question.answer;
        this.distractor1 = question.distractor1;
        this.distractor2 = question.distractor2;
        this.distractor3 = question.distractor3;
        this.selectedOption = null;
        this.shuffledOptions = this.getShuffledOptions();
    }

    getShuffledOptions(): string[] {
        const options = [this.answer, this.distractor1, this.distractor2, this.distractor3];
        return shuffleArray(options);
    }

    isAnswerCorrect(answer: string): boolean {
        return answer === this.answer;
    }

    getSelectedOption(): string | null {
        return this.selectedOption;
    }

    isOptionSelected(option: string): boolean {
        return this.selectedOption === option;
    }

    setSelectedOption(option: string): void {
        this.selectedOption = option;
    }

    isAnyOptionSelected(): boolean {
        return Boolean(this.selectedOption);
    }

    isSelectedOptionCorrect(): boolean {
        return this.selectedOption === this.answer;
    }

    isOptionCorrect(option: string): boolean {
        return option === this.answer;
    }
}

function shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}
