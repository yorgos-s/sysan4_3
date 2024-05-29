
//converts the string name   to   the corresponding number
const TimeFrameConverter = (name) => {
    if (name === "day") {
        return 0;
    } else if (name === "week") {
        return 1;
    } else if (name === "month") {
        return 2;
    } 
};

export default TimeFrameConverter;