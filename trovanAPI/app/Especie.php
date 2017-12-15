<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Especie extends Model
{
	/**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'especies';

    //public $timestamps = false;

    // Eloquent asume que cada tabla tiene una clave primaria con una columna llamada id.
    // Si éste no fuera el caso entonces hay que indicar cuál es nuestra clave primaria en la tabla:
    //protected $primaryKey = 'id';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['nombre_especie'];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = ['created_at','updated_at'];

	// Relación de especie con animales:
    public function animales()
    {
        // De una especie pueden existir varios animales
        return $this->hasMany('App\Animal', 'especie_id');
    }
}
