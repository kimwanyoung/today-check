package com.team.todaycheck.main.oauth;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;

import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.message.BasicNameValuePair;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class CustomOAuth2UserService {
	public static JsonNode getGoogleAccessToken(String code) {
		final String RequestUrl = "https://oauth2.googleapis.com/token"; // Host
		final List<NameValuePair> postParams = new ArrayList<NameValuePair>();
		
		System.out.println(code);
		postParams.add(new BasicNameValuePair("grant_type", "authorization_code"));
        postParams.add(new BasicNameValuePair("client_id", "680651839429-0rdi6os3kqtr8cish8f12gm1afj6o9gj.apps.googleusercontent.com"));
        postParams.add(new BasicNameValuePair("client_secret", "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"));
        postParams.add(new BasicNameValuePair("redirect_uri", "http://localhost:3000/login/callback"));
        postParams.add(new BasicNameValuePair("code", code));
        
        final HttpClient client = HttpClientBuilder.create().build();
        final HttpPost post = new HttpPost(RequestUrl);
        JsonNode returnNode = null;
        
        try {
            post.setEntity(new UrlEncodedFormEntity(postParams));
            final HttpResponse response = client.execute(post);
            // JSON 형태 반환값 처리
            ObjectMapper mapper = new ObjectMapper();
            returnNode = mapper.readTree(response.getEntity().getContent());
 
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        } catch (ClientProtocolException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
        }
 
        return returnNode;
	}
	
	public static JsonNode getNaverAccessToken(String code) {
		 
        final String RequestUrl = "https://nid.naver.com/oauth2.0/token"; // Host
        final List<NameValuePair> postParams = new ArrayList<NameValuePair>();
 
        postParams.add(new BasicNameValuePair("grant_type", "authorization_code"));
        postParams.add(new BasicNameValuePair("client_id", "Va8Dlfp7L1f0k4UXZXaw")); // REST API KEY
        postParams.add(new BasicNameValuePair("client_secret" , "2k9Sxq225n"));
        postParams.add(new BasicNameValuePair("redirect_uri", "http://localhost:3000/login/callback")); // 리다이렉트 URI
        postParams.add(new BasicNameValuePair("code", code)); // 로그인 과정중 얻은 code 값
        // postParams.add(new BasicNameValuePair("state", "1212"));
 
        final HttpClient client = HttpClientBuilder.create().build();
        final HttpPost post = new HttpPost(RequestUrl);
        JsonNode returnNode = null;
 
        try {
            post.setEntity(new UrlEncodedFormEntity(postParams));
            final HttpResponse response = client.execute(post);
 
            // JSON 형태 반환값 처리
            ObjectMapper mapper = new ObjectMapper();
 
            returnNode = mapper.readTree(response.getEntity().getContent());
 
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        } catch (ClientProtocolException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
        }
 
        return returnNode;
	}
}