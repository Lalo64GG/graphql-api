import { createPool, Pool } from "mysql2/promise";

const pool: Pool = createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

  const testConnection = async () => {
      try {
          const connection = await pool.getConnection();
          console.log('Connected to MySQL database!');
          connection.release();
      } catch (error) {
          console.error('Error connecting to MySQL database:', error);
      }
  };

 testConnection(); // Llamamos a la función de prueba de conexión al cargar el módulo

export default pool;
