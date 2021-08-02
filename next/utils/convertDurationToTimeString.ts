export const convertSecondsToTimeString = (seconds: number): string => {
    const hours = Math.floor(seconds / (60 * 60));
    const remainingSeconds = seconds % (60 * 60);
    const minutes = Math.floor(remainingSeconds / 60);
    const finalSeconds = Math.floor(remainingSeconds % 60);

    return `${('0' + hours).slice(-2)}:${('0' + minutes).slice(-2)}:${('0' + finalSeconds).slice(-2)}`;
}