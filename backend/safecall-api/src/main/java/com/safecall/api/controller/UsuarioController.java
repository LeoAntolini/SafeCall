package com.safecall.api.controller;

import com.safecall.api.dto.UsuarioRequestDTO;
import com.safecall.api.entity.Usuario;
import com.safecall.api.service.UsuarioService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
}