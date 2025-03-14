class CustomApiError extends Error {
    constructor(message) {
        super(message);
    }
}

export { CustomApiError };