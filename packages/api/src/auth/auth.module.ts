import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportModule } from "@nestjs/passport";
import { discovery } from "openid-client";
import { AuthController } from "./auth.controller";
import { AwsStrategy } from "./aws.strategy";

@Module({
  controllers: [AuthController],
  imports: [PassportModule],
  providers: [
    {
      provide: AwsStrategy,
      useFactory: async (configService: ConfigService) => {
        const clientId = configService.get<string>("AWS_COGNITO_CLIENT_ID");
        const clientSecret = configService.get<string>(
          "AWS_COGNITO_CLIENT_SECRET"
        );
        const server = configService.get<string>("AWS_COGNITO_SERVER");

        if (!clientId || !clientSecret || !server) {
          throw new Error(
            "AWS_CLIENT_ID, AWS_CLIENT_SECRET, AWS_COGNITO_SERVER must be set"
          );
        }

        const serverUrl = new URL(server);
        const config = await discovery(serverUrl, clientId, clientSecret);

        return new AwsStrategy({ config, scope: "email openid profile" });
      },
      inject: [ConfigService],
    },
  ],
})
export class AuthModule {}
