<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class AnimalController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //cargar todos los animales
        $animales = \App\Animal::with('propietario')->with('veterinario')
            ->with('especie')->with('raza')->with('posicion_implante')
            ->with('madre')->with('padre')->get();

        if(count($animales) == 0){
            return response()->json(['error'=>'No existen animales.'], 404);          
        }else{
            return response()->json(['status'=>'ok', 'animales'=>$animales], 200);
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
        if ( !$request->input('propietario_id') || !$request->input('veterinario_id') ||
             !$request->input('nombre_animal') || !$request->input('f_nacimiento') ||
             !$request->input('edad') || !$request->input('especie_id') ||
             !$request->input('genero') || !$request->input('raza_id') ||
             !$request->input('peso') || !$request->input('altura') ||
             !$request->input('pelaje') || !$request->input('color_ojos') ||
             !$request->input('temperamento') || !$request->input('tatuaje') ||
             !$request->input('pediegree') || !$request->input('esterilizado') ||
             !$request->input('microchip') || !$request->input('posicion_implante_id')
        )
        {
            // Se devuelve un array errors con los errores encontrados y cabecera HTTP 422 Unprocessable Entity – [Entidad improcesable] Utilizada para errores de validación.
            return response()->json(['error'=>'Faltan datos necesarios para el proceso de alta.'],422);
        }

        //validadciones
        $aux1 = \App\User::where('id', $request->input('propietario_id'))
            ->where('tipo_usuario', 6)->get();
        if(count($aux1)==0){
           // Devolvemos un código 409 Conflict. 
            return response()->json(['error'=>'No existe el propietario que se quiere asociar al animal.'], 409);
        }

        $aux2 = \App\User::where('id', $request->input('veterinario_id'))
            ->where('tipo_usuario', 4)->get();
        if(count($aux2)==0){
           // Devolvemos un código 409 Conflict. 
            return response()->json(['error'=>'No existe el veterinario que se quiere asociar al animal.'], 409);
        }

        $aux3 = \App\Especie::where('id', $request->input('especie_id'))->get();
        if(count($aux3)==0){
           // Devolvemos un código 409 Conflict. 
            return response()->json(['error'=>'No existe la especie que se quiere asociar al animal.'], 409);
        }

        $aux4 = \App\Raza::where('id', $request->input('raza_id'))->get();
        if(count($aux4)==0){
           // Devolvemos un código 409 Conflict. 
            return response()->json(['error'=>'No existe la raza que se quiere asociar al animal.'], 409);
        }

        /*$aux5 = \App\TipoVacuna::where('id', $request->input('ultima_vacuna_id'))->get();
        if(count($aux5)==0){
           // Devolvemos un código 409 Conflict. 
            return response()->json(['error'=>'No existe el tipo de ultima vacuna que se quiere asociar al animal.'], 409);
        }*/

        $aux6 = \App\Animal::where('microchip', $request->input('microchip'))->get();
        if(count($aux6)!=0){
           // Devolvemos un código 409 Conflict. 
            return response()->json(['error'=>'Ya esxite otro animal con el microchip '.$request->input('microchip').'.'], 409);
        }

        if ($request->input('madre_id')) {
            $aux7 = \App\Animal::where('id', $request->input('madre_id'))
                ->where('genero', 'HEMBRA')->get();
            if(count($aux7)==0){
               // Devolvemos un código 409 Conflict. 
                return response()->json(['error'=>'No existe la madre que se quiere asociar al animal.'], 409);
            }
        }

        if ($request->input('padre_id')) {
            $aux8 = \App\Animal::where('id', $request->input('padre_id'))
                ->where('genero', 'MACHO')->get();
            if(count($aux8)==0){
               // Devolvemos un código 409 Conflict. 
                return response()->json(['error'=>'No existe el padre que se quiere asociar al animal.'], 409);
            }
        }

        $aux9 = \App\PosicionImplante::where('id', $request->input('posicion_implante_id'))
            ->get();
        if(count($aux9)==0){
           // Devolvemos un código 409 Conflict. 
            return response()->json(['error'=>'No existe la posicion del implante que se quiere asociar al animal.'], 409);
        }


        //Creamos el nuevo animal
        if($nuevoAnimal=\App\Animal::create($request->all())){
           return response()->json(['status'=>'ok', 'animal'=>$nuevoAnimal], 200);
        }else{
            return response()->json(['error'=>'Error al crear el animal.'], 500);
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
        //cargar un animal
        $animal = \App\Animal::with('propietario')->with('veterinario')
            ->with('especie')->with('raza')->with('posicion_implante')
            ->with('madre')->with('padre')->find($id);

        if(count($animal)==0){
            return response()->json(['error'=>'No existe el animal con id '.$id], 404);          
        }else{
            return response()->json(['status'=>'ok', 'animal'=>$animal], 200);
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
        // Comprobamos si el animal que nos están pasando existe o no.
        $animal=\App\Animal::find($id);

        if (count($animal)==0)
        {
            // Devolvemos error codigo http 404
            return response()->json(['error'=>'No existe el animal con id '.$id], 404);
        } 

        // Listado de campos recibidos teóricamente.
        $foto=$request->input('foto'); 
        $propietario_id=$request->input('propietario_id'); 
        $veterinario_id=$request->input('veterinario_id'); 
        $nombre_animal=$request->input('nombre_animal');
        $f_nacimiento=$request->input('f_nacimiento');
        $edad=$request->input('edad');
        $especie_id=$request->input('especie_id'); 
        $genero=$request->input('genero'); 
        $raza_id=$request->input('raza_id'); 
        $peso=$request->input('peso');
        $altura=$request->input('altura'); 
        $pelaje=$request->input('pelaje'); 
        $color_ojos=$request->input('color_ojos'); 
        $temperamento=$request->input('temperamento');
        $tatuaje=$request->input('tatuaje');
        $pediegree=$request->input('pediegree');
        $esterilizado=$request->input('esterilizado'); 
        //$ultima_vacuna_id=$request->input('ultima_vacuna_id'); 
        $f_ult_vacuna=$request->input('f_ult_vacuna');
        $cod_ult_vacuna=$request->input('cod_ult_vacuna');
        $tipo_ult_vacuna=$request->input('tipo_ult_vacuna');
        $marca_ult_vacuna=$request->input('marca_ult_vacuna');
        $origen_ult_vacuna=$request->input('origen_ult_vacuna');
        $microchip=$request->input('microchip'); 
        //$posicion_implante=$request->input('posicion_implante');
        $posicion_implante_id=$request->input('posicion_implante_id');
        $otros_rasgos=$request->input('otros_rasgos'); 
        $madre_id=$request->input('madre_id'); 
        $padre_id=$request->input('padre_id'); 

        // Creamos una bandera para controlar si se ha modificado algún dato.
        $bandera = false;

        // Actualización parcial de campos.
        if ($foto != null && $foto!='')
        {
            $animal->foto = $foto;
            $bandera=true;
        }

        if ($propietario_id != null && $propietario_id!='')
        {
            $aux = \App\User::where('propietario_id', $request->input('propietario_id'))->get();

            if(count($aux)==0){
               // Devolvemos un código 409 Conflict. 
                return response()->json(['error'=>'No existe el propietario que se quiere asociar al animal'], 409);
            }

            $animal->propietario_id = $propietario_id;
            $bandera=true;
        }

        if ($veterinario_id != null && $veterinario_id!='')
        {
            $aux = \App\User::where('veterinario_id', $request->input('veterinario_id'))->get();

            if(count($aux)==0){
               // Devolvemos un código 409 Conflict. 
                return response()->json(['error'=>'No existe el veterinario que se quiere asociar al animal'], 409);
            }

            $animal->veterinario_id = $veterinario_id;
            $bandera=true;
        }

        if ($nombre_animal != null && $nombre_animal!='')
        {
            $animal->nombre_animal = $nombre_animal;
            $bandera=true;
        }

        if ($f_nacimiento != null && $f_nacimiento!='')
        {
            $animal->f_nacimiento = $f_nacimiento;
            $bandera=true;
        }

        if ($edad != null && $edad!='')
        {
            $animal->edad = $edad;
            $bandera=true;
        }

        if ($especie_id != null && $especie_id!='')
        {
            $aux = \App\Especie::where('especie_id', $request->input('especie_id'))->get();

            if(count($aux)==0){
               // Devolvemos un código 409 Conflict. 
                return response()->json(['error'=>'No existe la especie que se quiere asociar al animal'], 409);
            }

            $animal->especie_id = $especie_id;
            $bandera=true;
        }

        if ($genero != null && $genero!='')
        {
            $animal->genero = $genero;
            $bandera=true;
        }

        if ($raza_id != null && $raza_id!='')
        {
            $aux = \App\Especie::where('raza_id', $request->input('raza_id'))->get();

            if(count($aux)==0){
               // Devolvemos un código 409 Conflict. 
                return response()->json(['error'=>'No existe la raza que se quiere asociar al animal'], 409);
            }

            $animal->raza_id = $raza_id;
            $bandera=true;
        }

        if ($peso != null && $peso!='')
        {
            $animal->peso = $peso;
            $bandera=true;
        }

        if ($altura != null && $altura!='')
        {
            $animal->altura = $altura;
            $bandera=true;
        }

        if ($pelaje != null && $pelaje!='')
        {
            $animal->pelaje = $pelaje;
            $bandera=true;
        }

        if ($color_ojos != null && $color_ojos!='')
        {
            $animal->color_ojos = $color_ojos;
            $bandera=true;
        }

        if ($temperamento != null && $temperamento!='')
        {
            $animal->temperamento = $temperamento;
            $bandera=true;
        }

        if ($tatuaje != null && $tatuaje!='')
        {
            $animal->tatuaje = $tatuaje;
            $bandera=true;
        }

        if ($pediegree != null && $pediegree!='')
        {
            $animal->pediegree = $pediegree;
            $bandera=true;
        }

        if ($esterilizado != null && $esterilizado!='')
        {
            $animal->esterilizado = $esterilizado;
            $bandera=true;
        }

        /*if ($ultima_vacuna_id != null && $ultima_vacuna_id!='')
        {
            $aux = \App\TipoVacuna::where('ultima_vacuna_id', $request->input('ultima_vacuna_id'))->get();

            if(count($aux)==0){
               // Devolvemos un código 409 Conflict. 
                return response()->json(['error'=>'No existe el tipo de ultima vacuna que se quiere asociar al animal'], 409);
            }

            $animal->ultima_vacuna_id = $ultima_vacuna_id;
            $bandera=true;
        }*/

        if ($f_ult_vacuna != null && $f_ult_vacuna!='')
        {
            $animal->f_ult_vacuna = $f_ult_vacuna;
            $bandera=true;
        }

        if ($cod_ult_vacuna != null && $cod_ult_vacuna!='')
        {
            $animal->cod_ult_vacuna = $cod_ult_vacuna;
            $bandera=true;
        }

        if ($tipo_ult_vacuna != null && $tipo_ult_vacuna!='')
        {
            $animal->tipo_ult_vacuna = $tipo_ult_vacuna;
            $bandera=true;
        }

        if ($marca_ult_vacuna != null && $marca_ult_vacuna!='')
        {
            $animal->marca_ult_vacuna = $marca_ult_vacuna;
            $bandera=true;
        }

        if ($origen_ult_vacuna != null && $origen_ult_vacuna!='')
        {
            $animal->origen_ult_vacuna = $origen_ult_vacuna;
            $bandera=true;
        }

        if ($microchip != null && $microchip!='')
        {
            $aux = \App\Animal::where('microchip', $request->input('microchip'))
                ->where('id', '<>', $animal->id)->get();

            if(count($aux)!=0){
               // Devolvemos un código 409 Conflict. 
                return response()->json(['error'=>'Ya esxite otro animal con el microchip '.$request->input('microchip').'.'], 409);
            }

            $animal->microchip = $microchip;
            $bandera=true;
        }

        /*if ($posicion_implante != null && $posicion_implante!='')
        {
            $animal->posicion_implante = $posicion_implante;
            $bandera=true;
        }*/

        if ($posicion_implante_id != null && $posicion_implante_id!='')
        {
            $aux = \App\PosicionImplante::where('id', $request->input('posicion_implante_id'))
                ->get();

            if(count($aux)==0){
               // Devolvemos un código 409 Conflict. 
                return response()->json(['error'=>'No existe la posicion del implante que se quiere asociar al animal.'], 409);
            }

            $animal->posicion_implante_id = $posicion_implante_id;
            $bandera=true;
        }

        if ($otros_rasgos != null && $otros_rasgos!='')
        {
            $animal->otros_rasgos = $otros_rasgos;
            $bandera=true;
        }

        if ($madre_id != null && $madre_id!='')
        {
            $aux = \App\Animal::where('id', $request->input('madre_id'))
                ->where('genero', 'HEMBRA')
                ->where('id', '<>', $animal->id)->get();

            if(count($aux)==0){
               // Devolvemos un código 409 Conflict. 
                return response()->json(['error'=>'No existe la madre que se quiere asociar al animal.'], 409);
            }

            $animal->madre_id = $madre_id;
            $bandera=true;
        }

        if ($padre_id != null && $padre_id!='')
        {
            $aux = \App\Animal::where('id', $request->input('padre_id'))
                ->where('genero', 'MACHO')
                ->where('id', '<>', $animal->id)->get();

            if(count($aux)==0){
               // Devolvemos un código 409 Conflict. 
                return response()->json(['error'=>'No existe el padre que se quiere asociar al animal.'], 409);
            }

            $animal->padre_id = $padre_id;
            $bandera=true;
        }

        if ($bandera)
        {
            // Almacenamos en la base de datos el registro.
            if ($animal->save()) {
                return response()->json(['status'=>'ok','animal'=>$animal], 200);
            }else{
                return response()->json(['error'=>'Error al actualizar el animal.'], 500);
            }
            
        }
        else
        {
            // Se devuelve un array errors con los errores encontrados y cabecera HTTP 304 Not Modified – [No Modificada] Usado cuando el cacheo de encabezados HTTP está activo
            // Este código 304 no devuelve ningún body, así que si quisiéramos que se mostrara el mensaje usaríamos un código 200 en su lugar.
            return response()->json(['error'=>'No se ha modificado ningún dato del animal.'],200);
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
        // Comprobamos si el animal que nos están pasando existe o no.
        $animal=\App\Animal::find($id);

        if (count($animal)==0)
        {
            // Devolvemos error codigo http 404
            return response()->json(['error'=>'No existe el animal con id '.$id], 404);
        }

        //verificar si tiene hijos
        $hijos=\App\Animal::where('madre_id', $id)
                ->orWhere('padre_id', $id)
                ->get();

        if(count($hijos)!=0){
           // Devolvemos un código 409 Conflict. 
            return response()->json(['error'=>'No se puede eliminar el animal porque posee descendencia.', 'hijos'=>$hijos], 409);
        }

        // Eliminamos el animal.
        $animal->delete();

        return response()->json(['status'=>'ok', 'message'=>'Se ha eliminado correctamente el animal.'], 200);
    }

    //Llenado de los selectores para la creacion de animales
    public function especiesRazasPosImplantes()
    {
        //cargar todas las especies
        $especies = \App\Especie::all();

        //cargar todas las razas
        $razas = \App\Raza::all();

        //cargar todas las vacunas
        //$vacunas = \App\TipoVacuna::all();

        //cargar todas las posiciones de los implantes
        $posImplantes = \App\PosicionImplante::all();

        return response()->json(['status'=>'ok',
             'especies'=>$especies, 'razas'=>$razas, 'posImplantes'=>$posImplantes], 200);
        
    }
}
