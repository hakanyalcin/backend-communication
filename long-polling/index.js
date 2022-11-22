const app = require("express") ();
const jobs = {};

app.post ("/submit", (req, res) => {
    const jobId = `${Date.now()}`;
    jobs[jobId] = 0;
    updateJob(jobId, 0);
    res.end ("\n\n\n" + jobId + "\n\n\n");
})

app.get("/checkstatus", async (req, res) => {
    console.log(jobs[req.query.jobId]);
    while(await checkJobComplete(req.query.jobId) == false);
    //while(jobs[req.query.jobId] <100); // in this case, while loop blocks the server and will not response.
    res.end("Job Status:" + jobs[req.query.jobId] +"%\n\n");
})


app.listen(8080, ()=> console.log("listening 8080..."));

async function checkJobComplete(jobId) {
    return new Promise((resolve, reject) => {
        if(jobs[jobId] < 100)
            this.setTimeout(() => resolve(false), 1000);
        else
        resolve(true)

    })
}

function updateJob(jobId, progress) {
    jobs[jobId] = progress;
    console.log(`updated ${jobId} to ${progress}`);
    if (progress == 100) return;
    this.setTimeout(() => {
        updateJob(jobId, progress+10)
    }, 3000);
}