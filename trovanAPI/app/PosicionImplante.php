<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PosicionImplante extends Model
{
	/**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'posiciones_implantes';

    //public $timestamps = false;

    // Eloquent asume que cada tabla tiene una clave primaria con una columna llamada id.
    // Si éste no fuera el caso entonces hay que indicar cuál es nuestra clave primaria en la tabla:
    //protected $primaryKey = 'id';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['posicion'];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = ['created_at','updated_at'];

	// Relación de posiciones_implantes con animales:
    public function animales()
    {
        // Una posicion de implante puede estar relacionada con varios animales
        return $this->hasMany('App\Animal', 'posicion_implante_id');
    }
}
