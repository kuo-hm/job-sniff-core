
export interface UserProtoLoginRequest {
  email: string;
  password: string;
}

export interface UserProtoRegisterRequest {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface UserProtoResponse {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
}