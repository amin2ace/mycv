import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { promisify } from 'util';
import { scrypt as _scrypt, randomBytes } from 'crypto';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup(email: string, password: string) {
    const users = await this.usersService.find(email);

    if (users.length) {
      throw new BadRequestException('Email in Use!');
    }

    // Hashing
    // Generate a Salt
    const PassSalt = randomBytes(8).toString('hex');
    // const emailSalt = randomBytes(8).toString('hex');

    // Hash the Salt and pass together
    const hashPass = (await scrypt(password, PassSalt, 32)) as Buffer;
    // const hashEmail = (await scrypt(password, emailSalt, 32)) as Buffer;

    // Join the hashed result and the Salt together
    const _password = PassSalt + '.' + hashPass.toString('hex');
    // const _email = emailSalt + '.' + hashEmail.toString('hex');

    //create user
    const user = await this.usersService.create(email, _password);
    return user;
  }

  async signin(email: string, password: string) {
    // const emailHash = (await scrypt(email, ))
    // const [emailSalt, storedEmail] = email.split('.');
    // const [passSalt, storedPass] = password.split('.');

    const [user] = await this.usersService.find(email);
    if (!user) {
      throw new BadRequestException('User Not Found');
    }

    const [passSalt, storedPass] = user.password.split('.');

    const passHash = (await scrypt(password, passSalt, 32)) as Buffer;
    // console.log(storedPass, passHash.toString('hex'));

    if (passHash.toString('hex') !== storedPass) {
      throw new BadRequestException('Bad Password');
    }
    return user;
  }
}
