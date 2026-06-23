<?php

namespace App\Filters;

use CodeIgniter\Filters\FilterInterface;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use App\Models\UserModel;

class AuthFilter implements FilterInterface
{
    public function before(RequestInterface $request, $arguments = null)
    {
        $authHeader = $request->getServer('HTTP_AUTHORIZATION');
        $uri = $request->getUri()->getPath();

        // JIKA JALUR LOGIN, LANGSUNG LOLOSKAN TANPA CEK TOKEN
        if ($uri === 'login' || $uri === 'auth/login') {
            return;
        }

        if (!$authHeader) {
            $response = service('response');
            $response->setJSON([
                'status'  => 401,
                'error'   => 'Unauthorized',
                'message' => 'Token tidak ditemukan.'
            ]);
            $response->setStatusCode(401);
            return $response;
        }

        // Cek token valid
        $token = str_replace('Bearer ', '', $authHeader);
        $userModel = new UserModel();
        $user = $userModel->where('token', $token)->first();

        if (!$user) {
            $response = service('response');
            $response->setJSON([
                'status'  => 401,
                'error'   => 'Unauthorized',
                'message' => 'Token tidak valid atau sudah kadaluarsa.'
            ]);
            $response->setStatusCode(401);
            return $response;
        }
    }

    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null)
    {
        // Kosongkan saja
    }
}