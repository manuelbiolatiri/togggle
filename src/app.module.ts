import { globalRateLimiterMiddleware } from "./components/common/middleware/rateLimit.middleware";
import { BookModule } from "./components/books/books.module";
import { FileModule } from "./components/file/file.module";
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
  ValidationPipe,
} from "@nestjs/common";
import { APP_PIPE } from "@nestjs/core";
import { AuthModule } from "./components/auth/auth.module";
import { AuthenticationMiddleware } from "./components/common/middleware/auth.middleware";
import { UserModule } from "./components/users/users.module";
import { ConfigModule } from "@nestjs/config";
import config from "./components/common/config";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    MongooseModule.forRoot(config().DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    AuthModule,
    UserModule,
    BookModule,
    FileModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(globalRateLimiterMiddleware, AuthenticationMiddleware)
      .exclude(
        { path: "/users/create", method: RequestMethod.POST },
        { path: "/auth/login", method: RequestMethod.ALL }
      )
      .forRoutes("*");
  }
}
