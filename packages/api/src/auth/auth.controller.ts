import { Controller, Get, Res, Session } from "@nestjs/common";
import { SessionData } from "express-session";
import { buildAuthorizationUrl, randomNonce, randomState } from "openid-client";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get("login")
  login(@Session() session: SessionData, @Res() res: Response) {
    const config = this.authService.getConfig();
    const nonce = randomNonce();
    const state = randomState();

    session.nonce = nonce;
    session.state = state;

    const redirectUri = buildAuthorizationUrl(config, {
      scope: "email openid profile",
      nonce,
      state,
    });

    return res.redirect(redirectUri);
  }
}
