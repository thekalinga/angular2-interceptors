import { RequestOptionsArgs } from '@angular/http/src/interfaces';
import { resolveReflectiveProviders } from '@angular/core/src/di/reflective_provider';
import { reflector } from '@angular/platform-browser/src/private_import_core';
import { Request, Response } from '@angular/http';

import { InterceptorRequestWrapper } from "./interceptor-request-wrapper";
import { InterceptorUtils } from './interceptor-utils';

/**
 * Utility builder for creating a new instance of InterceptorRequestWrapper
 * Use InterceptorRequestWrapperBuilder.new() to instantiate the builder
 */
export class InterceptorRequestWrapperBuilder {

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
   * Use InterceptorResponseBuilder.new() to instantiate the builder
   */
  protected constructor() { }

  static new(requestWrapper: InterceptorRequestWrapper): InterceptorRequestWrapperBuilder {
    const builder = new InterceptorRequestWrapperBuilder();
    InterceptorUtils.assign(builder, <InterceptorRequestWrapper>requestWrapper);
    return builder;
  }

  url(url: string | Request): InterceptorRequestWrapperBuilder {
    this._url = url;
    return this;
  }

  options(options: RequestOptionsArgs): InterceptorRequestWrapperBuilder {
    this._options = options;
    return this;
  }

  sharedData(sharedData: any): InterceptorRequestWrapperBuilder {
    this._sharedData = sharedData;
    return this;
  }

  shortCircuitAtCurrentStep(shortCircuitAtCurrentStep: boolean): InterceptorRequestWrapperBuilder {
    this._shortCircuitAtCurrentStep = shortCircuitAtCurrentStep;
    return this;
  }

  alsoForceRequestCompletion(alsoForceRequestCompletion: boolean): InterceptorRequestWrapperBuilder {
    this._alsoForceRequestCompletion = alsoForceRequestCompletion;
    return this;
  }

  build(): InterceptorRequestWrapper {
    this._sharedData = this._sharedData || {};
    return new InterceptorRequestWrapper(this);
  }

}
