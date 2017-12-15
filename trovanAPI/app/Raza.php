<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Raza extends Model
{
	/**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'razas';

    //public $timestamps = false;

    // Eloquent asume que cada tabla tiene una clave primaria con una columna llamada id.
    // Si éste no fuera el caso entonces hay que indicar cuál es nuestra clave primaria en la tabla:
    //protected $primaryKey = 'id';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['nombre_raza'];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = ['created_at','updated_at'];

	// Relación de raza con animales:
    public function animales()
    {
        // De una raza pueden existir varios animales
        return $this->hasMany('App\Animal', 'raza_id');
    }
}
