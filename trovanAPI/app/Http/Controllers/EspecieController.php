<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class EspecieController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //cargar todas las especies
        $especies = \App\Especie::all();

        if(count($especies) == 0){
            return response()->json(['error'=>'No existen especies.'], 404);          
        }else{
            return response()->json(['status'=>'ok', 'especies'=>$especies], 200);
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
        if ( !$request->input('nombre_especie') )
        {
            // Se devuelve un array errors con los errores encontrados y cabecera HTTP 422 Unprocessable Entity – [Entidad improcesable] Utilizada para errores de validación.
            return response()->json(['error'=>'Faltan datos necesarios para el proceso de alta.'],422);
        } 

        //validar nombre_especie
        $aux1 = \App\Especie::where('nombre_especie', $request->input('nombre_especie'))->get();
        if(count($aux1)!=0){
           // Devolvemos un código 409 Conflict. 
            return response()->json(['error'=>'Ya existe una especie con el nombre '.$request->input('nombre_especie').'.'], 409);
        }

        //Creamos la nueva especie
        if($nuevaEspecie=\App\Especie::create($request->all())){
           return response()->json(['status'=>'ok', 'especie'=>$nuevaEspecie], 200);
        }else{
            return response()->json(['error'=>'Error al crear la especie.'], 500);
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
        //cargar una especie
        $especie = \App\Especie::find($id);

        if(count($especie)==0){
            return response()->json(['error'=>'No existe la especie con id '.$id], 404);          
        }else{

            return response()->json(['status'=>'ok', 'especie'=>$especie], 200);
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
        // Comprobamos si la especie que nos están pasando existe o no.
        $especie=\App\Especie::find($id);

        if (count($especie)==0)
        {
            // Devolvemos error codigo http 404
            return response()->json(['error'=>'No existe la especie con id '.$id], 404);
        } 

        // Listado de campos recibidos teóricamente.
        $nombre_especie=$request->input('nombre_especie');

        // Creamos una bandera para controlar si se ha modificado algún dato.
        $bandera = false;

        // Actualización parcial de campos.
        if ($nombre_especie != null && $nombre_especie!='')
        {
            $aux = \App\Especie::where('nombre_especie', $request->input('nombre_especie'))
            ->where('id', '<>', $especie->id)->get();

            if(count($aux)!=0){
               // Devolvemos un código 409 Conflict. 
                return response()->json(['error'=>'Ya existe una especie con el nombre '.$request->input('nombre_especie').'.'], 409);
            }

            $especie->nombre_especie = $nombre_especie;
            $bandera=true;
        } 

        if ($bandera)
        {
            // Almacenamos en la base de datos el registro.
            if ($especie->save()) {
                return response()->json(['status'=>'ok','especie'=>$especie], 200);
            }else{
                return response()->json(['error'=>'Error al actualizar la especie.'], 500);
            }
            
        }
        else
        {
            // Se devuelve un array errors con los errores encontrados y cabecera HTTP 304 Not Modified – [No Modificada] Usado cuando el cacheo de encabezados HTTP está activo
            // Este código 304 no devuelve ningún body, así que si quisiéramos que se mostrara el mensaje usaríamos un código 200 en su lugar.
            return response()->json(['error'=>'No se ha modificado ningún dato de la especie.'],200);
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
        // Comprobamos si la especie que nos están pasando existe o no.
        $especie=\App\Especie::find($id);

        if (count($especie)==0)
        {
            // Devolvemos error codigo http 404
            return response()->json(['error'=>'No existe la especie con id '.$id], 404);
        }

        $animales = $especie->animales;

        if (sizeof($animales) > 0)
        {
            // Devolvemos un código 409 Conflict. 
            return response()->json(['error'=>'Este especie no puede ser eliminada porque tiene animales asociados.'], 409);
        }

        // Eliminamos el especie.
        $especie->delete();

        return response()->json(['status'=>'ok', 'message'=>'Se ha eliminado correctamente la especie.'], 200);
    }
}
