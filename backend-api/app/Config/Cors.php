<?php

namespace Config;

use CodeIgniter\Config\BaseConfig;

class Cors extends BaseConfig
{
    /**
     * --------------------------------------------------------------------------
     * Default CORS Properties
     * --------------------------------------------------------------------------
     *
     * Pengaturan default ini akan digunakan oleh library internal CodeIgniter
     * untuk membalas jabat tangan (OPTIONS Preflight) dari browser Google Chrome.
     */
    public array $default = [
        // Mengizinkan asal request (Origin) dari mana saja, termasuk Live Server lu
        'allowedOrigins'      => ['*'],
        
        'allowedOriginsPatterns' => [],
        
        // Mengizinkan semua jenis header bawaan Axios (termasuk Authorization token dan Content-Type)
        'allowedHeaders'      => ['*'],
        
        // Mengizinkan semua metode request RESTful API
        'allowedMethods'      => ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
        
        'exposedHeaders'      => [],
        
        // Berapa lama browser menyimpan cache izin CORS ini (dalam hitungan detik)
        'maxAge'              => 7200,
        
        'supportsCredentials' => false,
    ];
}