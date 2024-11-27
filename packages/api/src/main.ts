import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import * as cookieParser from "cookie-parser";
import * as session from "express-session";
import { AppModule } from "./app.module";

// TODO: top level async???
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = Number(configService.get<string>("PORT"));
  const cookieSecret = configService.get<string>("COOKIE_SECRET");

  if (!cookieSecret) {
    throw new Error("COOKIE_SECRET is not set");
  }

  app.use(cookieParser());
  app.use(
    session({
      secret: cookieSecret,
      resave: false,
      saveUninitialized: false,
    }),
  );

  await app.listen(port);
  console.log(`Server running on http://localhost:${port}`);
}

bootstrap();
