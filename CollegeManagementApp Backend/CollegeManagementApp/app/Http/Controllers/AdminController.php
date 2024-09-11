<?php

namespace App\Http\Controllers;
use Validator;
use Illuminate\Http\Request;
use App\Models\UserActivity;
use App\Models\CUsers;
use App\Models\Permission;
use Illuminate\Support\Facades\DB;

class AdminController extends Controller
{

    public function updateUserActivity(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|numeric',
            'activityname' => 'required|string|max:255',
            'activitydate' => 'required|date_format:Y-m-d H:i:s',
            'desc' => 'required|string|max:255',
        ]);
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()->first()], 400);
        }
        try {
            $colAdmin = new UserActivity;

            $colAdmin->User_ID = $request->input('user_id');
            $colAdmin->ActivityName = $request->input('activityname');
            $colAdmin->ActivityDate =  $request->input('activitydate');
            $colAdmin->Description = $request->input('desc');
            

            $colAdmin->save();
            return response()->json(['status' => 200], 200);

        }
        catch (\Exception $e) {
            return response()->json(['error' => 'Failed to update user role: ' . $e->getMessage()], 500);
        }

    }

    public function getUserProfileById(Request $request)
    {
        // Validate the request input
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|numeric',
        ]);

        // Check if the validation fails
        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'message' => 'Validation error',
                'errors' => $validator->errors()->all(),
            ], 422);
        }

        // If validation passes, retrieve the user profile
        $id = $request->input('user_id');
        $colUser = CUsers::find($id);

        if (!$colUser) {
            return response()->json([
                'status' => 404,
                'message' => 'User not found',
            ], 404);
        }

        return response()->json([
            'status' => 200,
            'data' => $colUser,
        ], 200);

    }


    public function deleteUserById(Request $request)
    {
        try {
            $userId = $request->input('user_id'); // Extract user_id from the request

            $user = CUsers::find($userId);

            if (!$user) {
                return response()->json(['message' => 'User not found'], 404);
            }

            $user->delete();

            return response()->json(['message' => 'User deleted successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to delete user', 'error' => $e->getMessage()], 500);
        }
    }

    public function updateUserById(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'Username' => 'required',
            'Email' => 'required|email',
            'FirstName' => 'required',
            'LastName' => 'required',
            'Address' => 'required',
            'Phone_number' => 'required',
            'user_id' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'message' => 'Validation failed',
                'errors' => $validator->messages(),
            ], 422);
        }

        $user_id = $request->input('user_id');

        $affected = \DB::table('c_users')
            ->where('User_ID', $user_id)
            ->update([
                'Username' => $request->input('Username'),
                'Email' => $request->input('Email'),
                'FirstName' => $request->input('FirstName'),
                'LastName' => $request->input('LastName'),
                'Address' => $request->input('Address'),
                'Phone_number' => $request->input('Phone_number'),
            ]);

        if ($affected) {
            return response()->json([
                'status' => 200,
                'message' => 'Data updated successfully',
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'User not found',
            ], 404);
        }
    }


    public function getUserActivityById(Request $request)
    {
        // Validate the incoming request data
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|numeric',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()->first()], 400);
        }

        try {

            $id = $request->input('user_id');

            $userActivity = DB::table('user_activities')
                    ->select('ActivityName', 'ActivityDate', 'Description')
                    ->where('User_ID', $id)
                    ->get();

            if ($userActivity->isEmpty()) {
                return response()->json(['message' => 'No user activity found for the given ID'], 404);
            } else {
                return response()->json($userActivity, 200);
            }
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to retrieve user activity: ' . $e->getMessage()], 500);
        }
    }


    public function getUserActivity() 
    {

        $activities = UserActivity::all();

        $data = [
            'status' => 200,
            'data' => $activities,
        ];

        return response()->json($data, 200);

    }


    public function addUserPermissions(Request $request)
    {
        // Validate the incoming request data
        $validator = Validator::make($request->all(), [
            'user_role' => 'required|string|max:255',
            'user_id' => 'required|numeric',
            'perm_id' => 'required|numeric',
            'desc' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()->first()], 400);
        }

        try {
            $userRole = $request->input('user_role');
            $userId = $request->input('user_id');
            $permissionId = $request->input('perm_id');
            $desc = $request->input('desc');
    
            // Insert data into 'user_permissions' table using DB facade
            DB::table('user_permissions')->insert([
                'User_Role' => $userRole,
                'User_ID' => $userId,
                'PERMISSION_ID' => $permissionId,
                'USER_PERMISSIONS_STRING' => $desc,
            ]);
    
            return response()->json(['message' => 'User permissions added successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to add user permissions: ' . $e->getMessage()], 500);
        }
    }


    public function updateUserPermissions(Request $request)
    {
        // Validate the incoming request data
        $validator = Validator::make($request->all(), [
            'user_role' => 'required|string|max:255',
            'user_id' => 'required|numeric',
            'perm_id' => 'required|numeric',
            'desc' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()->first()], 400);
        }

        try {
            $userRole = $request->input('user_role');
            $userId = $request->input('user_id');
            $permissionId = $request->input('perm_id');
            $newDesc = $request->input('desc');
    
            // Update user permissions using DB facade
            $affectedRows = DB::table('user_permissions')
                ->where('User_role', $userRole)
                ->where('User_ID', $userId)
                ->update([
                    'PERMISSION_ID' => $permissionId,
                    'USER_PERMISSIONS_STRING' => $newDesc,
                ]);
    
            if ($affectedRows > 0) {
                return response()->json(['message' => 'User permissions updated successfully'], 200);
            } else {
                return response()->json(['error' => 'User permissions not updated'], 404);
            }
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to update user permissions: ' . $e->getMessage()], 500);
        }
    }


    public function deleteUserPermissions(Request $request)
    {
        // Validate the incoming request data
        $validator = Validator::make($request->all(), [
            'user_perm_id' => 'required|numeric',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()->first()], 400);
        }

        try {
            $userPermId = $request->input('user_perm_id');

            $deleted = DB::table('user_permissions')
                ->where('USER_PERMISSIONS_ID', $userPermId)
                ->delete();

            if ($deleted) {
                return response()->json(['message' => 'User permissions deleted successfully'], 200);
            } else {
                return response()->json(['error' => 'No user permissions found to delete'], 404);
            }
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to delete user permissions: ' . $e->getMessage()], 500);
        }
    }


    public function getUserPermissionsById(Request $request)
    {
        // Validate the incoming request data
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|numeric',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()->first()], 400);
        }

        try {
            $userId = $request->input('user_id');

            $permissions = DB::table('user_permissions')->where('User_ID', $userId)->get();

            return response()->json(['data' => $permissions, 'message' => 'User permissions retrieved successfully'], 200);
        
        } catch (\Exception $e) {
            return response()->json(['error' => 'User permissions retrieval failed: ' . $e->getMessage()], 500);
        }
    }

    public function enrollStudentToCourse(Request $request) {
 
        // Validate the incoming request data
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|numeric',
            'course_id' => 'required|numeric',
        ]);
 
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()->first()], 400);
        }
 
        try {
            $courseId = $request->input('course_id');
            $userId = $request->input('user_id');
   
            // Insert data into 'student_enrollment_information' table using DB facade
            DB::table('student_enrollment_information')->insert([
                'Student_ID' => $userId,
                'Course_ID' => $courseId,
                'Enrollment_date' => date('Y-m-d H:i:s'), // Current date and time
            ]);
   
            return response()->json(['message' => 'Student enrolled to course successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to enroll Student' . $e->getMessage()], 500);
        }
       
    }


    public function getPermissionsByRole($role)
    {
        $permissions = Permission::where('role', $role)->get();
        return response()->json($permissions, 200);
    }

    // Insert new permission
    public function insertPermission(Request $request)
    {
        $request->validate([
            'role' => 'required|string|in:Student,Instructor,Administrator,QAO',
            'permissions_string' => 'required|string|max:255',
        ]);

        $permission = Permission::create([
            'role' => $request->role,
            'permissions_string' => $request->permissions_string,
        ]);

        return response()->json($permission, 201);
    }

    // Delete permission by pid
    public function deletePermission($pid)
    {
        $permission = Permission::find($pid);

        if (!$permission) {
            return response()->json(['message' => 'Permission not found'], 404);
        }

        $permission->delete();

        return response()->json(['message' => 'Permission deleted successfully'], 200);
    }


}
