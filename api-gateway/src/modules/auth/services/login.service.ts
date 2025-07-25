// login.service.ts
import { status } from '@grpc/grpc-js';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom, Observable } from 'rxjs';
import { GRPC_SERVICE_NAMES } from 'src/common/constants/grpc.constants';

@Injectable()
export class LoginService implements OnModuleInit {
  private userService: UserServiceClient;

  constructor(
    @Inject(GRPC_SERVICE_NAMES.USER) private readonly client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.userService = this.client.getService<UserServiceClient>('UserService');
  }

  async execute(payload: Payload): Promise<Response> {
    return await firstValueFrom(
      this.userService.login(payload).pipe(
        catchError((err) => {
          switch (err.code) {
            case status.NOT_FOUND:
              throw new RpcException('User not found');
            case status.UNAUTHENTICATED:
              throw new RpcException('Unauthorized access');
            default:
              throw new RpcException('Internal server error');
          }
        }),
      ),
    );
  }
}

interface Payload {
  email: string;
  password: string;
}
type Response = gRpcLoginResponse;

interface gRpcLoginRequest {
  email: string;
  password: string;
}
interface UserServiceClient {
  login(data: gRpcLoginRequest): Observable<gRpcLoginResponse>;
}

interface gRpcLoginResponse {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
}
