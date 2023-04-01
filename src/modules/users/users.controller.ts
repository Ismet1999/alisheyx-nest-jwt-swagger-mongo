import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  ParseFilePipeBuilder,
  Patch,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
  Request,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UpdateUserImageDTO } from './dto/UpdateUserImage.dto';
import { Users } from './users.schema';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import { UpdateUserPasswordDto } from './dto/UpdateUserPassword.dto';

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
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      const res = this.usersService.updateUserById(id, updateUserDto);
      if (!res) throw new NotFoundException();
      return res;
    } catch (error) {
      throw new BadRequestException('User not updated: ' + error.message);
    }
  }

  @ApiOperation({ summary: 'Update a user password' })
  @ApiResponse({ status: 200, type: Users, description: 'The user password updated' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Patch('/password')
  updateUserPassword(@Request() req,  @Body() updateUserDto: UpdateUserPasswordDto) {
    try {
      const res = this.usersService.updateUserPasswordById(req.user, updateUserDto);
      if (!res) throw new NotFoundException();
      return res;
    } catch (error) {
      throw new BadRequestException('User not updated: ' + error.message);
    }
  }

  @ApiOperation({ summary: 'Update a user photo' })
  @ApiResponse({ status: 200, type: Users, description: 'The user photo updated' })
  @ApiConsumes('multipart/form-data')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Patch('/photo')
  @UseInterceptors(
    FileInterceptor('photo', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          cb(null, `${Date.now()}-${file.originalname}`);
        },
      }),
    }),
  )
  updateProfuleUser(
    @Request() req,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /(png|jpg|jpeg|svg|gif|webp)/,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.Multer.File,
  ) {
    try {
      const id = req.user;
      const photo = file.path;
      const res = this.usersService.updatePhotoUserById(id, { photo });
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
