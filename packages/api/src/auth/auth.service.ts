import { Injectable, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Configuration, discovery } from "openid-client";

@Injectable()
export class AuthService implements OnModuleInit {
  private config?: Configuration;

  constructor(private readonly configService: ConfigService) {}

  async onModuleInit() {
    console.log("auth service initialized");

    const url = this.configService.get<string>("AWS_COGNITO_SERVER");
    const clientId = this.configService.get<string>("AWS_COGNITO_CLIENT_ID");
    const clientSecret = this.configService.get<string>(
      "AWS_COGNITO_CLIENT_SECRET"
    );

    if (!url || !clientId || !clientSecret) {
      throw new Error(
        "AWS_COGNITO_SERVER, AWS_COGNITO_CLIENT_ID, AWS_COGNITO_CLIENT_SECRET are not set"
      );
    }

    const discoveryUrl = new URL(url);
    this.config = await discovery(discoveryUrl, clientId, clientSecret);
  }

  getConfig() {
    if (!this.config) {
      throw new Error("Config is not initialized");
    }

    return this.config;
  }
}
