<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Models\UserModel;

class AuthController extends ResourceController
{
    public function login()
    {
        $rules = [
            'username' => 'required',
            'password' => 'required'
        ];

        if (!$this->validate($rules)) {
            return $this->failValidationErrors($this->validator->getErrors());
        }

        $username = $this->request->getVar('username');
        $password = $this->request->getVar('password');

        $userModel = new UserModel();
        $user = $userModel->where('username', $username)->first();

        if ($user) {
            if (password_verify($password, $user->password)) {
                $token = base64_encode(random_bytes(32));
                
                $userModel->update($user->id, ['token' => $token]);
                
                return $this->respond([
                    'status' => 200,
                    'message' => 'Login Berhasil',
                    'token' => $token,
                    'user' => [
                        'username' => $user->username
                    ]
                ]);
            } else {
                return $this->failUnauthorized('Password salah.');
            }
        } else {
            return $this->failNotFound('User tidak ditemukan.');
        }
    }
}
