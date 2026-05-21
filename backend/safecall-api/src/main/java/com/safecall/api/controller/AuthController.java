package com.safecall.api.controller;

import com.safecall.api.dto.LoginDTO;
import com.safecall.api.dto.LoginResponseDTO;
import com.safecall.api.entity.Usuario;
import com.safecall.api.repository.UsuarioRepository;
import com.safecall.api.security.JwtService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDTO dto) {

        Usuario usuario = usuarioRepository.findByEmail(dto.getEmail());

        if (usuario == null) {
            return ResponseEntity.badRequest().body("Usuário não encontrado");
        }

        boolean senhaCorreta = passwordEncoder.matches(
                dto.getSenha(),
                usuario.getSenhaHash());

        if (!senhaCorreta) {
            return ResponseEntity.badRequest().body("Senha inválida");
        }

        String token = jwtService.gerarToken(usuario.getEmail());

        return ResponseEntity.ok(
                new LoginResponseDTO(token));
    }
}