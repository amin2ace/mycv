import { Expose } from 'class-transformer';

export class UserOutputDto {
  @Expose() // Include in response
  id: number;

  @Expose() //include in response
  email: string;
}
