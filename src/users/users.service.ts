import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(email: string, password: string) {
    const user = this.repo.create({ email, password });

    return this.repo.save(user);
  }

  async findOne(id: number) {
    const user = await this.repo.findOne({
      where: { id },
    });

    if (!user) throw new NotFoundException('User not Found');

    return user;
  }

  async find(email: string) {
    const users = await this.repo.find({
      where: { email },
    });

    if (!users) throw new NotFoundException('User not Found');

    return users;
  }

  async update(id: number, updateData: Partial<User>) {
    const user = await this.findOne(id);
    Object.assign(user, updateData);
    this.repo.save(user);
    return `User With ID ${id} Updated Succesfully `;
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    await this.repo.remove(user);
    return `User With ID ${id} Removed Succesfully`;
  }
}
