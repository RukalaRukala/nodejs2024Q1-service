import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePasswordDto {
  @IsNotEmpty({ message: '<<oldPassword>> is required and should not be null' })
  @IsString({ message: '<<oldPassword>> should be a string' })
  oldPassword: string;

  @IsNotEmpty({ message: '<<newPassword>> is required and should not be null' })
  @IsString({ message: '<<newPassword>> should be a string' })
  newPassword: string;
}
