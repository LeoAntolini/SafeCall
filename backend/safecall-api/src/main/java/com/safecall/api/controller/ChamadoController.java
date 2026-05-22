package com.safecall.api.controller;

import com.safecall.api.dto.ChamadoRequestDTO;
import com.safecall.api.entity.Chamado;
import com.safecall.api.service.ChamadoService;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;

import org.springframework.security.core.Authentication;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/chamados")
public class ChamadoController {

    @Autowired
    private ChamadoService chamadoService;

    @PostMapping
    public ResponseEntity<Chamado> criarChamado(
            @RequestBody ChamadoRequestDTO dto,
            Authentication authentication
    ) {

        String email = authentication.getName();

        Chamado chamado = chamadoService
                .criarChamado(dto, email);

        return ResponseEntity.ok(chamado);
    }
}