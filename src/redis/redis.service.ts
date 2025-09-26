import { Injectable, OnModuleInit } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleInit {
  private client: Redis;

  onModuleInit() {
    this.client = new Redis({
      host: process.env.REDIS_HOST,
      port: parseInt(process.env.REDIS_PORT!),
    });
  }

  async set<T>(key: string, value: T) {
    await this.client.set(key, JSON.stringify(value));
  }

  async setWithExpiry<T>(key: string, value: T, ttl: number) {
    await this.client.set(key, JSON.stringify(value), 'EX', ttl);
  }

  async get<T>(key: string): Promise<T | null> {
    const value = await this.client.get(key);
    return value ? JSON.parse(value) : null;
  }

  async del(key: string) {
    await this.client.del(key);
  }
}
