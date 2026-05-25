USE safecall_db;

-- =====================================================
-- TABELA: usuarios
-- =====================================================

CREATE TABLE usuarios (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    
    nome VARCHAR(150) NOT NULL,
    
    email VARCHAR(150) NOT NULL UNIQUE,
    
    senha_hash VARCHAR(255) NOT NULL,
    
    role ENUM('USER', 'ADMIN') DEFAULT 'USER',
    
    ativo BOOLEAN DEFAULT TRUE,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- TABELA: telefones
-- =====================================================

CREATE TABLE telefones (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    
    numero VARCHAR(20) NOT NULL UNIQUE,
    
    quantidade_denuncias INT DEFAULT 0,
    
    nivel_risco ENUM('BAIXO', 'MEDIO', 'ALTO') DEFAULT 'BAIXO',
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- TABELA: tipos_golpe
-- =====================================================

CREATE TABLE tipos_golpe (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    
    nome VARCHAR(100) NOT NULL UNIQUE,
    
    descricao TEXT,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- TABELA: denuncias
-- =====================================================

CREATE TABLE denuncias (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    
    descricao TEXT NOT NULL,
    
    data_ocorrencia DATETIME NOT NULL,
    
    status ENUM('PENDENTE', 'EM_ANALISE', 'CONFIRMADO')
    DEFAULT 'PENDENTE',
    
    usuario_id BIGINT NOT NULL,
    
    telefone_id BIGINT NOT NULL,
    
    tipo_golpe_id BIGINT NOT NULL,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- TABELA: logs
-- =====================================================

CREATE TABLE logs (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    
    acao VARCHAR(255) NOT NULL,
    
    detalhes TEXT,
    
    usuario_id BIGINT,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);