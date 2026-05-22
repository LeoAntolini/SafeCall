package com.safecall.api.service;

import com.safecall.api.dto.ChamadoRequestDTO;
import com.safecall.api.entity.Chamado;
import com.safecall.api.entity.Usuario;
import com.safecall.api.repository.ChamadoRepository;
import com.safecall.api.repository.UsuarioRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class ChamadoService {

    @Autowired
    private ChamadoRepository chamadoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    public Chamado criarChamado(
            ChamadoRequestDTO dto,
            String emailUsuario
    ) {

        Usuario usuario = usuarioRepository
                .findByEmail(emailUsuario);

        Chamado chamado = new Chamado();

        chamado.setTitulo(dto.getTitulo());

        chamado.setDescricao(dto.getDescricao());

        chamado.setPrioridade(dto.getPrioridade());

        chamado.setStatus("ABERTO");

        chamado.setCreatedAt(LocalDateTime.now());

        chamado.setUsuario(usuario);

        return chamadoRepository.save(chamado);
    }
}