import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {UserModule} from "../users/user.module";
import {PassportModule} from "@nestjs/passport";
import {LocalStrategy} from "./local.strategy";
import {JwtModule} from "@nestjs/jwt";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {JwtStrategy} from "./jwt.strategy";
import {GoogleStrategy} from "./google.strategy";

@Module({
    imports: [
        ConfigModule,
        UserModule,
        PassportModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get('JWT_SECRET'),
                signOptions: {expiresIn: '60h'}
            }),
            inject: [ConfigService]

        })
    ],
    providers: [AuthService, LocalStrategy, JwtStrategy, GoogleStrategy],
    exports: [AuthService]
})
export class AuthModule {
}
