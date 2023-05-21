import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AdminInterceptor implements NestInterceptor {
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    // console.log(request.user);
    // console.log(request.user.userrole !== 'admin');
    if (request.user.userrole !== 'admin') {
      throw new UnauthorizedException('You are not allowed to add a course');
    }

    // Access the data service methods and properties

    // Rest of the interceptor logic here
    // ...
    return next.handle();
  }
}
