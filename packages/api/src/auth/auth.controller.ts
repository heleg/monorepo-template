import { Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Controller("auth")
export class AuthController {
  @Get("/me")
  me(@Request() req: Request): string {
    // @ts-ignore
    return req.user;
  }

  @UseGuards(AuthGuard("aws"))
  @Post("/login")
  login(@Request() req: Request) {
    // @ts-ignore
    return req.user;
  }
}
