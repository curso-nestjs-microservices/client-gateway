import { RpcException } from '@nestjs/microservices';
import { catchError, Observable } from 'rxjs';

export const observableErrorHandler = (callback: Observable<any>) => {
  return callback.pipe(
    catchError((err) => {
      throw new RpcException(err);
    }),
  );
};
