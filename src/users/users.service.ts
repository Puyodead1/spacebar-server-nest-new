import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeepPartial, FindOneOptions, Repository } from "typeorm";
import { Users } from "./users.entity";

@Injectable()
export class UsersService {
  constructor(@InjectRepository(Users) private usersRepository: Repository<Users>) {}

  async fineOne(options: FindOneOptions<Users>): Promise<Users | undefined> {
    return this.usersRepository.findOne(options);
  }

  async create(data: DeepPartial<Users>): Promise<Users> {
    const user = this.usersRepository.create(data);
    return this.usersRepository.save(user);
  }
}
