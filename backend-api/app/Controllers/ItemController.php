<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Models\ItemModel;

class ItemController extends ResourceController
{
    protected $modelName = 'App\Models\ItemModel';
    protected $format    = 'json';

    public function index()
    {
        return $this->respond([
            'status' => 200,
            'message' => 'Data Barang Berhasil Diambil',
            'data' => $this->model->getItemsWithCategory()
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
        $category_id = $json ? ($json->category_id ?? '') : $this->request->getVar('category_id');
        $name = $json ? ($json->name ?? '') : $this->request->getVar('name');
        $stock = $json ? ($json->stock ?? '') : $this->request->getVar('stock');
        $price = $json ? ($json->price ?? '') : $this->request->getVar('price');

        if (empty($name) || empty($category_id) || $stock === '' || $price === '') {
            return $this->failValidationErrors(['error' => 'Semua field (name, category_id, stock, price) harus diisi']);
        }

        $data = [
            'category_id' => $category_id,
            'name' => $name,
            'stock' => $stock,
            'price' => $price
        ];

        $this->model->insert($data);
        $data['id'] = $this->model->getInsertID();

        return $this->respondCreated(['status' => 201, 'message' => 'Barang berhasil ditambahkan', 'data' => $data]);
    }

    public function update($id = null)
    {
        if (!$this->model->find($id)) {
            return $this->failNotFound('Data tidak ditemukan');
        }

        $json = $this->request->getJSON();
        if ($json) {
            $data = [];
            if (isset($json->category_id)) $data['category_id'] = $json->category_id;
            if (isset($json->name)) $data['name'] = $json->name;
            if (isset($json->stock)) $data['stock'] = $json->stock;
            if (isset($json->price)) $data['price'] = $json->price;
        } else {
            $data = $this->request->getRawInput();
        }

        if (empty($data)) {
            return $this->failValidationErrors(['error' => 'Tidak ada data yang dikirim']);
        }

        $this->model->update($id, $data);
        return $this->respond(['status' => 200, 'message' => 'Barang berhasil diupdate']);
    }

    public function delete($id = null)
    {
        if ($this->model->find($id)) {
            $this->model->delete($id);
            return $this->respondDeleted(['status' => 200, 'message' => 'Barang berhasil dihapus']);
        }
        return $this->failNotFound('Data tidak ditemukan');
    }
}