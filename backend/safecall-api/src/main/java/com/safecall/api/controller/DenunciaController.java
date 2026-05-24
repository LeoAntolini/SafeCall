package com.safecall.api.controller;

import com.safecall.api.dto.DenunciaRequestDTO;
import com.safecall.api.entity.Denuncia;
import com.safecall.api.service.DenunciaService;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;

import org.springframework.security.core.Authentication;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/denuncias")
public class DenunciaController {

    @Autowired
    private DenunciaService denunciaService;

    @PostMapping
    public ResponseEntity<Denuncia> criarDenuncia(
            @RequestBody DenunciaRequestDTO dto,
            Authentication auth
    ) {

        String email = auth.getName();

        return ResponseEntity.ok(
            denunciaService.criarDenuncia(dto, email)
        );
    }

    @GetMapping
    public ResponseEntity<?> listar() {
        return ResponseEntity.ok(
            denunciaService.listarDenuncias()
        );
    }
}