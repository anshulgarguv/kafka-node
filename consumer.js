const {Kafka} = require("kafkajs");
const msg = process.argv[2];
run();
async function run(){
    try{
        const kafka = new Kafka({
            "clientId":"myapp",
            "brokers":["localhost:9092"]
        });

        const consumer = kafka.consumer({"groupId":"test"});
        console.log("Connecting....");
        await consumer.connect();
        console.log("Connected....");
        
        await consumer.subscribe({
            "topic":"User",
            "fromBegining":true
        });
        await consumer.run({
            "eachMessage":async result =>{
                console.log("Recieved Message")
            }
        });
    }catch(ex){
        console.log("Something bad happened");
    }
    finally{

    }
} 