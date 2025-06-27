import sqlite3 from 'sqlite3';
import path from 'path';

// Configuração do SQLite
const DB_PATH = path.join(process.cwd(), 'database.sqlite');

export class DatabaseManager {
  private static instance: DatabaseManager;
  private db: sqlite3.Database;

  private constructor() {
    // Inicializa o banco de dados
    this.db = new sqlite3.Database(DB_PATH, (err) => {
      if (err) {
        console.error('Erro ao conectar com o banco de dados:', err.message);
      } else {
        console.log('Conectado ao banco SQLite:', DB_PATH);
        this.initializeTables();
      }
    });
  }

  public static getInstance(): DatabaseManager {
    if (!DatabaseManager.instance) {
      DatabaseManager.instance = new DatabaseManager();
    }
    return DatabaseManager.instance;
  }

  public getDatabase(): sqlite3.Database {
    return this.db;
  }

  private initializeTables(): void {
    // Migração para adicionar colunas que podem estar ausentes
    this.migrateDatabase();
    
    // Criação das tabelas se não existirem
    const createTables = [
      `CREATE TABLE IF NOT EXISTS tutores (
        id TEXT PRIMARY KEY,
        nome TEXT NOT NULL,
        telefone TEXT NOT NULL,
        email TEXT NOT NULL,
        endereco TEXT NOT NULL,
        ativo BOOLEAN NOT NULL DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`,
      
      `CREATE TABLE IF NOT EXISTS animais (
        id TEXT PRIMARY KEY,
        nome TEXT NOT NULL,
        especie TEXT NOT NULL,
        sexo TEXT NOT NULL,
        tutorId TEXT NOT NULL,
        ativo BOOLEAN NOT NULL DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (tutorId) REFERENCES tutores (id)
      )`,
      
      `CREATE TABLE IF NOT EXISTS consultas (
        id TEXT PRIMARY KEY,
        animalId TEXT NOT NULL,
        data_consulta TEXT NOT NULL,
        motivo TEXT,
        observacoes TEXT,
        encerrada BOOLEAN NOT NULL DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (animalId) REFERENCES animais (id)
      )`,
      
      `CREATE TABLE IF NOT EXISTS vacinas_aplicadas (
        id TEXT PRIMARY KEY,
        animalId TEXT NOT NULL,
        consultaId TEXT NOT NULL,
        nome_vacina TEXT NOT NULL,
        data_aplicacao TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (animalId) REFERENCES animais (id),
        FOREIGN KEY (consultaId) REFERENCES consultas (id)
      )`
    ];

    createTables.forEach((sql) => {
      this.db.run(sql, (err) => {
        if (err) {
          console.error('Erro ao criar tabela:', err.message);
        }
      });
    });
  }

  private migrateDatabase(): void {
    // Adicionar coluna email à tabela tutores se não existir
    this.db.run(`ALTER TABLE tutores ADD COLUMN email TEXT`, (err) => {
      if (err && !err.message.includes('duplicate column name')) {
        console.error('Erro ao adicionar coluna email:', err.message);
      }
    });

    // Adicionar colunas motivo e observacoes à tabela consultas se não existir
    this.db.run(`ALTER TABLE consultas ADD COLUMN motivo TEXT`, (err) => {
      if (err && !err.message.includes('duplicate column name')) {
        console.error('Erro ao adicionar coluna motivo:', err.message);
      }
    });

    this.db.run(`ALTER TABLE consultas ADD COLUMN observacoes TEXT`, (err) => {
      if (err && !err.message.includes('duplicate column name')) {
        console.error('Erro ao adicionar coluna observacoes:', err.message);
      }
    });
  }

  public close(): void {
    this.db.close((err) => {
      if (err) {
        console.error('Erro ao fechar banco de dados:', err.message);
      } else {
        console.log('Conexão com banco de dados fechada.');
      }
    });
  }
}

export default DatabaseManager;