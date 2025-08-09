import { ClientProviderOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { GRPC_SERVICE_NAMES } from 'src/common/constants/grpc.constants';

export const grpcUserClient: ClientProviderOptions = {
  name: GRPC_SERVICE_NAMES.USER,
  transport: Transport.GRPC,
  options: {
    package: 'user',
    protoPath: join(process.cwd(), 'src/config/grpc/proto/user.proto'),
    url: process.env.USER_SERVICE_URL || 'user-service:50051',
  },
};
export const grpcScrapperClient: ClientProviderOptions = {
  name: GRPC_SERVICE_NAMES.SCRAPER,
  transport: Transport.GRPC,
  options: {
    package: 'scraper',
    protoPath: join(process.cwd(), 'src/config/grpc/proto/scraper.proto'),
    url: process.env.SCRAPER_MANAGER_URL || 'user-service:50051',
  },
};

export const grpcClientOptions: ClientProviderOptions[] = [
  grpcScrapperClient,
  grpcUserClient,
];
