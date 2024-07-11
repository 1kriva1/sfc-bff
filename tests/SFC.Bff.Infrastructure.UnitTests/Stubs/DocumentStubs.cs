namespace SFC.Bff.Infrastructure.UnitTests.Stubs;
public static class DocumentStubs
{
    public static object DISCOVERY_JWKS = new
    {
        keys = new object[]
        {
            new {
                kty= "RSA",
                use= "sig",
                kid = "a3rMUgMFv9tPclLa6yF3zAkfquE",
                x5t = "a3rMUgMFv9tPclLa6yF3zAkfquE",
                e = "AQAB",
                n = "qnTksBdxOiOlsmRNd-mMS2M3o1IDpK4uAr0T4_YqO3zYHAGAWTwsq4ms-NWynqY5HaB4EThNxuq2GWC5JKpO1YirOrwS97B5x9LJyHXPsdJcSikEI9BxOkl6WLQ0UzPxHdYTLpR4_O-0ILAlXw8NU4-jB4AP8Sn9YGYJ5w0fLw5YmWioXeWvocz1wHrZdJPxS8XnqHXwMUozVzQj-x6daOv5FmrHU1r9_bbp0a1GLv4BbTtSh4kMyz1hXylho0EvPg5p9YIKStbNAW9eNWvv5R8HN7PPei21AsUqxekK0oW9jnEdHewckToX7x5zULWKwwZIksll0XnVczVgy7fCFw",
                x5c = new string[]{
                    "MIIDBTCCAfGgAwIBAgIQNQb+T2ncIrNA6cKvUA1GWTAJBgUrDgMCHQUAMBIxEDAOBgNVBAMTB0RldlJvb3QwHhcNMTAwMTIwMjIwMDAwWhcNMjAwMTIwMjIwMDAwWjAVMRMwEQYDVQQDEwppZHNydjN0ZXN0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqnTksBdxOiOlsmRNd+mMS2M3o1IDpK4uAr0T4/YqO3zYHAGAWTwsq4ms+NWynqY5HaB4EThNxuq2GWC5JKpO1YirOrwS97B5x9LJyHXPsdJcSikEI9BxOkl6WLQ0UzPxHdYTLpR4/O+0ILAlXw8NU4+jB4AP8Sn9YGYJ5w0fLw5YmWioXeWvocz1wHrZdJPxS8XnqHXwMUozVzQj+x6daOv5FmrHU1r9/bbp0a1GLv4BbTtSh4kMyz1hXylho0EvPg5p9YIKStbNAW9eNWvv5R8HN7PPei21AsUqxekK0oW9jnEdHewckToX7x5zULWKwwZIksll0XnVczVgy7fCFwIDAQABo1wwWjATBgNVHSUEDDAKBggrBgEFBQcDATBDBgNVHQEEPDA6gBDSFgDaV+Q2d2191r6A38tBoRQwEjEQMA4GA1UEAxMHRGV2Um9vdIIQLFk7exPNg41NRNaeNu0I9jAJBgUrDgMCHQUAA4IBAQBUnMSZxY5xosMEW6Mz4WEAjNoNv2QvqNmk23RMZGMgr516ROeWS5D3RlTNyU8FkstNCC4maDM3E0Bi4bbzW3AwrpbluqtcyMN3Pivqdxx+zKWKiORJqqLIvN8CT1fVPxxXb/e9GOdaR8eXSmB0PgNUhM4IjgNkwBbvWC9F/lzvwjlQgciR7d4GfXPYsE1vf8tmdQaY8/PtdAkExmbrb9MihdggSoGXlELrPA91Yce+fiRcKY3rQlNWVd4DOoJ/cPXsXwry8pWjNCo5JD8Q+RQ5yZEy7YPoifwemLhTdsBz3hlZr28oCGJ3kbnpW0xGvQb3VHSTVVbeei0CfXoW6iz1"
                }
            }
        }
    };

    public static object OPENID_CONFIGURATION = new
    {
        issuer = "https://localhost:7266",
        jwks_uri = "https://localhost:7266/.well-known/jwks",
        authorization_endpoint = "https://localhost:7266/connect/authorize",
        token_endpoint = "https://localhost:7266/connect/token",
        userinfo_endpoint = "https://localhost:7266/connect/userinfo",
        end_session_endpoint = "https://localhost:7266/connect/endsession",
        check_session_iframe = "https://localhost:7266/connect/checksession",
        revocation_endpoint = "https://localhost:7266/connect/revocation",
        introspection_endpoint = "https://localhost:7266/connect/introspect",
        pushed_authorization_request_endpoint = "https://localhost:7266/connect/par",
        frontchannel_logout_supported = true,
        frontchannel_logout_session_supported = true,
        scopes_supported = new string[]{
        "openid",
        "profile",
        "email",
        "address",
        "phone",
        "offline_access",
        "api"
        },
        claims_supported = new string[]{
        "sub",
        "name",
        "family_name",
        "given_name",
        "middle_name",
        "nickname",
        "preferred_username",
        "profile",
        "picture",
        "website",
        "gender",
        "birthdate",
        "zoneinfo",
        "locale",
        "updated_at",
        "email",
        "email_verified",
        "address",
        "phone_number",
        "phone_number_verified"
        },
        response_types_supported = new string[]{
        "code",
        "token",
        "id_token",
        "id_token token",
        "code id_token",
        "code token",
        "code id_token token"
        },
        response_modes_supported = new string[]{
        "form_post",
        "query",
        "fragment"
        },
        grant_types_supported = new string[]{
        "authorization_code",
        "client_credentials",
        "password",
        "refresh_token",
        "implicit"
        },
        subject_types_supported = new string[]{
        "public"
        },
        id_token_signing_alg_values_supported = new string[]{
        "RS256"
        },
        code_challenge_methods_supported = new string[]{
        "plain",
        "S256"
        },
        token_endpoint_auth_methods_supported = new string[]{
        "client_secret_post",
        "client_secret_basic"
        },
        require_pushed_authorization_requests = true
    };

    public static object SUCCESS_TOKEN_RESPONSE = new
    {
        access_token = "access_token",
        expires_in = 3600,
        token_type = "Bearer",
        refresh_token = "refresh_token",
        custom = "custom"
    };
}

