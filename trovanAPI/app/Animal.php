<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Animal extends Model
{
	/**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'animales';

    //public $timestamps = false;

    // Eloquent asume que cada tabla tiene una clave primaria con una columna llamada id.
    // Si éste no fuera el caso entonces hay que indicar cuál es nuestra clave primaria en la tabla:
    //protected $primaryKey = 'id';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['foto', 'propietario_id', 'veterinario_id',
		'nombre_animal', 'f_nacimiento', 'edad',
		'especie_id', 'genero', 'raza_id',
		'peso', 'altura', 'pelaje',
		'color_ojos', 'temperamento', 'tatuaje',
		'pediegree', 'esterilizado', 'ultima_vacuna_id',
		'microchip', 'posicion_implante', 'otros_rasgos',
		'madre_id', 'padre_id'];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    //protected $hidden = [];

    // Relación de animal con usuario:
	public function propietario()
	{
		// 1 animal pertenece a un usuario(propietario)
		return $this->belongsTo('App\User', 'propietario_id');
	}

	// Relación de animal con usuario:
	public function veterinario()
	{
		// 1 animal tiene un usuario(veterinario)
		return $this->belongsTo('App\User', 'veterinario_id');
	}

	// Relación de animal con especie:
	public function especie()
	{
		// 1 animal pertenece a una especie
		return $this->belongsTo('App\Especie', 'especie_id');
	}

	// Relación de animal con raza:
	public function raza()
	{
		// 1 animal pertenece a una raza
		return $this->belongsTo('App\Raza', 'raza_id');
	}

	// Relación de animal con tipo_vacuna:
	public function ultima_vacuna()
	{
		// 1 animal tiene una ultima vacuna
		return $this->belongsTo('App\TipoVacuna', 'ultima_vacuna_id');
	}

	// Relación de animal con animal:
	public function madre()
	{
		// 1 animal puede tener una madre
		return $this->belongsTo('App\Animal', 'madre_id');
	}

	// Relación de animal con animal:
	public function padre()
	{
		// 1 animal puede tener un padre
		return $this->belongsTo('App\Animal', 'padre_id');
	}

}
