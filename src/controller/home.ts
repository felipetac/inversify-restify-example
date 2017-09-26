import { Controller, Get, interfaces } from 'inversify-restify-utils';
import { injectable } from 'inversify';

@Controller('/')
@injectable()
export class HomeController implements interfaces.Controller {
    @Get('/')
    private get(): string {
        return 'Home sweet home';
    }
}