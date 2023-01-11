import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {UserModule} from "../users/user.module";
import {PassportModule} from "@nestjs/passport";
import {LocalStrategy} from "./local.strategy";
import {JwtModule} from "@nestjs/jwt";
import {ConfigModule, ConfigService} from "@nestjs/config";

@Module({
    imports: [
        ConfigModule,
        UserModule,
        PassportModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get('JWT_SECRET'),
                signOptions: {expiresIn: '60s'}
            }),
            inject: [ConfigService]

        })
    ],
    providers: [AuthService, LocalStrategy],
    exports: [AuthService]
})
export class AuthModule {
}
