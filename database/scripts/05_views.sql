USE safecall_db;

-- =====================================================
-- VIEW: ranking telefones denunciados
-- =====================================================

CREATE VIEW vw_telefones_mais_denunciados AS
SELECT
    numero,
    quantidade_denuncias,
    nivel_risco
FROM telefones
ORDER BY quantidade_denuncias DESC;

-- =====================================================
-- VIEW: denuncias completas
-- =====================================================

CREATE VIEW vw_denuncias_completas AS
SELECT
    d.id,
    d.descricao,
    d.status,
    d.data_ocorrencia,
    
    u.nome AS usuario,
    
    t.numero AS telefone,
    
    tg.nome AS tipo_golpe
    
FROM denuncias d

INNER JOIN usuarios u
ON d.usuario_id = u.id

INNER JOIN telefones t
ON d.telefone_id = t.id

INNER JOIN tipos_golpe tg
ON d.tipo_golpe_id = tg.id;