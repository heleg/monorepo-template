import { NestFactory } from "@nestjs/core";
import * as session from "express-session";
import { AppModule } from "./app.module";

const PORT = 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    session({
      secret: "my-secret",
      resave: false,
      saveUninitialized: false,
    }),
  );

  await app.listen(PORT);
}

bootstrap().then(() => {
  console.log(`Server running on http://localhost:${PORT}`);
});
