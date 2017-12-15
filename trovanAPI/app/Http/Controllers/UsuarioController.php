<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
//use Illuminate\Support\Facades\DB;
use Hash;
use DB;

class UsuarioController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if ($request->input('tipo_usuario')) {

            //cargar todos los usuarios de un mismo tipo
            $usuarios = \App\User::where('tipo_usuario', $request->input('tipo_usuario'))->get();

            if(count($usuarios) == 0){
                return response()->json(['error'=>'No existen usuarios tipo '.$request->input('tipo_usuario').'.'], 404);          
            }else{
                return response()->json(['status'=>'ok', 'usuarios'=>$usuarios], 200);
            }
        }
        else{

            //cargar todos los usuarios
            $usuarios = \App\User::all();

            if(count($usuarios) == 0){
                return response()->json(['error'=>'No existen usuarios.'], 404);          
            }else{
                return response()->json(['status'=>'ok', 'usuarios'=>$usuarios], 200);
            }
        } 
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // Primero comprobaremos si estamos recibiendo todos los campos.
        //Estos campos son obligatorios para todos los tipos de usuarios.
        if ( !$request->input('user') || !$request->input('password') ||
            !$request->input('tipo_usuario'))
        {
            // Se devuelve un array errors con los errores encontrados y cabecera HTTP 422 Unprocessable Entity – [Entidad improcesable] Utilizada para errores de validación.
            return response()->json(['error'=>'Faltan datos necesarios para el proceso de alta.'],422);
        } 
        
        //validar nombre_asociacion
        if ($request->input('nombre_asociacion')) {
            $aux1 = \App\User::where('nombre_asociacion', $request->input('nombre_asociacion'))->get();
            if(count($aux1)!=0){
               // Devolvemos un código 409 Conflict. 
                return response()->json(['error'=>'Ya existe una asociación con el nombre '.$request->input('nombre_asociacion').'.'], 409);
            }
        }

        //validar matricula
        if ($request->input('matricula')) {
            $aux2 = \App\User::where('matricula', $request->input('matricula'))->get();
            if(count($aux2)!=0){
               // Devolvemos un código 409 Conflict. 
                return response()->json(['error'=>'Ya existe una clinica o medico veterinario con la matricula '.$request->input('matricula').'.'], 409);
            }
        }

        //validar matricula_rema
        if ($request->input('matricula_rema')) {
            $aux3 = \App\User::where('matricula_rema', $request->input('matricula_rema'))->get();
            if(count($aux3)!=0){
               // Devolvemos un código 409 Conflict. 
                return response()->json(['error'=>'Ya existe una asociación con la matricula rema '.$request->input('matricula_rema').'.'], 409);
            }
        }

        //validar ci
        if ($request->input('ci')) {
            $aux4 = \App\User::where('ci', $request->input('ci'))->get();
            if(count($aux4)!=0){
               // Devolvemos un código 409 Conflict. 
                return response()->json(['error'=>'Ya existe un usuario con la ci '.$request->input('ci').'.'], 409);
            }
        }

        //validar email
        if ($request->input('email')) {
            $aux5 = \App\User::where('email', $request->input('email'))->get();
            if(count($aux5)!=0){
               // Devolvemos un código 409 Conflict. 
                return response()->json(['error'=>'Ya existe un usuario con el email '.$request->input('email').'.'], 409);
            }
        }

        //validar user
        $aux6 = \App\User::where('user', $request->input('user'))->get();
        if(count($aux6)!=0){
           // Devolvemos un código 409 Conflict. 
            return response()->json(['error'=>'Ya existe un usuario con el user '.$request->input('user').'.'], 409);
        }

        /*Primero creo una instancia en la tabla usuarios*/
        $usuario = new \App\User;

        if ($request->input('nombre_asociacion')) {
            $usuario->nombre_asociacion = $request->input('nombre_asociacion');
        }
        if ($request->input('colegio_medico')) {
            $usuario->colegio_medico = $request->input('colegio_medico');
        }
        if ($request->input('matricula')) {
            $usuario->matricula = $request->input('matricula');
        }
        if ($request->input('matricula_rema')) {
            $usuario->matricula_rema = $request->input('matricula_rema');
        }
        if ($request->input('matricula_rema')) {
            $usuario->matricula_rema = $request->input('matricula_rema');
        }
        if ($request->input('ci')) {
            $usuario->ci = $request->input('ci');
        }
        if ($request->input('exp')) {
            $usuario->exp = $request->input('exp');
        }
        if ($request->input('direccion')) {
            $usuario->direccion = $request->input('direccion');
        }
        if ($request->input('ciudad')) {
            $usuario->ciudad = $request->input('ciudad');
        }
        if ($request->input('provincia')) {
            $usuario->provincia = $request->input('provincia');
        }
        if ($request->input('nombre')) {
            $usuario->nombre = $request->input('nombre');
        }
        if ($request->input('apellido_paterno')) {
            $usuario->apellido_paterno = $request->input('apellido_paterno');
        }
        if ($request->input('apellido_materno')) {
            $usuario->apellido_materno = $request->input('apellido_materno');
        }
        if ($request->input('telefono')) {
            $usuario->telefono = $request->input('telefono');
        }
        if ($request->input('celular_1')) {
            $usuario->celular_1 = $request->input('celular_1');
        }
        if ($request->input('celular_2')) {
            $usuario->celular_2 = $request->input('celular_2');
        }
        if ($request->input('email')) {
            $usuario->email = $request->input('email');
        }

        $usuario->user = $request->input('user');
        $usuario->password = Hash::make($request->input('password'));
        $usuario->tipo_usuario = $request->input('tipo_usuario');

        if($usuario->save()){
           return response()->json(['status'=>'ok', 'usuario'=>$usuario], 200);
        }else{
            return response()->json(['error'=>'Error al crear el usuario.'], 500);
        }

        /*$request->password = Hash::make($request->input('password'));

        if($nuevoUsuario=\App\User::create($request->all())){
           return response()->json(['status'=>'ok', 'usuario'=>$nuevoUsuario], 200);
        }else{
            return response()->json(['error'=>'Error al crear el usuario.'], 500);
        } */
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //cargar un usuario
        $usuario = \App\User::find($id);

        if(count($usuario)==0){
            return response()->json(['error'=>'No existe el usuario con id '.$id], 404);          
        }else{

            return response()->json(['status'=>'ok', 'usuario'=>$usuario], 200);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        // Comprobamos si el usuario que nos están pasando existe o no.
        $usuario=\App\User::find($id);

        if (count($usuario)==0)
        {
            // Devolvemos error codigo http 404
            return response()->json(['error'=>'No existe el usuario con id '.$id], 404);
        } 

        // Listado de campos recibidos teóricamente.
        $nombre_asociacion=$request->input('nombre_asociacion'); 
        $colegio_medico=$request->input('colegio_medico'); 
        $matricula=$request->input('matricula'); 
        $matricula_rema=$request->input('matricula_rema');
        $ci=$request->input('ci');
        $exp=$request->input('exp');
        $direccion=$request->input('direccion'); 
        $ciudad=$request->input('ciudad'); 
        $provincia=$request->input('provincia'); 
        $nombre=$request->input('nombre');
        $apellido_paterno=$request->input('apellido_paterno'); 
        $apellido_materno=$request->input('apellido_materno'); 
        $telefono=$request->input('telefono'); 
        $celular_1=$request->input('celular_1');
        $celular_2=$request->input('celular_2');
        $email=$request->input('email');
        $user=$request->input('user'); 
        $password=$request->input('password'); 
        $tipo_usuario=$request->input('tipo_usuario'); 

        // Creamos una bandera para controlar si se ha modificado algún dato.
        $bandera = false;

        // Actualización parcial de campos.
        if ($nombre_asociacion != null && $nombre_asociacion!='')
        {
            $aux = \App\User::where('nombre_asociacion', $request->input('nombre_asociacion'))
            ->where('id', '<>', $usuario->id)->get();

            if(count($aux)!=0){
               // Devolvemos un código 409 Conflict. 
                return response()->json(['error'=>'Ya existe una asociación con el nombre '.$request->input('nombre_asociacion').'.'], 409);
            }

            $usuario->nombre_asociacion = $nombre_asociacion;
            $bandera=true;
        }

        if ($colegio_medico != null && $colegio_medico!='')
        {
            $usuario->colegio_medico = $colegio_medico;
            $bandera=true;
        }

        if ($matricula != null && $matricula!='')
        {
            $aux = \App\User::where('matricula', $request->input('matricula'))
            ->where('id', '<>', $usuario->id)->get();

            if(count($aux)!=0){
               // Devolvemos un código 409 Conflict. 
                return response()->json(['error'=>'Ya existe una clinica o medico veterinario con la matricula '.$request->input('matricula').'.'], 409);
            }

            $usuario->matricula = $matricula;
            $bandera=true;
        }

        if ($matricula_rema != null && $matricula_rema!='')
        {
            $aux = \App\User::where('matricula_rema', $request->input('matricula_rema'))
            ->where('id', '<>', $usuario->id)->get();

            if(count($aux)!=0){
               // Devolvemos un código 409 Conflict. 
                return response()->json(['error'=>'Ya existe una asociación con la matricula rema '.$request->input('matricula_rema').'.'], 409);
            }

            $usuario->matricula_rema = $matricula_rema;
            $bandera=true;
        }

        if ($ci != null && $ci!='')
        {
            $aux = \App\User::where('ci', $request->input('ci'))
            ->where('id', '<>', $usuario->id)->get();

            if(count($aux)!=0){
               // Devolvemos un código 409 Conflict. 
                return response()->json(['error'=>'Ya existe un usuario con la ci '.$request->input('ci').'.'], 409);
            }

            $usuario->ci = $ci;
            $bandera=true;
        }

        if ($exp != null && $exp!='')
        {
            $usuario->exp = $exp;
            $bandera=true;
        }

        if ($direccion != null && $direccion!='')
        {
            $usuario->direccion = $direccion;
            $bandera=true;
        }

        if ($ciudad != null && $ciudad!='')
        {
            $usuario->ciudad = $ciudad;
            $bandera=true;
        }

        if ($provincia != null && $provincia!='')
        {
            $usuario->provincia = $provincia;
            $bandera=true;
        }

        if ($nombre != null && $nombre!='')
        {
            $usuario->nombre = $nombre;
            $bandera=true;
        }

        if ($apellido_paterno != null && $apellido_paterno!='')
        {
            $usuario->apellido_paterno = $apellido_paterno;
            $bandera=true;
        }

        if ($apellido_materno != null && $apellido_materno!='')
        {
            $usuario->apellido_materno = $apellido_materno;
            $bandera=true;
        }

        if ($telefono != null && $telefono!='')
        {
            $usuario->telefono = $telefono;
            $bandera=true;
        }

        if ($celular_1 != null && $celular_1!='')
        {
            $usuario->celular_1 = $celular_1;
            $bandera=true;
        }

        if ($celular_2 != null && $celular_2!='')
        {
            $usuario->celular_2 = $celular_2;
            $bandera=true;
        }

        if ($email != null && $email!='')
        {
            $aux = \App\User::where('email', $request->input('email'))
            ->where('id', '<>', $usuario->id)->get();

            if(count($aux)!=0){
               // Devolvemos un código 409 Conflict. 
                return response()->json(['error'=>'Ya existe un usuario con el email '.$request->input('email').'.'], 409);
            }

            $usuario->email = $email;
            $bandera=true;
        }

        if ($user != null && $user!='')
        {
            $aux = \App\User::where('user', $request->input('user'))
            ->where('id', '<>', $usuario->id)->get();

            if(count($aux)!=0){
               // Devolvemos un código 409 Conflict. 
                return response()->json(['error'=>'Ya existe un usuario con el user '.$request->input('user').'.'], 409);
            }

            $usuario->user = $user;
            $bandera=true;
        }

        if ($password != null && $password!='')
        {
            $usuario->password = Hash::make($request->input('password'));
            $bandera=true;
        }

        if ($tipo_usuario != null && $tipo_usuario!='')
        {
            // Devolvemos un código 409 Conflict. 
            return response()->json(['error'=>'No se permite cambiar el tipo de usuario.'], 409);
        }

        if ($bandera)
        {
            // Almacenamos en la base de datos el registro.
            if ($usuario->save()) {
                return response()->json(['status'=>'ok','usuario'=>$usuario], 200);
            }else{
                return response()->json(['error'=>'Error al actualizar el usuario.'], 500);
            }
            
        }
        else
        {
            // Se devuelve un array errors con los errores encontrados y cabecera HTTP 304 Not Modified – [No Modificada] Usado cuando el cacheo de encabezados HTTP está activo
            // Este código 304 no devuelve ningún body, así que si quisiéramos que se mostrara el mensaje usaríamos un código 200 en su lugar.
            return response()->json(['error'=>'No se ha modificado ningún dato del usuario.'],200);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        // Comprobamos si el usuario que nos están pasando existe o no.
        $usuario=\App\User::find($id);

        if (count($usuario)==0)
        {
            // Devolvemos error codigo http 404
            return response()->json(['error'=>'No existe el usuario con id '.$id], 404);
        }

        $mascotas = $usuario->mascotas;

        if (sizeof($mascotas) > 0)
        {
            // Devolvemos un código 409 Conflict. 
            return response()->json(['error'=>'Este usuario no puede ser eliminado porque tiene mascotas asociadas.'], 409);
        }

        $pacientes = $usuario->pacientes;

        if (sizeof($pacientes) > 0)
        {
            // Devolvemos un código 409 Conflict. 
            return response()->json(['error'=>'Este usuario no puede ser eliminado porque tiene pacientes asociados.'], 409);
        }

        // Eliminamos el usuario.
        $usuario->delete();

        return response()->json(['status'=>'ok', 'message'=>'Se ha eliminado correctamente el usuario.'], 200);
    }
}
