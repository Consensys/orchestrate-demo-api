import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HelloWorldService } from '../services/hello-world.service';
import { route } from 'src/app.routing';

@ApiTags(route.helloWorld)
@Controller(route.helloWorld)
export class HelloWorldController {
  constructor(private readonly helloWorldService: HelloWorldService) {}

  @Get()
  getHello(): string {
    return this.helloWorldService.getHello();
  }
}
