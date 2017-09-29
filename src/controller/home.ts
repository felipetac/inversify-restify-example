import { Controller as Router, Get, interfaces } from 'inversify-restify-utils';
import { injectable } from 'inversify';

@Router('/')
@injectable()
export class HomeController implements interfaces.Controller {
    @Get('/')
    private get(): string {
        return 'Home sweet home';
    }
}
