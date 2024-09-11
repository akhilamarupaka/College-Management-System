<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Mail\MyMail;
use Illuminate\Support\Facades\Mail;
use App\Models\CUsers;
use App\Models\UserActivity;
use Validator;

class CUserController extends Controller
{

    public function resetPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'Email' => 'required|email',
            'Password' => 'required',
            'Token' => 'required',
        ]);
    
        if ($validator->fails()) {
            $data = [
                'status' => 422,
                'message' => $validator->messages(),
            ];
    
            return response()->json($data, 422);
        }
    
        $user = CUsers::where('Email', $request->input('Email'))
            ->where('password_reset_token', $request->input('Token'))
            ->first();
    
        if ($user) {
            // Update the password and reset token
            $user->Password_Hashed = $request->input('Password');
            $user->password_reset_token = null;
            $name = "Password reset successfull. Please try logging into the system again.";

            Mail::to($request->Email)->send(new MyMail($name));
            $user->save();
          
            $data = [
                'status' => 200,
                'message' => 'Password updated successfully',
            ];
            $colAdmin = new UserActivity;
            $colAdmin->User_ID = $user->User_ID;
            $colAdmin->ActivityName = 'Password reset successful';
            $colAdmin->ActivityDate =  \Carbon\Carbon::now();
            $colAdmin->Description = 'SUCCESS';
            

            $colAdmin->save();
    
            return response()->json($data, 200);
        } else {
            // Token or email is invalid
            $data = [
                'status' => 401,
                'message' => 'Invalid token or email',
            ];
            $colAdmin = new UserActivity;
            $user = CUsers::where('Email', $request->input('Email'))
            ->first();
            $colAdmin->User_ID = $user->User_ID;
            $colAdmin->ActivityName = 'Password reset failed. Invalid token or email';
            $colAdmin->ActivityDate =  \Carbon\Carbon::now();
            $colAdmin->Description = 'FAIL';
            

            $colAdmin->save();
            return response()->json($data, 401);
        }
    }
    public function forgotPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
        ]);
    
        if ($validator->fails()) {
            $data = [
                'status' => 422,
                'message' => $validator->messages(),
            ];
    
            return response()->json($data, 422);
        }
    
        $user = CUsers::where('Email', $request->input('email'))->first();
    
        if ($user) {
            $token = bin2hex(random_bytes(32));
            $user->Password_reset_token = $token;
            $name = "This is the password reset token: {$token}";

            Mail::to($request->email)->send(new MyMail($name));
            $user->save();
            $colAdmin = new UserActivity;

            $colAdmin->User_ID = $user->User_ID;
            $colAdmin->ActivityName = 'Triggered email for password reset';
            $colAdmin->ActivityDate =  \Carbon\Carbon::now();
            $colAdmin->Description = 'SUCCESS';
            

            $colAdmin->save();
            return response()->json(['status' => 200, 'token' => $token], 200);
        } else {
            return response()->json(['status' => 404, 'message' => 'User not found'], 404);
        }
    }
    public function getAllUsers() 
    {

        $users = CUsers::all();

        $data = [
            'status' => 200,
            'data' => $users,
        ];

        return response()->json($data, 200);

    }

    public function getUser(Request $request) { 
        $validator = Validator::make(
            $request->all(), 
            [ 
              'Username' => 'required', 
            ]); 

        if ($validator->fails()) { 
            $data = [ 'status' => 422, 'message' => $validator->messages(), ]; 
            return response()->json($data, 422); 
        } 
        
        $user = CUsers::where('Username', $request->input('Username'))->first();
        if ($user) 
        { 
            $data = [ 'status' => 200, 'user' => $user, ];
          

            return response()->json($data, 200);
        } else { 
            $data = [ 'status' => 401, 'message' => 'Invalid credentials', ]; 
            return response()->json($data, 401); 
        } 
    }

    public function getUserProfile(Request $request) 
    {
        
        $validator = Validator::make($request->all(), [
            'id' => 'required',
        ]);
    
        if ($validator->fails()) {
            $data = [
                'status' => 422,
                'message' => $validator->messages(),
            ];
    
            return response()->json($data, 422);
        }
        $id = $request->id;
        
        $colUser = CUsers::where('User_ID', $request->input('id'))->first();

        if (!$colUser) {
            $data = [
                'status' => 404,
                'message' => 'User not found',
            ];

            return response()->json($data, 404);
        }
        

        $data = [
            'status' => 200,
            'data' => $colUser,
        ];

        return response()->json($data, 200);

    }

    public function loginUser(Request $request) { 
        $validator = Validator::make(
            $request->all(), 
            [ 'Email' => 'required', 
              'Password_Hashed' => 'required', 
            ]); 

        if ($validator->fails()) { 
            $data = [ 'status' => 422, 'message' => $validator->messages(), ]; 
            return response()->json($data, 422); 
        } 
        
        $user = CUsers::where('Email', $request->input('Email'))->first();
        if ($user && ($request->input('Password_Hashed') === $user->Password_Hashed)) 
        { // Authentication successful 
            $data = [ 'status' => 200, 'user' => $user, ];
            session(['user_id' => $user->User_ID]);
            $colAdmin = new UserActivity;

            $colAdmin->User_ID = session('user_id');
            $colAdmin->ActivityName = 'User Logged in';
            $colAdmin->ActivityDate =  \Carbon\Carbon::now();
            $colAdmin->Description = 'SUCCESS';
            

            $colAdmin->save();

            return response()->json($data, 200);
        } else { 
            $data = [ 'status' => 401, 'message' => 'Invalid credentials', ]; 
            return response()->json($data, 401); 
        } 
    }

    public function registerUser(Request $request)
    {

        $validator = Validator::make($request->all(),
        [
            'Username'=>'required',
            'Email'=>'required|email',
            'Password_Hashed'=>'required',
            'FirstName'=>'required',
            'LastName'=>'required',
            'Address'=>'required',
            'Phone_number'=>'required',
            'User_role'=>'required',
        ]);

        if($validator->fails()){

            $data = [
                'status' => 200,
                'message' => $validator->messages(),
            ]; 

            return response()->json($data, 422);
        }

        else 
        {
            $colUser = new CUsers;

            $colUser->Username = $request->Username;
            $colUser->Email = $request->Email;
            $colUser->FirstName = $request->FirstName;
            $colUser->LastName = $request->LastName;
            $colUser->Address = $request->Address;
            $colUser->Phone_number = $request->Phone_number;
            $colUser->User_role = $request->User_role;
            $colUser->Password_Hashed = $request->Password_Hashed;

            $colUser->save();

            $data = [
                'status'=>200,
                'message'=>'Data uploaded successfully'
            ];
            $name = "User Registered";

            Mail::to('akhilamarupaka@gmail.com')->send(new MyMail($name));
            $colAdmin = new UserActivity;

            $colAdmin->User_ID = $colUser->User_ID;
            $colAdmin->ActivityName = 'User registered';
            $colAdmin->ActivityDate =  \Carbon\Carbon::now();
            $colAdmin->Description = 'SUCCESS';
            

            $colAdmin->save();
            return response()->json($data,200);
        }
    }

    public function updateUser(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id' => 'required',
        
            'Email' => 'required|email',
            'FirstName' => 'required',
            'LastName' => 'required',
            'Address' => 'required',
            'Phone_number' => 'required',
        ]);
        $id= $request->id;
        if ($validator->fails()) {
            $data = [
                'status' => 422,
                'message' => 'Validation failed',
                'errors' => $validator->messages(),
            ];

            return response()->json($data, 422);
        } else {
            $colUser = CUsers::find($id);

            if (!$colUser) {
                $data = [
                    'status' => 404,
                    'message' => 'User not found',
                ];

                return response()->json($data, 404);
            }

            $colUser->Email = $request->Email;
            $colUser->FirstName = $request->FirstName;
            $colUser->LastName = $request->LastName;
            $colUser->Address = $request->Address;
            $colUser->Phone_number = $request->Phone_number;

            $colUser->save();

            $data = [
                'status' => 200,
                'message' => 'Data updated successfully',
            ];
            $name = 'User Profile Updated with User Id of ' . $colUser -> User_ID;
            Mail::to('akhilamarupaka@gmail.com')->send(new MyMail($name));
            $colAdmin = new UserActivity;

            $colAdmin->User_ID = $colUser->User_ID;
            $colAdmin->ActivityName = 'User Profile Updated';
            $colAdmin->ActivityDate =  \Carbon\Carbon::now();
            $colAdmin->Description = 'SUCCESS';
            

            $colAdmin->save();

            return response()->json($data, 200);
        }
    }


    public function deleteUser($id)
    {
        $colUser = CUsers::find($id);

        if (!$colUser) {
            $data = [
                'status' => 404,
                'message' => 'User not found',
            ];

            return response()->json($data, 404);
        }

        $colUser->delete();

        $data = [
            'status' => 200,
            'message' => 'User deleted successfully',
        ];

        return response()->json($data, 200);
    }
    public function getEmail(Request $request)
    {
         // Validate the incoming request data
         $validator = Validator::make($request->all(), [
            'name' => 'required',
            'to_email' => 'required',
            'message' => 'required',
            'pn' => 'required',
        ]);
    
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()->first()], 400);
        }
    
        $to_email= $request->input('to_email');
        $message= $request->input('message');
        $name= $request->input('name');
        $phone_number= $request->input('pn');

        $new_string = "Sender Email: " . $to_email . "\n";
        $new_string .= "Message: " . $message . "\n";
        $new_string .= "Name: " . $name . "\n";
        $new_string .= "Phone Number: " . $phone_number;

        Mail::to('akhilamarupaka@gmail.com')->send(new MyMail($new_string));
        return response()->json(['success' => 200], 200);
    }

}
