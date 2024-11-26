import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, type VerifyFunction } from "openid-client/build/passport";

@Injectable()
export class AwsStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    const clientID = configService.get<string>("AWS_COGNITO_CLIENT_ID");
    const clientSecret = configService.get<string>("AWS_COGNITO_CLIENT_SECRET");
    const callbackURL = configService.get<string>("AWS_COGNITO_REDIRECT_URL");

    super({
      issuer: "https://cognito-idp.us-east-1.amazonaws.com",
      authorizationURL:
        "https://cognito-idp.us-east-1.amazonaws.com/oauth2/authorize",
      tokenURL: "https://cognito-idp.us-east-1.amazonaws.com/oauth2/token",
      userInfoURL:
        "https://cognito-idp.us-east-1.amazonaws.com/oauth2/userInfo",
      clientID,
      clientSecret,
      callbackURL,
      scope: "openid",
    });
  }
}
