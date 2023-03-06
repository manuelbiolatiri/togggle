export interface UpdateBook {
  title: string;
  description: string;
  author: string;
  year: number;
  cover?: string;
  version: number;
}

export interface CreateBook {
  title: string;
  description: string;
  author: string;
  year: number;
  cover?: string;
}
