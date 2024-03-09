import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UsePipes,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserIdValidationPipe } from './pipes/user-id-validation.pipe';
import { DtoValidationPipe } from './pipes/dto-validation.pipe';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UsePipes(DtoValidationPipe)
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @UsePipes(UserIdValidationPipe)
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Put(':id')
  @UsePipes()
  update(
    @Param('id', UserIdValidationPipe) id: string,
    @Body(DtoValidationPipe) updatePasswordDto: UpdatePasswordDto
  ) {
    return this.userService.updatePassword(id, updatePasswordDto);
  }

  @Delete(':id')
  @UsePipes(UserIdValidationPipe)
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
