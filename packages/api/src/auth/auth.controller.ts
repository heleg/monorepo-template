import { Controller, Get } from "@nestjs/common";
import { randomNonce, randomState } from "openid-client";

@Controller("auth")
export class AuthController {
  @Get("/me")
  me(): string {
    return "Here will be user info";
  }

  @Get("/login")
  login() {
    const nonce = randomNonce();
    const state = randomState();
  }
}
