<?php

namespace App\Http\Controllers;

use Hash;
use App\Http\Requests;
use App\User;
use App\Usuario;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;

class LoginController extends Controller
{

    /*Funcion para verificar la valides de un token que se pasa en el request*/
    public function validarToken(Request $request)
    {

        try {
            $user = JWTAuth::toUser($request->input('token'));
        } catch (Exception $e) {
            if ($e instanceof \Tymon\JWTAuth\Exceptions\TokenInvalidException){
                return 0;
            }else if ($e instanceof \Tymon\JWTAuth\Exceptions\TokenExpiredException){
                return 0;
            }else if ($e instanceof \Tymon\JWTAuth\Exceptions\JWTException){
                return 0;
            }else{
                return 0;
            }
        }

        return 1;
    }
    

    public function loginWeb(Request $request)
    {
        $credentials = $request->only('user', 'password');
        $token = null;
        $user = null;

        try {

            $user = User::where('user', $request->input('user'))->first();
            if (empty($user)) {
                return response()->json(['error' => 'User inválido.'], 401);
            }

            //En el panel solo se logean todos los tipos de usuarios
            if ($user->tipo_usuario != 1 && $user->tipo_usuario != 2 && $user->tipo_usuario != 3 &&
                $user->tipo_usuario != 4 && $user->tipo_usuario != 5 && $user->tipo_usuario != 6
            ) {
                return response()->json(['error' => 'Credenciales inválidas.'], 401);
            }

            if (!$token = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'Password inválido.'], 401);
            }

            $user = JWTAuth::toUser($token);
            

        } catch (JWTException $ex) {
            return response()->json(['error' => 'could_not_create_token'], 500);
        }

        //return response()->json(compact('token', 'user'));

        return response()
            ->json([
                'token' => $token,
                'user' => $user
            ]);
    }

    public function loginApp(Request $request)
    {
        $credentials = $request->only('user', 'password');
        $token = null;
        $user = null;

        try {

            $user = User::where('user', $request->input('user'))->first();
            if (empty($user)) {
                return response()->json(['error' => 'User inválido.'], 401);
            }

            //En la app solo se logean todos los tipos de usuarios
            if ($user->tipo_usuario != 1 && $user->tipo_usuario != 2 && $user->tipo_usuario != 3 &&
                $user->tipo_usuario != 4 && $user->tipo_usuario != 5 && $user->tipo_usuario != 6
            ) {
                return response()->json(['error' => 'Credenciales inválidas.'], 401);
            }

            if (!$token = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'Password inválido.'], 401);
            }

            $user = JWTAuth::toUser($token);
            

        } catch (JWTException $ex) {
            return response()->json(['error' => 'could_not_create_token'], 500);
        }

        //return response()->json(compact('token', 'user'));

        return response()
            ->json([
                'token' => $token,
                'user' => $user
            ]);
    }

}
