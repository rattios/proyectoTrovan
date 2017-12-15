<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TipoVacuna extends Model
{
	/**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'tipos_vacunas';

    //public $timestamps = false;

    // Eloquent asume que cada tabla tiene una clave primaria con una columna llamada id.
    // Si éste no fuera el caso entonces hay que indicar cuál es nuestra clave primaria en la tabla:
    //protected $primaryKey = 'id';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['nombre_vacuna'];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = ['created_at','updated_at'];

	// Relación de tipos_vacunas con animales:
    public function animales()
    {
        // Un tipo de vacuna puede estar asociada como ultima vacuna de varios animales
        return $this->hasMany('App\Animal', 'ultima_vacuna_id');
    }
}
