USE safecall_db;

-- =====================================================
-- FK: denuncias -> usuarios
-- =====================================================

ALTER TABLE denuncias
ADD CONSTRAINT fk_denuncias_usuario
FOREIGN KEY (usuario_id)
REFERENCES usuarios(id);

-- =====================================================
-- FK: denuncias -> telefones
-- =====================================================

ALTER TABLE denuncias
ADD CONSTRAINT fk_denuncias_telefone
FOREIGN KEY (telefone_id)
REFERENCES telefones(id);

-- =====================================================
-- FK: denuncias -> tipos_golpe
-- =====================================================

ALTER TABLE denuncias
ADD CONSTRAINT fk_denuncias_tipo_golpe
FOREIGN KEY (tipo_golpe_id)
REFERENCES tipos_golpe(id);

-- =====================================================
-- FK: logs -> usuarios
-- =====================================================

ALTER TABLE logs
ADD CONSTRAINT fk_logs_usuario
FOREIGN KEY (usuario_id)
REFERENCES usuarios(id);