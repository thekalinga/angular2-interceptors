import { RequestOptionsArgs } from '@angular/http/src/interfaces';
import { resolveReflectiveProviders } from '@angular/core/src/di/reflective_provider';
import { reflector } from '@angular/platform-browser/src/private_import_core';
import { Request, Response } from '@angular/http';

import { InterceptorRequest } from "./interceptor-request";
import { InterceptorUtils } from './interceptor-utils';

/**
 * Utility builder for creating a new instance of InterceptorRequest
 * Use InterceptorRequestBuilder.new() to instantiate the builder
 */
export class InterceptorRequestBuilder {

  protected _url: string | Request;
  protected _options?: RequestOptionsArgs;
  protected _sharedData?: any;
  protected _shortCircuitAtCurrentStep?: boolean;
  protected _alsoForceRequestCompletion?: boolean;
  protected _alreadyShortCircuited?: boolean;
  protected _shortCircuitTriggeredBy?: number;
  protected _err?: any;
  protected _errEncounteredAt?: number;

  /**
   * Use InterceptorRequestBuilder.new() to instantiate the builder
   */
  protected constructor() { }

  static new(request: InterceptorRequest): InterceptorRequestBuilder {
    const builder = new InterceptorRequestBuilder();
    InterceptorUtils.assign(builder, <InterceptorRequest>request);
    return builder;
  }

  url(url: string | Request): InterceptorRequestBuilder {
    this._url = url;
    return this;
  }

  options(options: RequestOptionsArgs): InterceptorRequestBuilder {
    this._options = options;
    return this;
  }

  sharedData(sharedData: any): InterceptorRequestBuilder {
    this._sharedData = sharedData;
    return this;
  }

  shortCircuitAtCurrentStep(shortCircuitAtCurrentStep: boolean): InterceptorRequestBuilder {
    this._shortCircuitAtCurrentStep = shortCircuitAtCurrentStep;
    return this;
  }

  alsoForceRequestCompletion(alsoForceRequestCompletion: boolean): InterceptorRequestBuilder {
    this._alsoForceRequestCompletion = alsoForceRequestCompletion;
    return this;
  }

  build(): InterceptorRequest {
    this._sharedData = this._sharedData || {};
    return new InterceptorRequest(this);
  }

}
