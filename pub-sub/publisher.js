const amqp = require("amqplib");

const msg = {number: process.argv[2]}
connect();

async function connect() {
    try{
        const amqpServer = "amqps://gbpixnbk:Ggiv8g6gTwtk_vrgp13sLO5XVoKPa0QO@beaver.rmq.cloudamqp.com/gbpixnbk"
        const connection = await amqp.connect(amqpServer);
        const channel = await connection.createChannel();
        await channel.assertQueue("jobs");
        await channel.sendToQueue("jobs", Buffer.from(JSON.stringify(msg)));
        console.log(`job sent succesfully ${msg.number}`);
        await channel.close();
        await connection.close();
    }
    catch (e) {
        console.error(e);
    }
}