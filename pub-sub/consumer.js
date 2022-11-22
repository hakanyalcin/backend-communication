const amqp = require("amqplib");

const msg = {number: process.argv[2]}
connect();

async function connect() {
    try{
        const amqpServer = "amqps://gbpixnbk:Ggiv8g6gTwtk_vrgp13sLO5XVoKPa0QO@beaver.rmq.cloudamqp.com/gbpixnbk"
        const connection = await amqp.connect(amqpServer);
        const channel = await connection.createChannel();
        await channel.assertQueue("jobs");

        channel.consume("jobs", message => {
            const input = JSON.parse(message.content.toString());
            console.log(`received job with input ${input.number}`);

            if(input.number == 7) {
                channel.ack(message);
            }
        })
        
        console.log("waiting for messages...")

    }
    catch (e) {
        console.error(e);
    }
}