import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { RequestCache, RequestCacheWithMap } from "../services/request-cache/request-cache.service";
import { CacheInterceptor } from "./cache/cache.interceptor";
import { ContentTypeInterceptor } from "./content-type/content-type.interceptor";
import { ErrorInterceptor } from "./error/error.interceptor";
import { LoaderInterceptor } from "./loader/loader.interceptor";
import { LoggingInterceptor } from "./logging/logging.interceptor";
import { RetryInterceptor } from "./retry/retry.interceptor";
import { LocaleInterceptor } from "./locale/locale.interceptor";
import { CsrfInterceptor } from "./csrf/csrf.interceptor";

export { CACHE } from "./cache/cache.interceptor";
export { LOADER } from "./loader/loader.interceptor";
export const HttpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: RetryInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ContentTypeInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true },
    { provide: RequestCache, useClass: RequestCacheWithMap },
    { provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LocaleInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: CsrfInterceptor, multi: true }
];