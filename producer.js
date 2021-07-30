const {Kafka} = require("kafkajs");
const msg = process.argv[2];
run();
async function run(){
    try{
        const kafka = new Kafka({
            "clientId":"myapp",
            "brokers":["localhost:9092"]
        });

        const producer = kafka.producer();
        console.log("Connecting....");
        await producer.connect();
        console.log("Connected....");
        //A-m 0,N-Z 1
        const partition = msg[0]<"N" ? 0: 1;
        await producer.send({
            "topic":"User",
            "messages":[
                {
                    "value":msg,
                    "partition":partition
                }
            ]
        })
        console.log("Send Successfully");
        producer.disconnect();
    }catch(ex){
        console.log("Something bad happened");
    }
    finally{
        process.exit(0);
    }
} 