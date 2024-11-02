function sanitizeAndParseJSON(responseString) {
    try {
        // Step 1: Trim whitespace
        let sanitizedString = responseString.trim();

        // Step 2: Remove code block delimiters (` ```json ` and ` ``` `)
        sanitizedString = sanitizedString.replace(/```json|```/g, '');

        // Step 3: Remove any stray backticks and excessive commas
        sanitizedString = sanitizedString.replace(/`+/g, '').replace(/,\s*}/g, '}').replace(/,\s*]/g, ']');

        // Step 4: Remove comments (line comments `//` and block comments `/* ... */`)
        sanitizedString = sanitizedString.replace(/\/\/.*|\/\*[\s\S]*?\*\//g, '');

        // Step 5: Check if the string is valid JSON by parsing it inside a try-catch
        try {
            return JSON.parse(sanitizedString);
        } catch (error) {
            throw new SyntaxError("Unable to parse JSON after sanitization");
        }

    } catch (error) {
        console.error("Error parsing JSON:", error.message);
        return null; // Return null to signify failed parsing
    }
}

export default sanitizeAndParseJSON;
