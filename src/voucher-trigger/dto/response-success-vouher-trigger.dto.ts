import { ApiProperty, getSchemaPath } from "@nestjs/swagger";
import { ResponseDto } from "src/common/core/query";
import { VoucherTriggerDto } from "./voucher-trigger.dto";


export class VoucherTriggerResponseDo extends ResponseDto {
    @ApiProperty({
        type: 'array',
        items: {
            type: 'object',
            $ref: getSchemaPath(VoucherTriggerDto)
        }
    })
    data: VoucherTriggerDto[] = [];
}

export class DetailVoucherTriggerResponseDo extends ResponseDto {
    constructor() {
        super();
        delete this.meta;
    }
    @ApiProperty({
        type: VoucherTriggerDto
    })
    data: VoucherTriggerDto;

}