<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->get('/', 'Home::index');

// OPTIONS catch-all untuk CORS Preflight
$routes->options('(:any)', 'Home::index');

// Rute Login Publik
$routes->post('login', 'AuthController::login');

// ===== CATEGORY ROUTES =====
// GET list (publik, tanpa auth)
$routes->get('category', 'CategoryController::index');
$routes->get('categories', 'CategoryController::index');

// POST, PUT, DELETE (butuh auth)
$routes->post('category', 'CategoryController::create', ['filter' => 'auth']);
$routes->put('category/(:num)', 'CategoryController::update/$1', ['filter' => 'auth']);
$routes->patch('category/(:num)', 'CategoryController::update/$1', ['filter' => 'auth']);
$routes->delete('category/(:num)', 'CategoryController::delete/$1', ['filter' => 'auth']);
$routes->get('category/(:num)', 'CategoryController::show/$1');

// ===== ITEM ROUTES =====
// GET list (publik, tanpa auth)
$routes->get('item', 'ItemController::index');
$routes->get('items', 'ItemController::index');

// POST, PUT, DELETE (butuh auth)
$routes->post('item', 'ItemController::create', ['filter' => 'auth']);
$routes->put('item/(:num)', 'ItemController::update/$1', ['filter' => 'auth']);
$routes->patch('item/(:num)', 'ItemController::update/$1', ['filter' => 'auth']);
$routes->delete('item/(:num)', 'ItemController::delete/$1', ['filter' => 'auth']);
$routes->get('item/(:num)', 'ItemController::show/$1');