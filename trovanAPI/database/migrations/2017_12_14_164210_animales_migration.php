<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AnimalesMigration extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('animales', function (Blueprint $table) {
            $table->increments('id');
            $table->text('foto')->nullable();

            $table->integer('propietario_id')->unsigned();
            $table->foreign('propietario_id')->references('id')->on('usuarios');

            $table->integer('veterinario_id')->unsigned();
            $table->foreign('veterinario_id')->references('id')->on('usuarios');

            $table->string('nombre_animal');
            $table->date('f_nacimiento');
            $table->integer('edad');

            $table->integer('especie_id')->unsigned();
            $table->foreign('especie_id')->references('id')->on('especies');

            $table->string('genero'); //MACHO-HEMBRA

            $table->integer('raza_id')->unsigned();
            $table->foreign('raza_id')->references('id')->on('razas');

            $table->float('peso'); //(Kg)
            $table->float('altura'); //(Cm)
            $table->string('pelaje');
            $table->string('color_ojos');
            $table->text('temperamento');
            $table->string('tatuaje'); //SI-NO
            $table->string('pediegree');
            $table->string('esterilizado'); //SI-NO

            /*$table->integer('ultima_vacuna_id')->unsigned()->nullable();
            $table->foreign('ultima_vacuna_id')->references('id')->on('tipos_vacunas');*/
            $table->date('f_ult_vacuna')->nullable();
            $table->string('cod_ult_vacuna')->nullable();
            $table->string('tipo_ult_vacuna')->nullable();
            $table->string('marca_ult_vacuna')->nullable();
            $table->string('origen_ult_vacuna')->nullable();

            $table->string('microchip')->unique();
            $table->string('tipo_microchip'); // Trovan Unique (10 DIGITOS) - Trovan Personalizado (15 DIGITOS)

            //$table->text('posicion_implante');
            $table->integer('posicion_implante_id')->unsigned();
            $table->foreign('posicion_implante_id')->references('id')->on('posiciones_implantes');

            $table->text('otros_rasgos')->nullable();

            $table->integer('madre_id')->unsigned()->nullable();
            $table->foreign('madre_id')->references('id')->on('animales');

            $table->integer('padre_id')->unsigned()->nullable();
            $table->foreign('padre_id')->references('id')->on('animales');



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
        Schema::drop('animales');
    }
}
