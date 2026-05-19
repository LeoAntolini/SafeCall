package com.safecall.api.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {

    public String gerarToken(String email) {
        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24))
                .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    // mínimo 32 caracteres
    private static final String SECRET_KEY = "TXlTdXBlclNlY3JldEtleUZvclNhZmVDYWxsMTIzNDU2Nzg5";

    // =========================
    // EXTRAIR EMAIL DO TOKEN
    // =========================
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    // =========================
    // EXTRAIR EXPIRAÇÃO
    // =========================
    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    // =========================
    // EXTRAIR QUALQUER CLAIM
    // =========================
    public <T> T extractClaim(String token,
            Function<Claims, T> claimsResolver) {

        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    // =========================
    // GERAR TOKEN
    // =========================
    public String generateToken(UserDetails userDetails) {

        Map<String, Object> claims = new HashMap<>();

        return createToken(claims, userDetails.getUsername());
    }

    // =========================
    // CRIAR TOKEN
    // =========================
    private String createToken(Map<String, Object> claims,
            String subject) {

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(
                        new Date(System.currentTimeMillis()
                                + 1000 * 60 * 60 * 24)) // 24h
                .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    // =========================
    // VALIDAR TOKEN
    // =========================
    @SuppressWarnings("deprecation")
    public boolean isTokenValid(String token) {
        try {
            Jwts.parser()
                    .setSigningKey(getSignInKey())
                    .parseClaimsJws(token);

            return true;

        } catch (Exception e) {
            return false;
        }
    }

    // =========================
    // EXTRAIR CLAIMS
    // =========================
    @SuppressWarnings("deprecation")
    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .setSigningKey(getSignInKey())
                .parseClaimsJws(token)
                .getBody();
    }

    // =========================
    // CHAVE
    // =========================
    private Key getSignInKey() {

        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);

        return Keys.hmacShaKeyFor(keyBytes);
    }
}