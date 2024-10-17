import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, type VerifyFunction } from "openid-client/build/passport";

@Injectable()
export class AwsStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      issuer: "https://cognito-idp.us-east-1.amazonaws.com",
      authorizationURL:
        "https://cognito-idp.us-east-1.amazonaws.com/oauth2/authorize",
      tokenURL: "https://cognito-idp.us-east-1.amazonaws.com/oauth2/token",
      userInfoURL:
        "https://cognito-idp.us-east-1.amazonaws.com/oauth2/userInfo",
      clientID: process.env.AWS_COGNITO_CLIENT_ID,
      clientSecret: process.env.AWS_COGNITO_CLIENT_SECRET,
      callbackURL: process.env.AWS_COGNITO_REDIRECT_URL,
      scope: "openid",
    });
  }
}
