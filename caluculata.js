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

const diff = totalSeconds - dateDiffSecond;
console.log(diff);




//ここから実際の
//et now_time = Date.

const utf = new Date();
const currentDate = new Date(utf.getTime()+9*60*60*1000);
const prevDate = new Date(currentDate.getTime() - 20*60*1000);
const val = Math.floor(currentDate);

console.log(currentDate);//現在の時刻を出す方法
console.log(prevDate);
console.log(val);







const publishedAt = [
    "2023-07-02T06:10:17Z",
    "2023-07-02T05:54:53Z",
] ;

const duration = [
    "PT4H12M43S",
    "PT2H1M43S",
]



















let total_time = 0;

// first video
total_time += min(currentDate - publishedAt[0], duration[0]);

// innet//2個目から
for(let i = 1; i < N; i++){
    if(publishedAt[i] < prevDate){//これすごい
        total_time += max(0, min(pub[i - 1] - pub[i], duration[i]) - (prevDate - pub[i]));
        break;
    }
    //ここが本当の計算
    total_time += min(p[i - 1] - p[i], duration[i]);
}

console.log(total_time);//20間隔での総視聴時間(予測)





  
