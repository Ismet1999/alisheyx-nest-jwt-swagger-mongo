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
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateUserDto } from './dto/CreateUser.dto';
import { Users } from './users.schema';
import { UsersService } from './users.service';
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: [Users], description: 'The list of users' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('/')
  findAllUsers(query: any) {
    return this.usersService.getAllUsers(query);
  }

  @ApiOperation({ summary: 'Get a user' })
  @ApiResponse({ status: 200, type: Users, description: 'The user' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('/:id')
  async getUserById(@Param('id') id: string) {
    try {
      const res = await this.usersService.getUserById(id);
      if (!res) throw new NotFoundException();
      return res;
    } catch (error) {
      throw new NotFoundException('User not found: ' + error.message);
    }
  }

  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, type: Users, description: 'The user created' })
  @Post('/')
  async createUser(@Body() createUserDto: CreateUserDto) {
    try {
      const res = await this.usersService.createUser(createUserDto);
      return res;
    } catch (error) {
      throw new BadRequestException('User not created:' + error.message);
    }
  }

  @ApiOperation({ summary: 'Update a user' })
  @ApiResponse({ status: 200, type: Users, description: 'The user updated' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Put('/:id')
  updateUser(@Param('id') id: string, @Body() createUserDto: CreateUserDto) {
    try {
      const res = this.usersService.updateUserById(id, createUserDto);
      if (!res) throw new NotFoundException();
      return res;
    } catch (error) {
      throw new BadRequestException('User not updated: ' + error.message);
    }
  }

  @ApiOperation({ summary: 'Delete a user' })
  @ApiResponse({ status: 204, description: 'The user deleted' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete('/:id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUserById(id);
  }
}
