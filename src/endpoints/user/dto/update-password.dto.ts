export class UpdatePasswordDto {
  constructor(public oldPassword: string, public newPassword: string) {}
}
