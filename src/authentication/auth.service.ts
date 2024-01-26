import { Injectable, NotFoundException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcryptjs'
import { PrismaService } from 'src/prisma.service'
import { User } from 'src/user/user.model'
import { UserService } from 'src/user/user.service'
import { LoginDto } from './dto/login-user.dto'
import { RegisterUserDto } from './dto/register-user.dto'

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async login(loginDto: LoginDto): Promise<any> {
    const { password, username } = loginDto

    const user = await this.prismaService.user.findUnique({
      where: { username },
    })

    if (!user) {
      throw new NotFoundException('User not found')
    }

    const validatePassword = await bcrypt.compare(password, user.password)

    if (!validatePassword) {
      throw new NotFoundException('Invalid password')
    }

    return {
      token: this.jwtService.sign({ username }),
    }
  }

  async register(registerDto: RegisterUserDto): Promise<any> {
    const createUser = new User()

    createUser.name = registerDto.name
    createUser.email = registerDto.email
    createUser.username = registerDto.username
    createUser.password = await bcrypt.hash(registerDto.password, 10)

    const user = await this.userService.createUser(createUser)

    return {
      token: this.jwtService.sign({ username: user.username }),
    }
  }
}
