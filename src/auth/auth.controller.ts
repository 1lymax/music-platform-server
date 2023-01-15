import {BadRequestException, Controller, Get, HttpStatus, Post, Query, Req, Res, UseGuards} from "@nestjs/common";
import {AuthService} from "./auth.service";
import {LocalAuthGuard} from "./local-auth.guard";
import {GoogleOauthGuard} from "./google-oauth.guard";
import {Response} from "express";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Req() req, @Res() res: Response) {
        const token = await this.authService.generateJwt(req.user)
        this.setCookie(res, token)
        res.status(HttpStatus.OK)
        res.json({ access_token: token })
    }

    @Get('google')
    @UseGuards(GoogleOauthGuard)
    async auth() {
    }

    @Get('google/callback')
    @UseGuards(GoogleOauthGuard)
    async googleOauthCallback(@Req() req, @Res() res: Response, @Query('back') back) {
        const token = await this.authService.signIn(req.user)
        this.setCookie(res, token)
        res.redirect(back)
        res.status(HttpStatus.OK)
        res.end()

    }

    setCookie(res, token) {
        try {
            res.cookie('access_token', token, {
                maxAge: 2592000000,
                sameSite: true,
                secure: false
            })
        } catch {
            throw new BadRequestException('Unauthenticated')
        }
        return { access_token: token }
    }

}