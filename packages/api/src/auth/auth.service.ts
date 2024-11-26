import { Injectable } from "@nestjs/common";
import { randomNonce, randomState } from "openid-client";

@Injectable()
export class AuthService {
  getAuthorizationUrl() {
    const nonce = randomNonce();
    const state = randomState();

    return clie;
  }
}
