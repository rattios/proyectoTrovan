<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class PosicionImplanteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //cargar todas las posiciones de los implantes
        $posImplantes = \App\PosicionImplante::all();

        if(count($posImplantes) == 0){
            return response()->json(['error'=>'No existen posiciones de implantes.'], 404);          
        }else{
            return response()->json(['status'=>'ok', 'posImplantes'=>$posImplantes], 200);
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
        if ( !$request->input('posicion') )
        {
            // Se devuelve un array errors con los errores encontrados y cabecera HTTP 422 Unprocessable Entity – [Entidad improcesable] Utilizada para errores de validación.
            return response()->json(['error'=>'Faltan datos necesarios para el proceso de alta.'],422);
        } 

        //validar posicion
        $aux1 = \App\PosicionImplante::where('posicion', $request->input('posicion'))->get();
        if(count($aux1)!=0){
           // Devolvemos un código 409 Conflict. 
            return response()->json(['error'=>'Ya existe una posición de implante con el nombre '.$request->input('posicion').'.'], 409);
        }

        //Creamos la nueva posicion
        if($posImplante=\App\PosicionImplante::create($request->all())){
           return response()->json(['status'=>'ok', 'posImplante'=>$posImplante], 200);
        }else{
            return response()->json(['error'=>'Error al crear la posición de implante.'], 500);
        }

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //cargar una posicion
        $posImplante = \App\PosicionImplante::find($id);

        if(count($posImplante)==0){
            return response()->json(['error'=>'No existe la posición de implante con id '.$id], 404);          
        }else{

            return response()->json(['status'=>'ok', 'posImplante'=>$posImplante], 200);
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
        // Comprobamos si la posImplante que nos están pasando existe o no.
        $posImplante=\App\PosicionImplante::find($id);

        if (count($posImplante)==0)
        {
            // Devolvemos error codigo http 404
            return response()->json(['error'=>'No existe la posición de implante con id '.$id], 404);
        } 

        // Listado de campos recibidos teóricamente.
        $posicion=$request->input('posicion');

        // Creamos una bandera para controlar si se ha modificado algún dato.
        $bandera = false;

        // Actualización parcial de campos.
        if ($posicion != null && $posicion!='')
        {
            $aux = \App\PosicionImplante::where('posicion', $request->input('posicion'))
            ->where('id', '<>', $posImplante->id)->get();

            if(count($aux)!=0){
               // Devolvemos un código 409 Conflict. 
                return response()->json(['error'=>'Ya existe una posición de implante con el nombre '.$request->input('posicion').'.'], 409);
            }

            $posImplante->posicion = $posicion;
            $bandera=true;
        } 

        if ($bandera)
        {
            // Almacenamos en la base de datos el registro.
            if ($posImplante->save()) {
                return response()->json(['status'=>'ok','posImplante'=>$posImplante], 200);
            }else{
                return response()->json(['error'=>'Error al actualizar la posición de implante.'], 500);
            }
            
        }
        else
        {
            // Se devuelve un array errors con los errores encontrados y cabecera HTTP 304 Not Modified – [No Modificada] Usado cuando el cacheo de encabezados HTTP está activo
            // Este código 304 no devuelve ningún body, así que si quisiéramos que se mostrara el mensaje usaríamos un código 200 en su lugar.
            return response()->json(['error'=>'No se ha modificado ningún dato de la posición de implante.'],200);
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
        // Comprobamos si la vacuna que nos están pasando existe o no.
        $vacuna=\App\PosicionImplante::find($id);

        if (count($vacuna)==0)
        {
            // Devolvemos error codigo http 404
            return response()->json(['error'=>'No existe la vacuna con id '.$id], 404);
        }

        $animales = $vacuna->animales;

        if (sizeof($animales) > 0)
        {
            // Devolvemos un código 409 Conflict. 
            return response()->json(['error'=>'Este vacuna no puede ser eliminada porque tiene animales asociados.'], 409);
        }

        // Eliminamos el vacuna.
        $vacuna->delete();

        return response()->json(['status'=>'ok', 'message'=>'Se ha eliminado correctamente la vacuna.'], 200);
    }
}
