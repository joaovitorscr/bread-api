import { Get, Req, Res } from '@nestjs/common'
import { Request, Response } from 'express'
import { UserService } from './user.service'

export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<any> {
    try {
      const result = await this.userService.getAllUser()
      return response.status(200).send({
        status: 'Ok!',
        message: 'Successfully fetch data!',
        result: result,
      })
    } catch (err) {
      return response.status(500).json({
        status: 'Ok!',
        message: 'Internal Server Error!',
      })
    }
  }
}
