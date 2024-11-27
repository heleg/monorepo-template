import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
// FIXME: seems like nest tsconfig doesn't support ESM, openid-client is ESM only
import {
  Strategy,
  StrategyOptions,
} from "../../../../node_modules/openid-client/build/passport";

@Injectable()
export class AwsStrategy extends PassportStrategy(Strategy) {
  constructor(options: StrategyOptions) {
    super(options);
  }

  validate() {
    return {};
  }
}
