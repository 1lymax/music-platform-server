import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import * as cookieParser from "cookie-parser";


const start = async () => {
    try {
        const PORT = process.env.PORT || 5000
        const app = await NestFactory.create(AppModule)

        const swaggerConfig = new DocumentBuilder()
            .setTitle('Music platform')
            .setDescription('The music platform API description')
            .setVersion('1.0')
            //.addTag('music')
            .build();
        const document = SwaggerModule.createDocument(app, swaggerConfig);
        SwaggerModule.setup('docs', app, document);

        app.enableCors({origin: ['http://localhost:3000', 'http://localhost:5000'], credentials: true})
        app.use(cookieParser())

        await app.listen(PORT, () => console.log(`server started on PORT ${PORT}`))
    }catch (e) {
        console.log(e)
    }
}


start()