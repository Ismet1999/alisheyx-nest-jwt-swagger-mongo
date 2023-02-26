import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Invoice } from './invoice.schema';
import { CreateInvoiceDto } from './dto/CreateInvoice.dto';
import { InvoiceService } from './invoice.service';
import { SETTINGS } from '../../app.utils';
import { FindInvoiceDto } from './dto/FindInvoice.dto';
@ApiTags('Invoice')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('invoice')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}
  @ApiOperation({ summary: 'Get all invoice all user' })
  @ApiResponse({
    status: 200,
    type: [Invoice],
    description: 'The list of invoice all user',
  })
  // @UseGuards(JwtAuthGuard)
  @Get('/all')
  findAllInvoicesAllUser(@Query() query: FindInvoiceDto) {
    return this.invoiceService.getAllInvoiceAllUser(query);
  }
  @ApiOperation({ summary: 'Get all invoice' })
  @ApiResponse({
    status: 200,
    type: [Invoice],
    description: 'The list of invoice',
  })
  // @UseGuards(JwtAuthGuard)
  @Get('/')
  findAllInvoices(@Query() query: FindInvoiceDto, @Req() req: any) {
    const user = req.user;
    const data = {
      ...query,
      user: user._id,
    };
    if (req.query.all_user === 'true') {
      delete data.user;
    }
    return this.invoiceService.getAllInvoice(data);
  }

  @ApiOperation({ summary: 'Get a invoice' })
  @ApiOkResponse({ status: 200, type: Invoice, description: 'The invoice' })
  @ApiBadRequestResponse({ status: 404, description: 'The invoice not found' })
  @Get('/:id')
  async getInvoiceById(@Param('id') id: string) {
    try {
      const invoice = await this.invoiceService.getInvoiceById(id);
      if (!invoice) throw new NotFoundException('invoice not found');
      return invoice;
    } catch (error) {
      throw new NotFoundException('invoice not found');
    }
  }

  @ApiOperation({ summary: 'Create a new invoice' })
  @ApiResponse({ status: 201, type: Invoice, description: 'The invoice' })
  @Post('/')
  async createInvoice(
    @Body() createInvoiceDto: CreateInvoiceDto,
    @Req() req: any,
  ) {
    try {
      const user = req.user;
      const data = {
        ...createInvoiceDto,
        user: user._id,
      };
      const res = await this.invoiceService.createInvoice(data);
      return res;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @ApiOperation({ summary: 'Update a invoice' })
  @ApiResponse({ status: 200, type: Invoice, description: 'The invoice' })
  @Put('/:id')
  async updateInvoice(
    @Param('id') id: string,
    @Body() updateInvoiceDto: CreateInvoiceDto,
  ) {
    try {
      const res = await this.invoiceService.updateInvoiceById(
        id,
        updateInvoiceDto,
      );
      if (!res) throw new NotFoundException('invoice not found');
      return res;
    } catch (error) {
      throw new BadRequestException('invoice not updated' + error);
    }
  }

  @ApiOperation({ summary: 'Delete a invoice' })
  @ApiResponse({ status: 204, description: 'The invoice' })
  @Delete('/:id')
  deleteInvoice(@Param('id') id: string) {
    return this.invoiceService.deleteInvoiceById(id);
  }
}
