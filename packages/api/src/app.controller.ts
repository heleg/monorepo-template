import { Controller, Get } from "@nestjs/common";

@Controller()
export class AppController {
  @Get()
  me(): string {
    return "Here will be user info";
  }
}
