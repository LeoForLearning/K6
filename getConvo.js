import http from 'k6/http';
import { check, sleep } from 'k6';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.2/index.js';
import { sendSlackMessage } from './sendToSlack.js';

export { sendSlackMessage } from './sendToSlack.js';

export const options = {
  duration: '5s',
  vus:1,
  thresholds: {
    http_req_duration: ['p(95)<800'], // 95 percent of response times must be below 800ms
  },
};

// user divided volume * time = (10/100)*300 sec = 3 [ sleep time]

// we need to get 429 after basically 100 request 

export default function () {
  const res = http.get('https://api.*-dev.chat/v2/content/convos');
  check(res, { 'status was 200': (r) => r.status == 200 });
  check(res, { 'status was 429': (r) => r.status == 429 });
  sleep(1);

}

//

// export function handleSummary(data) {
//   console.log(data);
//   return {
//     stdout: textSummary(data, { indent: '→', enableColors: true }),

//     //'summary.json': JSON.stringify(data), //the default data object
//   };
// }


export function handleSummary(data){
  sendSlackMessage(data);
  return {
        stdout: textSummary(data, { indent: '→', enableColors: true }),
    
      }
}