package com.ssafy.sub.pjt.infrastructure.oauthprovider;

import static com.ssafy.sub.pjt.common.CustomExceptionStatus.INVALID_AUTHORIZATION_CODE;
import static com.ssafy.sub.pjt.common.CustomExceptionStatus.NOT_SUPPORTED_OAUTH_SERVICE;

import com.ssafy.sub.pjt.domain.OauthAccessToken;
import com.ssafy.sub.pjt.domain.OauthProvider;
import com.ssafy.sub.pjt.domain.OauthUserInfo;
import com.ssafy.sub.pjt.exception.AuthException;
import com.ssafy.sub.pjt.infrastructure.oauthuserinfo.NaverUserInfo;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

@Component
public class NaverOauthProvider implements OauthProvider {

    private static final String PROPERTIES_PATH = "${oauth2.provider.naver.";
    private static final String PROVIDER_NAME = "naver";
    private static final String SECURE_RESOURCE = "secure_resource";

    protected final String clientId;
    protected final String clientSecret;
    protected final String redirectUri;
    protected final String tokenUri;
    protected final String userUri;

    public NaverOauthProvider(
            @Value(PROPERTIES_PATH + "client-id}") final String clientId,
            @Value(PROPERTIES_PATH + "client-secret}") final String clientSecret,
            @Value(PROPERTIES_PATH + "redirect-uri}") final String redirectUri,
            @Value(PROPERTIES_PATH + "token-uri}") final String tokenUri,
            @Value(PROPERTIES_PATH + "user-info}") final String userUri) {
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.redirectUri = redirectUri;
        this.tokenUri = tokenUri;
        this.userUri = userUri;
    }

    @Override
    public boolean is(final String name) {
        return PROVIDER_NAME.equals(name);
    }

    @Override
    public OauthUserInfo getUserInfo(final String code) {
        final String accessToken = requestAccessToken(code);
        final HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);
        final HttpEntity<MultiValueMap<String, String>> userInfoRequestEntity =
                new HttpEntity<>(headers);

        final ResponseEntity<NaverUserInfo> response =
                restTemplate.exchange(
                        userUri, HttpMethod.GET, userInfoRequestEntity, NaverUserInfo.class);

        if (response.getStatusCode().is2xxSuccessful()) {
            return response.getBody();
        }
        throw new AuthException(NOT_SUPPORTED_OAUTH_SERVICE);
    }

    private String requestAccessToken(final String code) {
        final HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        final MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("code", code);
        params.add("client_id", clientId);
        params.add("client_secret", clientSecret);
        params.add("redirect_uri", redirectUri);
        params.add("grant_type", "authorization_code");
        final HttpEntity<MultiValueMap<String, String>> accessTokenRequestEntity =
                new HttpEntity<>(params, headers);

        final ResponseEntity<OauthAccessToken> accessTokenResponse =
                restTemplate.exchange(
                        tokenUri,
                        HttpMethod.POST,
                        accessTokenRequestEntity,
                        OauthAccessToken.class);

        return Optional.ofNullable(accessTokenResponse.getBody())
                .orElseThrow(() -> new AuthException(INVALID_AUTHORIZATION_CODE))
                .getAccessToken();
    }
}
