package com.safecall.api.dto;

import java.time.LocalDateTime;

public class UsuarioResponseDTO {

    private Long id;
    private String nome;
    private String email;
    private String role;
    private LocalDateTime dataCriacao;

    public UsuarioResponseDTO() {
    }

    public UsuarioResponseDTO(Long id, String nome, String email, String role, LocalDateTime dataCriacao) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.role = role;
        this.dataCriacao = dataCriacao;
    }

    public Long getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }

    public String getEmail() {
        return email;
    }

    public String getRole() {
        return role;
    }

    public LocalDateTime getDataCriacao() {
        return dataCriacao;
    }
}