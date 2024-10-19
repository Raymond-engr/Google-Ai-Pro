"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePrompt = generatePrompt;
function generatePrompt(query) {
    if (isWord(query)) {
        return `Briefly define the word "${query}"`;
    }
    else if (isCalculation(query)) {
        return `Calculate: ${query}`;
    }
    else if (isQuestion(query)) {
        return `Answer this question concisely and accurately with less than 110 words,
    For questions about people, events, or concepts, provide a brief, summarized factual answer with less than 110 words using the latest verified information available: ${query}`;
    }
    else {
        return `Provide a concise explanation with less than 110 words of "${query}"`;
    }
}
function isWord(query) {
    return /^[a-zA-Z]+$/.test(query);
}
function isCalculation(query) {
    return /[+\-*/]/.test(query) && !isNaN(parseFloat(query.replace(/[^0-9+\-*/.]/g, '')));
}
function isQuestion(query) {
    const questionWords = ['who', 'what', 'where', 'when', 'why', 'how', 'which'];
    const queryLowerCase = query.trim().toLowerCase();
    return questionWords.some((word) => queryLowerCase.startsWith(word)) || query.endsWith('?');
}
