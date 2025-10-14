import { FindOptionsWhere } from 'typeorm';
export type QueryConditions<T> = FindOptionsWhere<T> | FindOptionsWhere<T>[];
