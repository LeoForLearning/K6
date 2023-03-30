import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    stages: [
      { duration: '20s', target: 20 }, // number of minutes/ number of users [ check with aws] for a sec approx 10 user
      { duration: '30s', target: 30 },
      { duration: '40s', target: 40 },
    ],
  };

//1 sec 3 user - from dev
//10 sec 30 user - from testing
//10 sec 60 user - ramp up

export default function () {
  const res = http.get('https://api.*-dev.chat/v2/'); 
  check(res, { 'status was 200': (r) => r.status == 200 });
  check(res, { 'status was 429': (r) => r.status == 429 });
  check(res, { 'status was 403': (r) => r.status == 403 });
  sleep(1);

}

//1. either comments should be posted [ will not happen anything to call?]
//callibaration test - duration hold , users increase , we can set 
// expected load to ask to dev for api for 1 sec
//flow - login / post / get a comments




