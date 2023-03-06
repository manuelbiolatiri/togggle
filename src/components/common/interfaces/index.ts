export interface ObjectLiteral {
  [key: string]: any;
}

export interface RequestResponse<T = any> {
  message?: string;
  data: T;
}

export interface PaginatedResponseMeta {
  perPage: number;
  currentPage: number;
  totalPages: number;
  count: number;
  total: number;
}

export interface PaginatedResponse<T = any> {
  message?: string;
  data: T[];
  meta: PaginatedResponseMeta;
}

export interface Meta {
  total: number;
  page: number;
  pageSize: number;
}

export interface IUploadFIle {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}
