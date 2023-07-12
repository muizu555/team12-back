const dayjs = require("dayjs");


//date型をNumber型に変換 (西暦1970年からの秒数)
function D2Num(dateStr) {
    let datetime = new Date(dateStr);
    let date0 = new Date(0);
    let res = Math.floor(Math.abs(datetime - date0) / 1000);
    return res;
}

console.log(D2Num("2023-07-09T16:36:22Z"));

//durationをNumber型に変換（秒数）
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

//const diff = totalSeconds - dateDiffSecond;
//console.log(diff);




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
total_time += Math.min(D2Num(currentDate) - D2Num(publishedAt[0]), parseDuration(duration[0]));
console.log('!' + total_time);

// inner//2個目から
for(let i = 1; i < N; i++){
    if(publishedAt[i] < prevDate){//これすごい
        total_time += Math.max(0, Math.min(D2Num(publishedAt[i - 1]) - D2Num(publishedAt[i], parseDuration(duration[i])))
                                  - (D2Num(prevDate) - D2Num(publishedAt[i])));
        break;
    }
    //ここが本当の計算
    total_time += Math.min(D2Num(publishedAt[i - 1]) - D2Num(publishedAt[i]), parseDuration(duration[i]));
}

console.log(total_time);//20間隔での総視聴時間(秒数)(予測)
//satisfies