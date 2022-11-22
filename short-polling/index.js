const app = require("express") ();
const jobs = {};

app.post ("/submit", (req, res) => {
    const jobId = `${Date.now()}`;
    jobs[jobId] = 0;
    updateJob(jobId, 0);
    res.end ("\n\n\n" + jobId + "\n\n\n");
})

app.get("/checkstatus", (req, res) => {
    console.log(jobs[req.query.jobId]);
    res.end("Job Status:" + jobs[req.query.jobId] +"%\n\n");
})


app.listen(8080, ()=> console.log("listening 8080..."));


function updateJob(jobId, progress) {
    jobs[jobId] = progress;
    console.log(`updated ${jobId} to ${progress}`);
    if (progress == 100) return;
    this.setTimeout(() => {
        updateJob(jobId, progress+10)
    }, 3000);
}