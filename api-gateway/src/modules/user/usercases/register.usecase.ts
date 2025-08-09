import { status } from '@grpc/grpc-js';
import { BadRequestException, Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { catchError, firstValueFrom, Observable } from 'rxjs';
import { GRPC_SERVICE_NAMES } from 'src/common/constants/grpc.constants';

@Injectable()
export class RegisterUseCase implements OnModuleInit {
  private userService: UserServiceClient;

  constructor(@Inject(GRPC_SERVICE_NAMES.USER) private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.userService = this.client.getService<UserServiceClient>('UserService');
  }

  async execute(payload: Payload): Promise<Response> {
    const res = await firstValueFrom(
      this.userService.register(payload).pipe(
        catchError((err) => {
          switch (err.code) {
            case status.ALREADY_EXISTS:
              throw new BadRequestException('User already exists');
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
      throw new BadRequestException('Registration failed');
    }
    return res;
  }
}

interface Payload {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
type Response = gRpcLoginResponse;

interface UserServiceClient {
  register(data: UserProtoRegisterRequest): Observable<gRpcLoginResponse>;
}

interface gRpcLoginResponse {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface UserProtoRegisterRequest {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
