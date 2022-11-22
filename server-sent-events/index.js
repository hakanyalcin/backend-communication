const app = require("express")();

app.get("/", (req, res)  => res.send("hello"));

app.get("/stream", (req, res) => {
    res.setHeader("Content-Type", "text/event-stream");
    send(res);
})

let i = 0;
function send (res) {
    res.write("data: " + `hello from server ---- [${i++}]\n\n`);
    setTimeout(() => {
        send(res)
    }, 1000);
}

app.listen(8888);

//client code
// let sse = new EventSource("http://localhost:8888/stream");
// sse.onmessage = console.log;