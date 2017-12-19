<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UsuariosMigration extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('usuarios', function (Blueprint $table) {
            $table->increments('id');
            $table->string('nombre_asociacion')->nullable();
            $table->string('colegio_medico')->nullable();
            $table->string('matricula')->nullable();
            $table->string('matricula_rema')->nullable();
            $table->string('ci')->nullable();
            $table->string('exp')->nullable();
            $table->string('ciudad')->nullable();
            $table->string('provincia')->nullable();
            $table->integer('direccion_tipo')->nullable();
            $table->string('municipio')->nullable();
            $table->string('zona')->nullable();
            $table->string('av')->nullable();
            $table->string('calle')->nullable();
            $table->string('nro')->nullable();
            $table->string('barrio')->nullable();
            $table->string('mz')->nullable();
            $table->string('uv')->nullable();
            $table->string('cargo')->nullable();
            $table->string('nombre')->nullable();
            $table->string('apellido_paterno')->nullable();
            $table->string('apellido_materno')->nullable();
            $table->string('telefono')->nullable();
            $table->string('celular_1')->nullable();
            $table->string('celular_2')->nullable();
            $table->string('email')->unique()->nullable();
            $table->string('user')->unique();
            $table->string('password');
            $table->integer('tipo_usuario'); //1=superadmin, 2=super usuario, 3=admin app, 4=clinicas o medicos, 5=asociaciones, 6=propietarios
            $table->string('codigo_verificacion')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('usuarios');
    }
}
