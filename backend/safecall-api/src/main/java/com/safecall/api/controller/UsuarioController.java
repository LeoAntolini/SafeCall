package com.safecall.api.controller;

import com.safecall.api.dto.UsuarioRequestDTO;
import com.safecall.api.entity.Usuario;
import com.safecall.api.service.UsuarioService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Map;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @PostMapping
    public ResponseEntity<Usuario> criarUsuario(
            @RequestBody UsuarioRequestDTO dto) {

        Usuario usuario = usuarioService.criarUsuario(dto);

        return ResponseEntity.ok(usuario);
    }

    @GetMapping("/me")
    public ResponseEntity<?> usuarioLogado(Principal principal) {

        Usuario usuario = usuarioService.buscarPorEmail(
                principal.getName());

        return ResponseEntity.ok(
                Map.of(
                        "id", usuario.getId(),
                        "nome", usuario.getNome(),
                        "email", usuario.getEmail(),
                        "role", usuario.getRole()
                )
        );
    }
}