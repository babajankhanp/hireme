/**
 * Suppressing ResumePDF development errors.
 */
if (typeof window !== "undefined" && window.location.hostname === "localhost") {
    const consoleError = console.error;
    const SUPPRESSED_WARNINGS = ["DOCUMENT", "PAGE", "TEXT", "VIEW"];
    console.error = function filterWarnings(msg, ...args) {
        if (typeof args[0] !== 'string' || !SUPPRESSED_WARNINGS.some((entry) => args[0].includes(entry))) {
            consoleError(msg, ...args);
        }
    };
}

export const SuppressWarnings = () => {
    return <></>;
};
