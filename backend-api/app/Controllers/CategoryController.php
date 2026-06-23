<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Models\CategoryModel;

class CategoryController extends ResourceController
{
    protected $modelName = 'App\Models\CategoryModel';
    protected $format    = 'json';

    public function index()
    {
        return $this->respond([
            'status' => 200,
            'message' => 'Data Kategori Berhasil Diambil',
            'data' => $this->model->findAll()
        ]);
    }

    public function show($id = null)
    {
        $data = $this->model->find($id);
        if ($data) {
            return $this->respond(['status' => 200, 'data' => $data]);
        }
        return $this->failNotFound('Data tidak ditemukan');
    }

    public function create()
    {
        $json = $this->request->getJSON();
        $name = $json ? ($json->name ?? '') : $this->request->getVar('name');
        $description = $json ? ($json->description ?? '') : $this->request->getVar('description');

        if (empty($name)) {
            return $this->failValidationErrors(['name' => 'Field name is required']);
        }

        $data = [
            'name' => $name,
            'description' => $description
        ];

        $this->model->insert($data);
        $data['id'] = $this->model->getInsertID();

        return $this->respondCreated(['status' => 201, 'message' => 'Kategori berhasil ditambahkan', 'data' => $data]);
    }

    public function update($id = null)
    {
        $data = $this->request->getRawInput();
        
        if (!$this->model->find($id)) {
            return $this->failNotFound('Data tidak ditemukan');
        }

        $this->model->update($id, $data);
        return $this->respond(['status' => 200, 'message' => 'Kategori berhasil diupdate']);
    }

    public function delete($id = null)
    {
        if ($this->model->find($id)) {
            $this->model->delete($id);
            return $this->respondDeleted(['status' => 200, 'message' => 'Kategori berhasil dihapus']);
        }
        return $this->failNotFound('Data tidak ditemukan');
    }
}
