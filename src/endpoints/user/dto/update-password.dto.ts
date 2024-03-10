import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePasswordDto {
  @IsNotEmpty({ message: 'OldPassword is required and should not be null' })
  @IsString({ message: 'OldPassword should be a string' })
  oldPassword: string;

  @IsNotEmpty({ message: 'NewPassword is required and should not be null' })
  @IsString({ message: 'NewPassword should be a string' })
  newPassword: string;
}
