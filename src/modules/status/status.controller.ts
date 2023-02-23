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
import { Status } from './status.schema';
import { CreateStatusDto } from './dto/CreateStatus.dto';
import { StatusService } from './status.service';
import { SETTINGS } from '../../app.utils';
@ApiTags('Status')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('status')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}
  @ApiOperation({ summary: 'Get all Status' })
  @ApiResponse({
    status: 200,
    type: [Status],
    description: 'The list of Status',
  })
  // @UseGuards(JwtAuthGuard)
  @Get('/')
  findAllUsers(@Query() query: any) {
    return this.statusService.getAllStatus(query);
  }

  @ApiOperation({ summary: 'Get a status' })
  @ApiOkResponse({ status: 200, type: Status, description: 'The status' })
  @ApiBadRequestResponse({ status: 404, description: 'The status not found' })
  @Get('/:id')
  async getStatusById(@Param('id') id: string) {
    try {
      const status = await this.statusService.getStatusById(id);
      if (!status) throw new NotFoundException('Status not found');
      return status;
    } catch (error) {
      throw new NotFoundException('Status not found');
    }
  }

  @ApiOperation({ summary: 'Create a new status' })
  @ApiResponse({ status: 201, type: Status, description: 'The status' })
  @Post('/')
  async createStatus(
    @Body(SETTINGS.VALIDATION_PIPE)
    createStatusDto: CreateStatusDto,
  ) {
    try {
      const res = await this.statusService.createStatus(createStatusDto);
      return res;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @ApiOperation({ summary: 'Update a status' })
  @ApiResponse({ status: 200, type: Status, description: 'The status' })
  @Put('/:id')
  async updateStatus(
    @Param('id') id: string,
    @Body(SETTINGS.VALIDATION_PIPE)
    updateStatusDto: CreateStatusDto,
  ) {
    try {
      const res = await this.statusService.updateStatusById(
        id,
        updateStatusDto,
      );
      if (!res) throw new NotFoundException('Status not found');
      return res;
    } catch (error) {
      throw new BadRequestException('Status not updated' + error);
    }
  }

  @ApiOperation({ summary: 'Delete a status' })
  @ApiResponse({ status: 204, description: 'The status' })
  @Delete('/:id')
  deleteStatus(@Param('id') id: string) {
    return this.statusService.deleteStatusById(id);
  }
}
