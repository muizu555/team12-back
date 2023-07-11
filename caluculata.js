const dayjs = require("dayjs");


//date型の差分
let datetime = new Date("2023-07-09T16:36:22Z");
let dat2 = new Date("2023-07-09T16:26:22Z");

console.log(datetime);
console.log(dat2);

let dateDiffSecond = Math.floor(Math.abs(datetime - dat2) / 1000);
console.log(dateDiffSecond);//int型




//durationの話

function parseDuration(durationString) {
    const durationRegex = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/;
    const matches = durationRegex.exec(durationString);
    
    let hours = 0;
    let minutes = 0;
    let seconds = 0;
    
    if (matches[1]) {
      hours = parseInt(matches[1]);
    }
    
    if (matches[2]) {
      minutes = parseInt(matches[2]);
    }
    
    if (matches[3]) {
      seconds = parseInt(matches[3]);
    }
    
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    return totalSeconds;
  }
  
  const durationString = 'PT4H12M43S';
  const totalSeconds = parseDuration(durationString);
  console.log(totalSeconds); // 結果を表示
  
