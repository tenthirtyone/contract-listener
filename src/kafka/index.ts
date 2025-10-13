import { Kafka, Producer, Partitioners } from "kafkajs";
import { createLogger } from "../logger";

export class KafkaProducer {
  private kafka: Kafka;
  private producer: Producer;
  private logger: any;
  private connected: boolean = false;

  constructor(brokers: string[], clientId: string) {
    this.logger = createLogger("KafkaProducer");
    this.kafka = new Kafka({
      clientId,
      brokers,
      retry: {
        initialRetryTime: 100,
        retries: 8,
      },
    });
    this.producer = this.kafka.producer({
      createPartitioner: Partitioners.LegacyPartitioner,
      allowAutoTopicCreation: true,
    });
  }

  async connect(): Promise<void> {
    await this.producer.connect();
    this.connected = true;
    this.logger.info("Connected to Kafka");
  }

  async publishEvent(
    contractType: string,
    eventName: string,
    chainId: number,
    eventData: any
  ): Promise<void> {
    if (!this.connected) {
      this.logger.warn("Kafka not connected, skipping publish");
      return;
    }

    const topic = `${contractType}.${eventName}.${chainId}`;

    try {
      await this.producer.send({
        topic,
        messages: [
          {
            key: eventData.transactionHash,
            value: JSON.stringify({
              metadata: {
                contractAddress: eventData.address,
                contractType,
                eventName,
                chainId,
                blockNumber: eventData.blockNumber,
                blockHash: eventData.blockHash,
                transactionHash: eventData.transactionHash,
                transactionIndex: eventData.transactionIndex,
                logIndex: eventData.logIndex,
                timestamp: Date.now(),
              },
              eventData: eventData.parameters || eventData.data,
            }),
          },
        ],
      });

      this.logger.debug(`Published to ${topic}`);
    } catch (error) {
      this.logger.error(
        `Failed to publish to ${topic}:`,
        error instanceof Error ? error.message : error
      );
    }
  }

  async disconnect(): Promise<void> {
    if (this.connected) {
      await this.producer.disconnect();
      this.connected = false;
      this.logger.info("Disconnected from Kafka");
    }
  }
}
