import pool from "../../config/config";
import jwt from "jsonwebtoken";

export const login = async (_parent: any, { input }: any) => {
  try {
    const loginQuery = "SELECT id FROM users WHERE email = ? AND password = ?";
    const [result] = await pool.execute(loginQuery, [
      input.email,
      input.password,
    ]);

    if (!Array.isArray(result) || result.length === 0) {
      throw new Error(
        "No se encontró ningún usuario con los datos introducidos"
      );
    }

    console.log("usuario encontrado");

    // Obtener el ID del usuario
    const userId = (result[0] as any).id;

    // Crear token JWT
    const token = jwt.sign({ userId }, "secretKey", { expiresIn: "1h" });
    console.log("Token JWT generado:", token); // Agregar esta línea para imprimir el token generado
    return {
        token
    };
  } catch (error) {
    console.error("Error al encontrar al usuario:", error);
    throw new Error("Error al encontrar al usuario");
  }
};
