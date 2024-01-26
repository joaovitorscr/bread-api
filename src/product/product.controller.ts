import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common'
import { Request, Response } from 'express'
import { Product } from './product.model'
import { ProductService } from './product.service'

@Controller('/api/v1/product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getAllProducts(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<any> {
    const result = await this.productService.getAllProducts()
    return response.status(200).json({
      status: 'Ok!',
      message: 'Successfully fetch data!',
      result: result,
    })
  }

  @Get(':id')
  async getProduct(@Param('id') id: number): Promise<Product | null> {
    return this.productService.getProduct(id)
  }

  @Post()
  async postProduct(@Body() data: Product): Promise<Product> {
    return this.productService.createProduct(data)
  }

  @Put(':id')
  async updatedProduct(
    @Param('id') id: number,
    @Body() data: Product,
  ): Promise<Product> {
    return this.productService.updateProduct(id, data)
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: number): Promise<Product> {
    return this.productService.deleteProduct(id)
  }
}
