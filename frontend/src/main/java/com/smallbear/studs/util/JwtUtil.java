package com.smallbear.studs.util;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;

import java.util.Date;

public class JwtUtil {
    private static final String SECRET = "HELLO;TODAY";

    public static void main(String[] args) {
        String toke =
                JwtUtil.createToken(10);

        System.out.println(toke);
    }

    public static String createToken(long expire) {
        // 签名算法
        Algorithm algorithm = Algorithm.HMAC256(SECRET);
        Date expiresAt = new Date(System.currentTimeMillis() + expire * 1000);
        return JWT.create().withIssuer("smallbear").withExpiresAt(expiresAt).sign(algorithm);
    }

    public static boolean verifyToken(String token) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(SECRET);
            JWT.require(algorithm).withIssuer("smallbear").build().verify(token);
            return true;
        } catch (JWTVerificationException e) {
            return false;
        }
    }

}
