package com.safecall.api.service;

import com.safecall.api.dto.UsuarioRequestDTO;
import com.safecall.api.entity.Usuario;
import com.safecall.api.repository.UsuarioRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Usuario criarUsuario(UsuarioRequestDTO dto) {

        Usuario usuario = new Usuario();

        usuario.setNome(dto.getNome());
        usuario.setEmail(dto.getEmail());

        usuario.setSenhaHash(
            passwordEncoder.encode(dto.getSenha())
        );

        usuario.setRole("USER");
        usuario.setAtivo(true);
        usuario.setCreatedAt(LocalDateTime.now());

        return usuarioRepository.save(usuario);
    }

    public Usuario buscarPorEmail(String email) {
        return usuarioRepository.findByEmail(email);
    }
}