<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    //return view('welcome');
    
});

Route::group(  ['middleware' =>'cors'], function(){

    //----Pruebas DocumentacionController
    //Route::get('/documentacion','DocumentacionController@index');

    //----Pruebas LoginController
    Route::post('/login/web','LoginController@loginWeb');
    Route::post('/login/app','LoginController@loginApp');
    Route::post('/validar/token','LoginController@validarToken');

    //----Pruebas PasswordController
    //Route::get('/password/cliente/{correo}','PasswordController@generarCodigo');
    //Route::get('/password/codigo/{codigo}','PasswordController@validarCodigo');

    //Route::get('/aplicacion','AplicacionController@index');


        //----Pruebas AplicacionController
        //Route::post('/aplicacion','AplicacionController@store');
        //Route::put('/aplicacion/{id}','AplicacionController@update');

        //----Pruebas DashboardController
        //Route::get('/dashboard','DashboardController@index');

        //----Pruebas UsuarioController
        Route::get('usuarios','UsuarioController@index');
        //Route::get('/usuarios/pedidos','UsuarioController@usuariosClientesPedidos');
        Route::post('/usuarios','UsuarioController@store');
        Route::put('/usuarios/{id}','UsuarioController@update');
        Route::delete('/usuarios/{id}','UsuarioController@destroy');
        Route::get('/usuarios/{id}','UsuarioController@show');
        //Route::get('/usuarios/{id}/pedidos','UsuarioController@usuarioPedidos');

        //----Pruebas AnimalController
        Route::get('animales','AnimalController@index');
        //Route::get('/animales/pedidos','AnimalController@usuariosClientesPedidos');
        Route::get('/animales/especies/razas/posImplantes','AnimalController@especiesRazasPosImplantes');
        Route::post('/animales','AnimalController@store');
        Route::put('/animales/{id}','AnimalController@update');
        Route::delete('/animales/{id}','AnimalController@destroy');
        Route::get('/animales/{id}','AnimalController@show');
        //Route::get('/animales/{id}/pedidos','AnimalController@usuarioPedidos');

        //----Pruebas EspecieController
        Route::get('especies','EspecieController@index');
        //Route::get('/especies/pedidos','EspecieController@usuariosClientesPedidos');
        Route::post('/especies','EspecieController@store');
        Route::put('/especies/{id}','EspecieController@update');
        Route::delete('/especies/{id}','EspecieController@destroy');
        Route::get('/especies/{id}','EspecieController@show');
        //Route::get('/especies/{id}/pedidos','EspecieController@usuarioPedidos');

        //----Pruebas RazaController
        Route::get('razas','RazaController@index');
        //Route::get('/razas/pedidos','RazaController@usuariosClientesPedidos');
        Route::post('/razas','RazaController@store');
        Route::put('/razas/{id}','RazaController@update');
        Route::delete('/razas/{id}','RazaController@destroy');
        Route::get('/razas/{id}','RazaController@show');
        //Route::get('/razas/{id}/pedidos','RazaController@usuarioPedidos');

        //----Pruebas TipoVacunaController
        Route::get('vacunas','TipoVacunaController@index');
        //Route::get('/vacunas/pedidos','TipoVacunaController@usuariosClientesPedidos');
        Route::post('/vacunas','TipoVacunaController@store');
        Route::put('/vacunas/{id}','TipoVacunaController@update');
        Route::delete('/vacunas/{id}','TipoVacunaController@destroy');
        Route::get('/vacunas/{id}', 'TipoVacunaController@show');
        //Route::get('/vacunas/{id}/pedidos','TipoVacunaController@usuarioPedidos');



    Route::group(['middleware' => 'jwt-auth'], function(){



    });
});
