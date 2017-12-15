<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class RazaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //cargar todas las razas
        $razas = \App\Raza::all();

        if(count($razas) == 0){
            return response()->json(['error'=>'No existen razas.'], 404);          
        }else{
            return response()->json(['status'=>'ok', 'razas'=>$razas], 200);
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
        if ( !$request->input('nombre_raza') )
        {
            // Se devuelve un array errors con los errores encontrados y cabecera HTTP 422 Unprocessable Entity – [Entidad improcesable] Utilizada para errores de validación.
            return response()->json(['error'=>'Faltan datos necesarios para el proceso de alta.'],422);
        } 

        //validar nombre_raza
        $aux1 = \App\Raza::where('nombre_raza', $request->input('nombre_raza'))->get();
        if(count($aux1)!=0){
           // Devolvemos un código 409 Conflict. 
            return response()->json(['error'=>'Ya existe una raza con el nombre '.$request->input('nombre_raza').'.'], 409);
        }

        //Creamos la nueva raza
        if($nuevaraza=\App\Raza::create($request->all())){
           return response()->json(['status'=>'ok', 'raza'=>$nuevaraza], 200);
        }else{
            return response()->json(['error'=>'Error al crear la raza.'], 500);
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
        //cargar una raza
        $raza = \App\Raza::find($id);

        if(count($raza)==0){
            return response()->json(['error'=>'No existe la raza con id '.$id], 404);          
        }else{

            return response()->json(['status'=>'ok', 'raza'=>$raza], 200);
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
        // Comprobamos si la raza que nos están pasando existe o no.
        $raza=\App\Raza::find($id);

        if (count($raza)==0)
        {
            // Devolvemos error codigo http 404
            return response()->json(['error'=>'No existe la raza con id '.$id], 404);
        } 

        // Listado de campos recibidos teóricamente.
        $nombre_raza=$request->input('nombre_raza');

        // Creamos una bandera para controlar si se ha modificado algún dato.
        $bandera = false;

        // Actualización parcial de campos.
        if ($nombre_raza != null && $nombre_raza!='')
        {
            $aux = \App\Raza::where('nombre_raza', $request->input('nombre_raza'))
            ->where('id', '<>', $raza->id)->get();

            if(count($aux)!=0){
               // Devolvemos un código 409 Conflict. 
                return response()->json(['error'=>'Ya existe una raza con el nombre '.$request->input('nombre_raza').'.'], 409);
            }

            $raza->nombre_raza = $nombre_raza;
            $bandera=true;
        } 

        if ($bandera)
        {
            // Almacenamos en la base de datos el registro.
            if ($raza->save()) {
                return response()->json(['status'=>'ok','raza'=>$raza], 200);
            }else{
                return response()->json(['error'=>'Error al actualizar la raza.'], 500);
            }
            
        }
        else
        {
            // Se devuelve un array errors con los errores encontrados y cabecera HTTP 304 Not Modified – [No Modificada] Usado cuando el cacheo de encabezados HTTP está activo
            // Este código 304 no devuelve ningún body, así que si quisiéramos que se mostrara el mensaje usaríamos un código 200 en su lugar.
            return response()->json(['error'=>'No se ha modificado ningún dato de la raza.'],200);
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
        // Comprobamos si la raza que nos están pasando existe o no.
        $raza=\App\Raza::find($id);

        if (count($raza)==0)
        {
            // Devolvemos error codigo http 404
            return response()->json(['error'=>'No existe la raza con id '.$id], 404);
        }

        $animales = $raza->animales;

        if (sizeof($animales) > 0)
        {
            // Devolvemos un código 409 Conflict. 
            return response()->json(['error'=>'Este raza no puede ser eliminada porque tiene animales asociados.'], 409);
        }

        // Eliminamos el raza.
        $raza->delete();

        return response()->json(['status'=>'ok', 'message'=>'Se ha eliminado correctamente la raza.'], 200);
    }
}
