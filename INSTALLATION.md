# INSTALLATION.md — Guía de despliegue en servidor

Esta guía cubre el despliegue de **Xahau Academy** (SPA estática React + Vite) en un servidor Linux con nginx, incluyendo configuración de seguridad y SSL.

---

## Índice

1. [Requisitos previos](#1-requisitos-previos)
2. [Construcción del proyecto](#2-construcción-del-proyecto)
3. [Estructura de carpetas en el servidor](#3-estructura-de-carpetas-en-el-servidor)
4. [Subir los archivos al servidor](#4-subir-los-archivos-al-servidor)
5. [Configuración de nginx](#5-configuración-de-nginx)
6. [SSL/TLS con Certbot](#6-ssltls-con-certbot)
7. [Permisos de archivos](#7-permisos-de-archivos)
8. [Revisión de seguridad](#8-revisión-de-seguridad)
9. [Mantenimiento y actualizaciones](#9-mantenimiento-y-actualizaciones)

---

## 1. Requisitos previos

### En tu máquina local

- Node.js >= 18
- npm >= 9

### En el servidor

```bash
# Actualizar paquetes
sudo apt update && sudo apt upgrade -y

# Instalar nginx
sudo apt install -y nginx

# Instalar Certbot (para SSL)
sudo apt install -y certbot python3-certbot-nginx

# Instalar rsync (para subir archivos)
sudo apt install -y rsync
```

> **No es necesario instalar Node.js en el servidor.** El proyecto se compila localmente y solo se despliegan los archivos estáticos del directorio `dist/`.

---

## 2. Construcción del proyecto

Ejecuta los siguientes comandos **en tu máquina local**, dentro del directorio del proyecto:

```bash
# Instalar dependencias
npm install

# Construir para producción
npm run build
```

Esto genera el directorio `dist/` con todos los archivos estáticos listos para servir:

```
dist/
├── index.html
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── ...
└── favicon.svg
```

> El `dist/` generado **no contiene secretos ni credenciales**. El proyecto es una SPA sin backend y sin variables de entorno en tiempo de build.

---

## 3. Estructura de carpetas en el servidor

```
/var/www/
└── xahau-academy/          # Raíz del sitio web
    ├── index.html
    ├── assets/
    └── favicon.svg

/etc/nginx/
├── nginx.conf              # Configuración global (no modificar)
└── sites-available/
    └── xahau-academy       # Configuración del sitio
/etc/nginx/sites-enabled/
    └── xahau-academy -> ../sites-available/xahau-academy  # Enlace simbólico
```

Crea el directorio del sitio:

```bash
sudo mkdir -p /var/www/xahau-academy
sudo chown -R www-data:www-data /var/www/xahau-academy
```

---

## 4. Subir los archivos al servidor

### Opción A — rsync (recomendado)

```bash
# Desde tu máquina local, dentro del directorio del proyecto
rsync -avz --delete dist/ usuario@tu-servidor.com:/var/www/xahau-academy/
```

El flag `--delete` elimina del servidor los archivos que ya no existen en `dist/`, manteniendo el servidor limpio tras cada actualización.

### Opción B — scp

```bash
scp -r dist/* usuario@tu-servidor.com:/var/www/xahau-academy/
```

### Opción C — desde el servidor con git

Si prefieres compilar directamente en el servidor (requiere Node.js en el servidor):

```bash
# En el servidor
git clone https://github.com/tu-usuario/xahau-course.git /home/deploy/xahau-course
cd /home/deploy/xahau-course
npm install
npm run build
sudo cp -r dist/* /var/www/xahau-academy/
sudo chown -R www-data:www-data /var/www/xahau-academy/
```

---

## 5. Configuración de nginx

### Crear el archivo de configuración del sitio

```bash
sudo nano /etc/nginx/sites-available/xahau-academy
```

Pega la siguiente configuración, sustituyendo `tudominio.com` por tu dominio real:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name tudominio.com www.tudominio.com;

    # Redirigir todo el tráfico HTTP a HTTPS
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name tudominio.com www.tudominio.com;

    root /var/www/xahau-academy;
    index index.html;

    # Certificados SSL (Certbot los rellena automáticamente)
    ssl_certificate /etc/letsencrypt/live/tudominio.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/tudominio.com/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    # -------------------------------------------------------
    # SPA: todas las rutas que no sean archivos estáticos
    # deben devolver index.html para el router de React
    # -------------------------------------------------------
    location / {
        try_files $uri $uri/ /index.html;
    }

    # -------------------------------------------------------
    # Assets con hash (Vite genera nombres como index-abc123.js)
    # Se pueden cachear de forma agresiva porque el hash cambia
    # con cada build
    # -------------------------------------------------------
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    # -------------------------------------------------------
    # Favicon y otros archivos en la raíz
    # -------------------------------------------------------
    location = /favicon.svg {
        expires 7d;
        add_header Cache-Control "public";
        access_log off;
    }

    # -------------------------------------------------------
    # Cabeceras de seguridad HTTP
    # -------------------------------------------------------
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Permissions-Policy "camera=(), microphone=(), geolocation=(), payment=()" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Content Security Policy
    # - Google Fonts está en la allowlist (CDN usado por el proyecto)
    # - Se permite 'unsafe-inline' solo en style-src por Tailwind/Vite
    # - Ajusta connect-src si el módulo Xaman hace llamadas a APIs externas
    add_header Content-Security-Policy "
        default-src 'self';
        script-src 'self' 'unsafe-inline';
        style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
        font-src 'self' https://fonts.gstatic.com;
        img-src 'self' data: https:;
        connect-src 'self' https://xumm.app https://xahau.network wss://xahau.network;
        frame-ancestors 'self';
        base-uri 'self';
        form-action 'self';
    " always;

    # -------------------------------------------------------
    # Bloquear acceso a archivos ocultos (.git, .env, etc.)
    # -------------------------------------------------------
    location ~ /\. {
        deny all;
        return 404;
    }

    # -------------------------------------------------------
    # Bloquear acceso a ficheros de configuración
    # -------------------------------------------------------
    location ~* \.(json|md|lock|yaml|yml|toml|sh)$ {
        deny all;
        return 404;
    }

    # -------------------------------------------------------
    # Logs
    # -------------------------------------------------------
    access_log /var/log/nginx/xahau-academy.access.log;
    error_log  /var/log/nginx/xahau-academy.error.log;
}
```

### Activar el sitio y verificar

```bash
# Crear enlace simbólico
sudo ln -s /etc/nginx/sites-available/xahau-academy /etc/nginx/sites-enabled/

# Eliminar el sitio por defecto si no lo usas
sudo rm -f /etc/nginx/sites-enabled/default

# Verificar que la configuración de nginx es correcta
sudo nginx -t

# Recargar nginx
sudo systemctl reload nginx
```

---

## 6. SSL/TLS con Certbot

```bash
# Obtener certificado Let's Encrypt
# (Certbot actualizará automáticamente la configuración de nginx)
sudo certbot --nginx -d tudominio.com -d www.tudominio.com
```

Certbot añadirá las rutas del certificado y configurará la renovación automática. Verifica que la renovación automática funciona:

```bash
sudo certbot renew --dry-run
```

La renovación automática está configurada como timer systemd:

```bash
sudo systemctl status certbot.timer
```

---

## 7. Permisos de archivos

```bash
# El directorio y su contenido deben pertenecer a www-data
sudo chown -R www-data:www-data /var/www/xahau-academy

# Directorios: 755 (lectura + ejecución para todos, escritura solo para propietario)
sudo find /var/www/xahau-academy -type d -exec chmod 755 {} \;

# Archivos: 644 (lectura para todos, escritura solo para propietario)
sudo find /var/www/xahau-academy -type f -exec chmod 644 {} \;
```

> nginx (corriendo como `www-data`) solo necesita leer los archivos, nunca escribir en ellos.

---

## 8. Revisión de seguridad

### 8.1 Lo que este proyecto NO tiene (puntos positivos)

| Aspecto | Estado |
|---|---|
| Backend / API propia | No existe — SPA estática pura |
| Base de datos | No existe |
| Autenticación de usuarios | No existe |
| Variables de entorno en `dist/` | No existen |
| Secrets o API keys en el build | No existen |
| Archivos `.env` en el servidor | No necesarios para el sitio web |

> El vector de ataque es mínimo: no hay servidor de aplicación que comprometer, no hay base de datos, no hay sesiones.

### 8.2 Puntos a verificar antes de poner en producción

**Verificar que `dist/` no contiene archivos de desarrollo:**

```bash
# En tu máquina local, antes de subir
ls dist/
# Solo debe contener: index.html, assets/, favicon.svg
# NO debe contener: .env, *.md, node_modules/, src/, etc.
```

Vite por diseño solo incluye en `dist/` lo que está en `public/` y lo que importa el bundle. El archivo `CLAUDE.md`, `package.json`, archivos de configuración, etc., **no se incluyen nunca** en el build.

**Verificar cabeceras de seguridad:**

```bash
# Desde tu máquina local, después del despliegue
curl -I https://tudominio.com
```

Deberías ver `X-Frame-Options`, `X-Content-Type-Options`, `Content-Security-Policy`, etc.

También puedes usar [https://securityheaders.com](https://securityheaders.com) para un análisis completo.

**Verificar que los archivos sensibles no son accesibles:**

```bash
# Deben devolver 404
curl -I https://tudominio.com/.git/config
curl -I https://tudominio.com/package.json
curl -I https://tudominio.com/.env
```

**Verificar que nginx no expone su versión:**

Añade en `/etc/nginx/nginx.conf` dentro del bloque `http {}`:

```nginx
server_tokens off;
```

Luego recarga: `sudo systemctl reload nginx`

### 8.3 Content Security Policy y el módulo Xaman (m11)

El módulo 11 sobre el Xaman SDK incluye ejemplos de código para que los **alumnos** ejecuten en sus propias máquinas, no código que corre en el servidor de la academia. Sin embargo, si en el futuro se añade una demo interactiva de Xaman, ajusta `connect-src` en la CSP para incluir los endpoints necesarios:

```nginx
connect-src 'self'
    https://xumm.app
    https://xahau.network
    wss://xahau.network
    wss://xumm.app;
```

### 8.4 Google Fonts (CDN externo)

El proyecto carga Outfit y Fira Code desde `fonts.googleapis.com` / `fonts.gstatic.com`. Esto está permitido en la CSP de la configuración anterior. Si prefieres eliminar la dependencia de Google:

1. Descarga las fuentes y colócalas en `public/fonts/`
2. Actualiza `index.html` para apuntar a las fuentes locales
3. Simplifica la CSP eliminando los dominios de Google

### 8.5 Firewall

```bash
# Permitir solo SSH, HTTP y HTTPS
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable

# Verificar estado
sudo ufw status
```

### 8.6 Actualizaciones del sistema

```bash
# Configurar actualizaciones de seguridad automáticas
sudo apt install -y unattended-upgrades
sudo dpkg-reconfigure --priority=low unattended-upgrades
```

---

## 9. Mantenimiento y actualizaciones

### Actualizar el contenido del curso

```bash
# 1. En local: edita los módulos en src/data/modules/
# 2. Compila
npm run build

# 3. Sube solo los archivos cambiados (rsync es incremental)
rsync -avz --delete dist/ usuario@tu-servidor.com:/var/www/xahau-academy/

# No es necesario reiniciar nginx — los archivos estáticos se sirven directamente
```

### Comprobar logs de nginx

```bash
# Últimas líneas del log de acceso
sudo tail -f /var/log/nginx/xahau-academy.access.log

# Errores
sudo tail -f /var/log/nginx/xahau-academy.error.log
```

### Comprobar estado de nginx

```bash
sudo systemctl status nginx
```

### Renovación manual del certificado SSL

```bash
sudo certbot renew
sudo systemctl reload nginx
```

---

## Checklist de despliegue

- [ ] `npm run build` ejecutado sin errores en local
- [ ] Archivos de `dist/` subidos al servidor en `/var/www/xahau-academy/`
- [ ] Permisos `www-data:www-data` y `755/644` aplicados
- [ ] Configuración de nginx creada y enlazada en `sites-enabled/`
- [ ] `sudo nginx -t` pasa sin errores
- [ ] Certbot configurado y certificado SSL activo
- [ ] Redirección HTTP → HTTPS funcionando
- [ ] Cabeceras de seguridad verificadas con `curl -I` o securityheaders.com
- [ ] Archivos ocultos (`.git`, `.env`, `package.json`) devuelven 404
- [ ] Firewall configurado (solo 22, 80, 443)
- [ ] `server_tokens off` en nginx.conf
- [ ] Renovación automática de Certbot verificada con `--dry-run`
