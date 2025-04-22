/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19-11.4.4-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: MonitoreoAgricola
-- ------------------------------------------------------
-- Server version	11.4.4-MariaDB-3

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*M!100616 SET @OLD_NOTE_VERBOSITY=@@NOTE_VERBOSITY, NOTE_VERBOSITY=0 */;

--
-- Table structure for table `Cultivo`
--

DROP TABLE IF EXISTS `Cultivo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Cultivo` (
  `id_cultivo` int(11) NOT NULL AUTO_INCREMENT,
  `tipo` varchar(50) NOT NULL,
  `num_hectareas` int(11) NOT NULL,
  `id_equipos` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_cultivo`),
  KEY `id_equipos` (`id_equipos`),
  CONSTRAINT `Cultivo_ibfk_1` FOREIGN KEY (`id_equipos`) REFERENCES `Equipos` (`id_equipo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Equipos`
--

DROP TABLE IF EXISTS `Equipos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Equipos` (
  `id_equipo` int(11) NOT NULL AUTO_INCREMENT,
  `tipo` varchar(50) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `estado` enum('activo','inactivo') DEFAULT 'activo',
  PRIMARY KEY (`id_equipo`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `HistorialDatos`
--

DROP TABLE IF EXISTS `HistorialDatos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `HistorialDatos` (
  `id_historial` int(11) NOT NULL AUTO_INCREMENT,
  `id_sensor` int(11) DEFAULT NULL,
  `fecha` datetime DEFAULT current_timestamp(),
  `valor` float NOT NULL,
  `parametros` text DEFAULT NULL,
  PRIMARY KEY (`id_historial`),
  KEY `id_sensor` (`id_sensor`),
  KEY `idx_historial_fecha` (`fecha`),
  CONSTRAINT `HistorialDatos_ibfk_1` FOREIGN KEY (`id_sensor`) REFERENCES `Sensores` (`id_sensor`)
) ENGINE=InnoDB AUTO_INCREMENT=4057 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Reportes`
--

DROP TABLE IF EXISTS `Reportes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Reportes` (
  `id_reportes` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_usuario` varchar(30) NOT NULL,
  `tipo_reporte` varchar(30) NOT NULL,
  `fecha_generacion` datetime DEFAULT current_timestamp(),
  `estado` enum('generado','enviado') DEFAULT 'generado',
  `id_equipo` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_reportes`),
  KEY `id_equipo` (`id_equipo`),
  KEY `idx_reporte_fecha` (`fecha_generacion`),
  CONSTRAINT `Reportes_ibfk_1` FOREIGN KEY (`id_equipo`) REFERENCES `Equipos` (`id_equipo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Sensores`
--

DROP TABLE IF EXISTS `Sensores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Sensores` (
  `id_sensor` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `tipo` varchar(50) NOT NULL,
  `ubicacion` varchar(100) NOT NULL,
  `estado` enum('activo','inactivo') DEFAULT 'activo',
  `id_equipo` int(11) DEFAULT NULL,
  `parametros` text DEFAULT NULL,
  `api_url` text DEFAULT NULL,
  PRIMARY KEY (`id_sensor`),
  KEY `id_equipo` (`id_equipo`),
  CONSTRAINT `Sensores_ibfk_1` FOREIGN KEY (`id_equipo`) REFERENCES `Equipos` (`id_equipo`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Usuario`
--

DROP TABLE IF EXISTS `Usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Usuario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `correo_electronico` varchar(100) NOT NULL,
  `contraseña` varchar(255) NOT NULL,
  `estado_verificacion` tinyint(1) DEFAULT 0,
  `rol` enum('admin','usuario') DEFAULT 'usuario',
  `Tipo_cultivo` varchar(50) DEFAULT NULL,
  `Hectareas` int(11) DEFAULT NULL,
  `id_equipo` int(11) DEFAULT NULL,
  `id_reportes` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `correo_electronico` (`correo_electronico`),
  KEY `id_equipo` (`id_equipo`),
  KEY `id_reportes` (`id_reportes`),
  KEY `idx_usuario_correo` (`correo_electronico`),
  CONSTRAINT `Usuario_ibfk_1` FOREIGN KEY (`id_equipo`) REFERENCES `Equipos` (`id_equipo`),
  CONSTRAINT `Usuario_ibfk_2` FOREIGN KEY (`id_reportes`) REFERENCES `Reportes` (`id_reportes`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*M!100616 SET NOTE_VERBOSITY=@OLD_NOTE_VERBOSITY */;

-- Dump completed on 2025-04-22 10:43:35
