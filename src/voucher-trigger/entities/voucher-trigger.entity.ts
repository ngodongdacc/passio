import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
export const VoucherTriggerCollection = 'voucher_trigger';
export type VoucherTriggerDocument = VoucherTrigger & Document;
export class Step {
  @Prop({
    type: 'number',
    required: true,
  })
  variant: number;
  @Prop({
    type: 'string',
    required: true,
  })
  trigger: string;
}
@Schema({
  timestamps: true,
})
export class VoucherTrigger {
  @Prop({
    type: 'string',
    required: true,
    index: true,
  })
  name: string;

  @Prop({
    type: 'string',
    required: true,
  })
  code: string;

  @Prop({
    type: 'string',
    required: true,
  })
  branchCode: string;

  @Prop({
    type: 'number',
    default: 0,
    max: 1,
    min: 0,
  })
  isRemoved?: number;

  @Prop({
    type: 'date',
    required: true,
  })
  startDate: Date;

  @Prop({
    type: 'date',
    required: true,
  })
  endDate: Date;

  @Prop({
    type: 'array',
    required: true,
    default: [],
  })
  steps: [Step[]];
}

export const VoucherTriggerSchema = SchemaFactory.createForClass(VoucherTrigger);
