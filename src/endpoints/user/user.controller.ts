import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ParseUUIDPipe,
  NotFoundException,
  HttpException,
  HttpStatus,
  // createParamDecorator,
  // HostParam,
  // ExecutionContext,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { db } from '../../dataBase/db';
import { ValidateService } from '../../validate/validate.service';
// import { ExistValidatePipe } from './pipes/exist-validate.pipe';

// export const RouteAndId = createParamDecorator(
//   (data: unknown, ctx: ExecutionContext) => {
//     const request = ctx.switchToHttp().getRequest();
//     const route = request.route;
//     const id = request.params.id;
//     return { route, id };
//   }
// );

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private validateService: ValidateService
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    if (!this.validateService.doesIdExists(id, db.users)) {
      throw new NotFoundException("User with this id doesn't exist");
    }
    return this.userService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe({ version: '4' }))
    id: string,
    // @RouteAndId(ExistValidatePipe)
    // routeAndId: { router: unknown; id: string },
    @Body() updatePasswordDto: UpdatePasswordDto
  ) {
    if (!this.validateService.doesIdExists(id, db.users)) {
      throw new NotFoundException("User with this id doesn't exist");
    }
    return this.userService.updatePassword(id, updatePasswordDto);
  }

  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    if (!this.validateService.doesIdExists(id, db.users)) {
      throw new NotFoundException("User with this id doesn't exist");
    }
    this.userService.remove(id);
    throw new HttpException('No content', HttpStatus.NO_CONTENT);
  }
}
