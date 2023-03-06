import { forwardRef, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "../auth/auth.module";
import { User, UserSchema } from "./schemas/user.schema";
import { UserService } from "./user.service";
import { UserController } from "./users.controller";
import { FileModule } from "../file/file.module";
@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    forwardRef(() => AuthModule),
    FileModule,
  ],
  controllers: [UserController],
  providers: [UserService, FileModule],
  exports: [UserService],
})
export class UserModule {}
