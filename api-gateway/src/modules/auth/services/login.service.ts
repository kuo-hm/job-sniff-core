import { status } from '@grpc/grpc-js';
import { BadRequestException, Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { catchError, firstValueFrom, Observable } from 'rxjs';
import { GRPC_SERVICE_NAMES } from 'src/common/constants/grpc.constants';

@Injectable()
export class LoginService implements OnModuleInit {
  private userService: UserServiceClient;

  constructor(@Inject(GRPC_SERVICE_NAMES.USER) private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.userService = this.client.getService<UserServiceClient>('UserService');
  }

  async execute(payload: Payload): Promise<Response> {
    const res = await firstValueFrom(
      this.userService.login(payload).pipe(
        catchError((err) => {
          switch (err.code) {
            case status.NOT_FOUND:
              throw new BadRequestException('Bad credentials');
            case status.UNAUTHENTICATED:
              throw new BadRequestException(err.details || 'Authentication failed');
            case status.INVALID_ARGUMENT:
              throw new BadRequestException(err.details || 'Invalid arguments provided');
            default:
              throw new BadRequestException('Internal server error');
          }
        }),
      ),
    );
    if (!res) {
      throw new BadRequestException('Login failed');
    }
    return res;
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
