import {ConfigService} from "@nestjs/config";
import {PassportStrategy} from "@nestjs/passport";
import {ExtractJwt, Strategy} from "passport-jwt";
import {Injectable, UnauthorizedException} from "@nestjs/common";
import {UserService} from "../users/user.service";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private configService: ConfigService,
        private userService: UserService
    ) {
        const extractJwtFromCookie = (req) => {
            let token = null
            if (req && req.cookies) {
                token = req.cookies['access_token']
            }
            return token || ExtractJwt.fromAuthHeaderAsBearerToken()(req)
        }
        super({
            jwtFromRequest: extractJwtFromCookie,
            ignoreExpiration: false,
            secretOrKey: configService.get('JWT_SECRET')
        })

    }

    async validate(payload: any) {
        const user = await this.userService.findOneByEmail(payload.email)

        if (!user) throw new UnauthorizedException('Please login to continue')
        return { ...payload  }
    }


}