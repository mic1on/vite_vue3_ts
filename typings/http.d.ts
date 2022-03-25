/**
 * http 返回数据结构，成功后一般不需要返回这种格式，直接返回数据即可
 *
 * 这个结构体是出现错误后，返回错误信息用的
 *
 */
export interface HttpResponseType<T = any> {
  code: number;
  msg: string;
  error?: string;
  data?: T;
}
/**
 * 分页数据返回格式
 */
export interface PaginationDataType<T = any> {
  items: Array<T>;
  page?: number;
  pageSize?: number;
  totalItems: number;
  totalPage?: number;
  recordCount?: number;
  empty?: boolean;
  first?: boolean;
  last?: boolean;
}
/**
 * 上传文件的参数配置
 */
export interface UploadFileParams {
  // Other parameters
  data?: Recordable;
  // File parameter interface field name
  name?: string;
  // file name
  file: File | Blob;
  // file name
  filename?: string;
  [key: string]: any;
}
