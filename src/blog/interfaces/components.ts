import { RecursoType } from 'src/recurso/interface/type';

export enum ComponentType {
  IMAGE = 'IMAGE',
  TEXT = 'TEXT',
  NOTE = 'NOTE',
  LIST = 'LIST',
  ARTICLES = 'ARTICLES',
  BADGES = 'BADGES',
}

export interface TextInterface {
  text: string;
  highlight?: {
    text: string;
    bold?: boolean;
  };
}

interface ListItem {
  title: string;
  text: TextInterface;
}

export interface ComponentProps {
  type: ComponentType;
  text?: TextInterface[];
  listItems?: ListItem[];
  image: RecursoType[];
  articles?: number[];
}
