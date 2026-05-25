USE safecall_db;

-- =====================================================
-- INDEXES usuarios
-- =====================================================

CREATE INDEX idx_usuario_email
ON usuarios(email);

-- =====================================================
-- INDEXES telefones
-- =====================================================

CREATE INDEX idx_telefone_numero
ON telefones(numero);

CREATE INDEX idx_telefone_nivel_risco
ON telefones(nivel_risco);

-- =====================================================
-- INDEXES denuncias
-- =====================================================

CREATE INDEX idx_denuncia_status
ON denuncias(status);

CREATE INDEX idx_denuncia_data
ON denuncias(data_ocorrencia);

-- =====================================================
-- INDEXES logs
-- =====================================================

CREATE INDEX idx_logs_data
ON logs(created_at);