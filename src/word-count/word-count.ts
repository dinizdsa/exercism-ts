export function count(sentence: string): Map<string, number> {
    const words = sentence.toLowerCase().match(/[a-z0-9]+(?:'[a-z0-9]+)*/g) ?? [];
    const wordCount = new Map<string, number>();
    for (const word of words) {
        wordCount.set(word, (wordCount.get(word) || 0) + 1);
    }
    return wordCount;
}