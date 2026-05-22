package com.safecall.api.repository;

import com.safecall.api.entity.Chamado;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChamadoRepository
        extends JpaRepository<Chamado, Long> {

}