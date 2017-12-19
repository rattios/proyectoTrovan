<?php

namespace App;

use Illuminate\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Foundation\Auth\Access\Authorizable;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;

class User extends Model implements AuthenticatableContract,
                                    AuthorizableContract,
                                    CanResetPasswordContract
{
    use Authenticatable, Authorizable, CanResetPassword;
        /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'usuarios';

    // Eloquent asume que cada tabla tiene una clave primaria con una columna llamada id.
    // Si éste no fuera el caso entonces hay que indicar cuál es nuestra clave primaria en la tabla:
    //protected $primaryKey = 'id';

    //public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['nombre_asociacion', 'colegio_medico', 'matricula',
        'matricula_rema', 'ci', 'exp',
        'ciudad', 'provincia',
        'direccion_tipo', 'municipio', 'zona',
        'av', 'calle', 'nro',
        'barrio', 'mz', 'uv',
        'cargo',
        'nombre', 'apellido_paterno', 'apellido_materno',
        'telefono', 'celular_1', 'celular_2',
        'email', 'user', 'password',
        'tipo_usuario', 'codigo_verificacion'];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = ['password'];

    // Relación de usuario(propietario) con animales:
    public function mascotas()
    {
        // Una usuario puede tener muchas mascotas(animales)
        return $this->hasMany('App\Animal', 'propietario_id');
    }

    // Relación de usuario(veterinario) con animales:
    public function pacientes()
    {
        // Una usuario puede tener muchos pacientes(animales)
        return $this->hasMany('App\Animal', 'veterinario_id');
    }
}
