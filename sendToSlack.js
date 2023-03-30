import http from "k6/http";

const payload ={
    channel:"random",
    attachments:[
        {
            color : "#632eb8",
            blocks : [
                {
                    type: "section",
                    text :{
                        type:"mrkdwn",
                        text:"*|K6 summary report",
                    }
                },
                {
                    type: "section",
                    text :{
                        type:"mrkdwn",
                        text:"",
                    }   
                }
            ]
        }
    ]
}

export function sendSlackMessage (data) {
let avgResponseTime = data.metrics.http_req_duration.values['avg'];
let p95ResponseTime = data.metrics.http_req_duration.values['p(95)'];
let vus = data.metrics.vus.values['value'];
//let maxThroughPut = data.metrics.http_req_values['count'];

let sectionblocks = payload.attachments.find((attachments) => {
    return attachments.blocks[1].type === "section";
})

//sectionblocks.blocks[1].text.text = "Througput:\n" + maxThroughPut.toFixed(2) + "reqs/s"
sectionblocks.blocks[1].text.text = "\n*95%  Response time:*\n" + p95ResponseTime + "ms"

const slackRes = http.post('https://hooks.slack.com/services/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', JSON.stringify(payload), {
});
}
