import { PrismaService } from 'src/prisma.service'
import { User } from './user.model'

export class UserService {
  constructor(private prisma: PrismaService) {}

  async getAllUser(): Promise<User[]> {
    return this.prisma.user.findMany()
  }
}
