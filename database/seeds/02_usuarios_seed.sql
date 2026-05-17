USE safecall_db;

INSERT INTO usuarios
(nome, email, senha_hash, role)
VALUES
(
    'Administrador',
    'admin@safecall.com',
    'admin123',
    'ADMIN'
),
(
    'Leonardo',
    'leo@safecall.com',
    '123456',
    'USER'
);