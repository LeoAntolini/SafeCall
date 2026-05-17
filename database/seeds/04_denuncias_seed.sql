USE safecall_db;

INSERT INTO denuncias
(
    descricao,
    data_ocorrencia,
    status,
    usuario_id,
    telefone_id,
    tipo_golpe_id
)
VALUES
(
    'Ligacao informando compra suspeita no cartao.',
    NOW(),
    'CONFIRMADO',
    2,
    1,
    1
),
(
    'Solicitacao de PIX urgente.',
    NOW(),
    'EM_ANALISE',
    2,
    2,
    2
);