import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { json } from "express";
import * as morgan from "morgan";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;
  app.use(json({ limit: "200mb" }));
  app.enableCors({ origin: "*" });
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.use(morgan("dev"));
  await app.listen(port);
}
bootstrap();
