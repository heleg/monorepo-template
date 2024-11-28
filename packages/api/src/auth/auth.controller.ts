import { Controller, Get, Request, UseGuards } from "@nestjs/common";
import { AwsAuthGuard } from "./aws-auth.guard";

@Controller("auth")
export class AuthController {
  @Get()
  login() {
    return {
      url: "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_2g6k7nq3q/.auth/login",
    };
  }

  @Get("/me")
  me(@Request() req: Request): string {
    // @ts-ignore
    return req.user;
  }

  @UseGuards(AwsAuthGuard)
  @Get("/callback")
  callback(@Request() req: Request) {
    console.log("Request received at callback:", req);

    // @ts-ignore
    return req.user;
  }
}
