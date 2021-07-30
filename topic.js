const {Kafka} = require("kafkajs");
run();
async function run(){
    try{
        const kafka = new Kafka({
            "clientId":"myapp",
            "brokers":["localhost:9092"]
        });

        const admin = kafka.admin();
        console.log("Connecting....");
        await admin.connect();
        console.log("Connected....");
        await admin.createTopics({
            "topics":[{
                "topic":"Users",
                "numPartitions":2
            }]
        })
        console.log("Created Successfully");
        admin.disconnect();
    }catch(ex){
        console.log("Something bad happened");
    }
    finally{
        process.exit(0);
    }
} 