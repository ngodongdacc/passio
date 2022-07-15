export const SIZE = 10;
export const LIMIT_MAX = 200;
export const SORT = '-createdAt';
export const PAGE = 1;
export enum QueueList {
  OCR = 'ocr',
  PROCESS_BILL_IMAGE = 'process_bill_image',
  CORE_LOYALTY_TRANSACTION = 'core_loyalty_transaction',
  SCHEDULE_JOB = 'schedule_job',
}

export enum QueueListProcess {
  ADD_POINT_TRANSACTION = 'add_point_transaction', // core_loyalty_transaction
  CONVERT_BILL_TEXT = 'convert_bill_text', // process_bill_image
  UPDATE_USER_TRANSACTION = 'update_user_transaction', // process_bill_image
  STATE_TRANSACTION = 'state_transaction', // schedule_job
}
