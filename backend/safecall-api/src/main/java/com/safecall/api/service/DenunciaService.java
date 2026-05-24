package com.safecall.api.service;

import com.safecall.api.dto.DenunciaRequestDTO;
import com.safecall.api.entity.Denuncia;
import com.safecall.api.entity.Usuario;
import com.safecall.api.repository.DenunciaRepository;
import com.safecall.api.repository.UsuarioRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class DenunciaService {

    @Autowired
    private DenunciaRepository denunciaRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    public Denuncia criarDenuncia(DenunciaRequestDTO dto, String emailUsuario) {

        Usuario usuario = usuarioRepository.findByEmail(emailUsuario);

        Denuncia denuncia = new Denuncia();

        denuncia.setNumeroTelefone(dto.getNumeroTelefone());
        denuncia.setTipoGolpe(dto.getTipoGolpe());
        denuncia.setDescricao(dto.getDescricao());
        denuncia.setNivelRisco(dto.getNivelRisco());

        denuncia.setStatus("PENDENTE");
        denuncia.setCreatedAt(LocalDateTime.now());
        denuncia.setUsuario(usuario);

        return denunciaRepository.save(denuncia);
    }

    public List<Denuncia> listarDenuncias() {
        return denunciaRepository.findAll();
    }
}