function setTimeString (time){
    const hours = parseInt(time / 3600);
    const remainingMinute = time % 3600;
    const minute = parseInt(remainingMinute / 60);
    const second = remainingMinute % 60;
    return`${hours} hours  ${minute} minute ${second} second`
}
console.log(setTimeString(3700))