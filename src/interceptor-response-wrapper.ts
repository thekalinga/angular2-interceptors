import { Request, Response } from '@angular/http';
import { RequestOptionsArgs } from '@angular/http/src/interfaces';

import { InterceptorRequestOptionsArgs } from './interceptor-request-options-args';
import { InterceptorResponseWrapperBuilder } from './interceptor-response-wrapper-builder';
import { InterceptorUtils } from './interceptor-utils';

export class InterceptorResponseWrapper {

  constructor(builder: InterceptorResponseWrapperBuilder) {
    InterceptorUtils.assign(this, builder);
  }

  /**
   * url which will be cascaded to the final {@code Http} call
   */
  protected _url: string | Request;

  /**
   * Request options to be passed to the final {@code Http} call
   */
  protected _options?: RequestOptionsArgs | InterceptorRequestOptionsArgs;

  /**
   * Response that gets cascaded to the caller
   */
  protected _response: Response;

  /**
   * Data that gets shared between all interceptors; across request & response cycles<br />
   * i.e before interceptor 1, before interceptor 2, actual http call, after interceptor 2, after interceptor 1 <br />
   * Data should accumulated on the same shared state; so be cautious & always make sure that you do neccessary checks such as ${@code sharedData || {}}
   */
  protected _sharedData?: any;

  /**
   * Indicates the steps at which the request was cancelled; This value is zero indexed, meaning, if first interceptor has ask for skipping subsequent steps, this value will be 0
   */
  protected _shortCircuitTriggeredBy?: number;

  /**
   * Flag to inform interceptor service to skip all futher steps in the interceptor chain & return the {@code response} to the subscriber
   * If the response wrapper contains response, the response would be sent to `next` callback method on the subscriber
   * If the response is empty & `err` is set, the err would be thrown to the subscriber
   * If the response is empty & `shortCircuitTriggeredBy` is set, an err would be thrown to the subscriber
   */
  protected _forceReturnResponse?: boolean;

  /**
   * Flag to inform interceptor service to skip all futher steps in the interceptor chain & would send complete event to the subscriber
   */
  protected _forceRequestCompletion?: boolean;

  /**
   * Indicates that the response did not get generated by the final step (the native http request), but rather by a onSkipped(..)
   */
  protected _responseGeneratedByShortCircuitHandler?: boolean;

  /**
   * Any error encountered during processing
   */
  protected _err?: any;

  /**
   * Index of the interceptor that raise err; This value is zero indexed, meaning, if first interceptor throws an error before http request is sent; this value will be 0
   * If error occurs during the actual http request, the value would be set to `interceptors.length`
   */
  protected _errEncounteredAt?: number;

  /**
   * Flag indicating whether the error occurred in post response/prior to getting response
   */
  protected _errEncounteredInRequestCycle?: boolean;

  get response(): Response {
    return this._response;
  }

  get sharedData(): any {
    return this._sharedData;
  }

  get shortCircuitTriggeredBy(): number {
    return this._shortCircuitTriggeredBy;
  }

  get forceReturnResponse(): boolean {
    return this._forceReturnResponse;
  }

  get forceRequestCompletion(): boolean {
    return this._forceRequestCompletion;
  }

  get responseGeneratedByShortCircuitHandler(): boolean {
    return this._responseGeneratedByShortCircuitHandler;
  }

  get err(): any {
    return this._err;
  }

  get errEncounteredAt(): number {
    return this._errEncounteredAt;
  }

  get errEncounteredInRequestCycle(): boolean {
    return this._errEncounteredInRequestCycle;
  }

  get responseGeneratedByErrHandler(): boolean {
    return !!this._err && !!this._response;
  }

  isShortCircuited(): boolean {
    return this._shortCircuitTriggeredBy !== undefined;
  }

  circuitShortedByMe(currentStep: number): boolean {
    return this.isShortCircuited() && this._shortCircuitTriggeredBy === currentStep;
  }

  errThrownByMe(currentStep: number): boolean {
    return this._errEncounteredAt && this._errEncounteredAt === currentStep;
  }

}
