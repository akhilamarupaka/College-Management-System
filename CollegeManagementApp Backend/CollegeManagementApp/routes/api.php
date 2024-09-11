<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CUserController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\InstructorController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\DAOController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

##########################################################################################

Route::get('cuser', [CUserController::class, 'getAllUsers']);

Route::post('cuser/login', [CUserController::class, 'loginUser']);

Route::post('cuser/register', [CUserController::class, 'registerUser']);

Route::post('cuser', [CUserController::class, 'updateUser']);

Route::get('cuser/profile', [CUserController::class, 'getUserProfile']);

Route::get('cuser/finduser', [CUserController::class, 'getUser']);

Route::post('cuser/contactus', [CUserController::class, 'getEmail']);

Route::delete('cuser/edit/{User_ID}', [CUserController::class, 'deleteUser']);

Route::post('cuser/forgotPassword', [CUserController::class, 'forgotPassword']);

Route::post('cuser/resetPassword', [CUserController::class, 'resetPassword']);

##########################################################################################

Route::get('student/courses', [StudentController::class, 'getCoursesById']);

Route::get('student/courses/metadata', [StudentController::class, 'getCourseMetaDataByCourseId']);

Route::get('student/courses/anns', [StudentController::class, 'getCourseAnnsByCourseId']);

Route::get('student/courses/grades', [StudentController::class, 'getGradesByCourseIdAndStudentId']);

Route::get('student/courses/modules', [StudentController::class, 'getModulesByCourseId']);

Route::get('student/courses/assessments', [StudentController::class, 'getAssessmentsByCourseId']);

Route::post('student/courses/uploadexam', [StudentController::class, 'uploadExamFile']);

Route::get('student/courses/downloadexam', [StudentController::class, 'downloadExamFile']);

##########################################################################################

Route::post('instructor/createcourse', [InstructorController::class, 'createCourse']);

Route::post('instructor/updatecourse/', [InstructorController::class, 'updateCourse']);

Route::get('/modules/{fileName}', [InstructorController::class, 'getModuleFile']);

Route::post('instructor/addmodule', [InstructorController::class, 'addModule']);

Route::post('instructor/addexam', [InstructorController::class, 'addExam']);

Route::post('instructor/makeannouncement', [InstructorController::class, 'makeAnnouncement']);

Route::post('instructor/grade/student', [InstructorController::class, 'gradeStudent']);

Route::get('instructor/coursedetails', [InstructorController::class, 'getCourseDetails']);

Route::get('instructor/reports', [InstructorController::class, 'getInstructorReports']);

##########################################################################################

Route::post('dao/add/policy', [DAOController::class, 'createPolicy']);

Route::post('dao/update/policy', [DAOController::class, 'updateCoursePolicy']);

Route::post('dao/delete/policy', [DAOController::class, 'deleteCoursePolicy']);

Route::get('dao/form/questions', [DAOController::class, 'getFormQuestions']);

Route::get('dao/getpolicies', [DAOController::class, 'getAllPolicies']);

Route::post('dao/sendEmail', [DAOController::class, 'getEmail']);

 
Route::get('dao/get/reports',[DAOController::class, 'getDaoReports']);

Route::post('dao/add/feedbackform', [DAOController::class, 'createFeedbackForm']);

Route::post('dao/add/questions', [DAOController::class, 'addQuestionToForm']);

##########################################################################################

Route::get('admin/user/profile', [AdminController::class, 'getUserProfileById']);

Route::post('admin/update/profile', [AdminController::class, 'updateUserById']);

Route::post('admin/delete/profile', [AdminController::class, 'deleteUserById']);

Route::get('admin/activity', [AdminController::class, 'getUserActivity']);

Route::get('admin/user/activity', [AdminController::class, 'getUserActivityById']);

Route::post('admin/add/role', [AdminController::class, 'addUserPermissions']);

Route::post('admin/update/role', [AdminController::class, 'updateUserPermissions']);

Route::delete('admin/delete/role', [AdminController::class, 'deleteUserPermissions']);

Route::get('admin/user/role', [AdminController::class, 'getUserPermissionsById']);

Route::post('admin/enroll/student', [AdminController::class, 'enrollStudentToCourse']);

Route::get('admin/permissions/{role}', [AdminController::class, 'getPermissionsByRole']);

Route::post('admin/permissions', [AdminController::class, 'insertPermission']);

Route::delete('admin/permissions/{pid}', [AdminController::class, 'deletePermission']);

##########################################################################################