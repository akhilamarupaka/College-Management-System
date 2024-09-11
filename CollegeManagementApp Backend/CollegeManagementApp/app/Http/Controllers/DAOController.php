<?php

namespace App\Http\Controllers;
use App\Models\UserActivity;
Use App\Models\CoursePolicy;
Use App\Models\ExamResults;
use App\Models\Courses;
use App\Mail\MyMail;
use Illuminate\Support\Facades\Mail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Validator;

class DAOController extends Controller
{
    public function getAllPolicies(Request $request)
    {
            // Validate the incoming request data
            $validator = Validator::make($request->all(), [
                'course_id' => 'required',
   
            ]);
        
            if ($validator->fails()) {
                return response()->json(['error' => $validator->errors()->first()], 400);
            }
        $id = $request->course_id;
       
        $dat = CoursePolicy::where('Course_ID', $id)->get();
 
        if (!$dat) {
            $data = [
                'status' => 404,
                'message' => 'Policy not found',
            ];
 
            return response()->json(["error" => "failed"], 404);
        }
       
 
        $data = [
            'status' => 200,
            "policies" => $dat,
        ];
 
        return response()->json($data, 200);
 
    }

    public function createPolicy(Request $request)
    {
        // Validate the incoming request data
        $validator = Validator::make($request->all(), [
            'id' => 'required',
            'course_id' => 'required|numeric',
            'course_name' => 'required|string|max:255',
            'policy_title' => 'required|string|max:255',
            'policy_desc' => 'required|string',
        ]);
    
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()->first()], 400);
        }
        $id = $request->input('id');
        $courseID = $request->input('course_id');
        $courseName = $request->input('course_name');
        $policyTitle = $request->input('policy_title');
        $policyDescription = $request->input('policy_desc');
    
        try {
            DB::table('course_policies')->insert([
                'Course_ID' => $courseID,
                'Course_Name' => $courseName,
                'Policy_Title' => $policyTitle,
                'Policy_Description' => $policyDescription,
            ]);
    
            $colAdmin = new UserActivity;
            $name = 'QAO with User Id of ' . $id . ' created a course policy for course with id of  '.$courseID ;
            $colAdmin->User_ID = $id;
            $colAdmin->ActivityName = $name;
            $colAdmin->ActivityDate =  \Carbon\Carbon::now();
            $colAdmin->Description = 'SUCCESS';
            Mail::to('akhilamarupaka@gmail.com')->send(new MyMail($name));


            $colAdmin->save();
            return response()->json(['message' => 'Policy created successfully'], 200);
        } catch (\Exception $e) {
            // Handle any exceptions and return an error response
            return response()->json(['error' => 'Failed to create policy: ' . $e->getMessage()], 500);
        }
    }
    

    public function updateCoursePolicy(Request $request)
    {
        // Validate the incoming request data
        $validator = Validator::make($request->all(), [
            'id' => 'required',
            'policy_id' => 'required|numeric',
            'policy_title' => 'required|string|max:255',
            'policy_desc' => 'required|string',
        ]);
    
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()->first()], 400);
        }
        $id = $request->input('id');

    
        $policyID = $request->input('policy_id');
        $newPolicyTitle = $request->input('policy_title');
        $newPolicyDescription = $request->input('policy_desc');
    
        try {
            // Check if the policy exists
            $existingPolicy = DB::table('course_policies')->where('Policy_ID', $policyID)->first();
    
            if ($existingPolicy) {
                // Update the policy using the DB facade
                DB::table('course_policies')
                    ->where('Policy_ID', $policyID)
                    ->update([
                        'Policy_Title' => $newPolicyTitle,
                        'Policy_Description' => $newPolicyDescription,
                    ]);
    
                    $colAdmin = new UserActivity;
                    $name = 'QAO with User Id of ' . $id . ' updated a course policy' ;
                    $colAdmin->User_ID = $id;
                    $colAdmin->ActivityName = $name;
                    $colAdmin->ActivityDate =  \Carbon\Carbon::now();
                    $colAdmin->Description = 'SUCCESS';
                    Mail::to('akhilamarupaka@gmail.com')->send(new MyMail($name));
        
        
                    $colAdmin->save();
                return response()->json(['message' => 'Policy updated successfully'], 200);
            }
    
            // Return a message if the policy is not found
            return response()->json(['error' => 'Policy not found'], 404);
        } catch (\Exception $e) {
            // Handle any exceptions and return an error response
            return response()->json(['error' => 'Failed to update policy: ' . $e->getMessage()], 500);
        }
    }

    
    public function deleteCoursePolicy(Request $request)
    {
        // Validate the incoming request data
        $validator = Validator::make($request->all(), [
            'id' => 'required',
            'policy_id' => 'required|numeric',
        ]);
    
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()->first()], 400);
        }
    
        $policyID = $request->input('policy_id');
        $id = $request->input('id');
    
        try {
            // Delete the policy using the DB facade
            $deletedRows = DB::table('course_policies')->where('Policy_ID', $policyID)->delete();
    
            if ($deletedRows > 0) {
                // Return a success message upon successful deletion
                $colAdmin = new UserActivity;
                $name = 'QAO with User Id of ' . $id . ' deleted a course policy' ;
                $colAdmin->User_ID = $id;
                $colAdmin->ActivityName = $name;
                $colAdmin->ActivityDate =  \Carbon\Carbon::now();
                $colAdmin->Description = 'SUCCESS';
                Mail::to('akhilamarupaka@gmail.com')->send(new MyMail($name));
    
    
                $colAdmin->save();
                return response()->json(['message' => 'Policy deleted successfully'], 200);
            }
    
          
            return response()->json(['error' => 'Policy not found'], 404);
        } catch (\Exception $e) {
            // Handle any exceptions and return an error response
            return response()->json(['error' => 'Failed to delete policy: ' . $e->getMessage()], 500);
        }
    }


    public function createFeedbackForm(Request $request)
    {
        // Validate the incoming request data
        $validator = Validator::make($request->all(), [
            'id' => 'required',
            'course_id' => 'required|numeric',
            'form_name' => 'required|string|max:255',
        ]);
    
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()->first()], 400);
        }
        $id = $request->input('id');
        $courseID = $request->input('course_id');
        $formName = $request->input('form_name');
       
    
        try {
            $form=DB::table('forms')->insertGetId([
                'Course_ID' => $courseID,
                'Form_Name' => $formName,
            ]);
    
            $colAdmin = new UserActivity;
            $name = 'QAO with User Id of ' . $id . ' created a feedback form' ;
            $colAdmin->User_ID = $id;
            $colAdmin->ActivityName = $name;
            $colAdmin->ActivityDate =  \Carbon\Carbon::now();
            $colAdmin->Description = 'SUCCESS';
            Mail::to('akhilamarupaka@gmail.com')->send(new MyMail($name));


            $colAdmin->save();
            return response()->json(['form' => $form], 200);
        } catch (\Exception $e) {
            // Handle any exceptions and return an error response
            return response()->json(['error' => 'Failed to create Feedback Form: ' . $e->getMessage()], 500);
        }
    }


    public function addQuestionToForm(Request $request)
    {
         // Validate the incoming request data
         $validator = Validator::make($request->all(), [
            'form_id' => 'required|numeric',
            'question' => 'required|string|max:255',
        ]);
    
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()->first()], 400);
        }
    
        $formID = $request->input('form_id');
        $question = $request->input('question');
       
    
        try {
            DB::table('questions')->insert([
                'Form_ID' => $formID,
                'Question_Text' => $question,
            ]);
    
            // Return a success message upon successful execution
            return response()->json(['message' => 'Question created successfully'], 200);
        } catch (\Exception $e) {
            // Handle any exceptions and return an error response
            return response()->json(['error' => 'Failed to add Question: ' . $e->getMessage()], 500);
        }
    }

    public function getFormQuestions(Request $request){

        // Validate the incoming request data
        $validator = Validator::make($request->all(), [
            'form_id' => 'required|numeric',
        ]);
    
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()->first()], 400);
        }
    
        $formID = $request->input('form_id');
       
    
        try {
            $questions = DB::table('questions')
                    ->select('Question_ID', 'Question_Text')
                    ->where('Form_ID', $formID)
                    ->get();
    
            // Return a success message upon successful execution
            return response()->json(['message' => 'Questions retrieved successfully', 'data' => $questions], 200);
        } catch (\Exception $e) {
            // Handle any exceptions and return an error response
            return response()->json(['error' => 'Failed to get Questions ' . $e->getMessage()], 500);
        }

    }



    public function getEmail(Request $request)
    {
         // Validate the incoming request data
         $validator = Validator::make($request->all(), [
            'to_email' => 'required',
            'message' => 'required',
        ]);
    
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()->first()], 400);
        }
    
        $to_email= $request->input('to_email');
        $message= $request->input('message');

        Mail::to($to_email)->send(new MyMail($message));
        return response()->json(['success' => 200], 200);
    }

    public function getDaoReports(Request $request)
    {
        $instructorId = $request->input('id');
        $courses = Courses::where('Instructor_ID', $instructorId)->get();
        $reports = [];

        foreach ($courses as $course) {
            $examResults = $course->examResults;

            // Filter out non-numeric scores
            $validScores = $examResults->filter(function ($result) {
                return is_numeric($result->Score);
            });

            // Calculate average score for the course
            $averageScore = $validScores->avg('Score');

            // Prepare report data
            $reportData = [
                'Course_Name' => $course->Course_Name,
                'Course_ID' => $course->Course_ID,
                'Average_Score' => $averageScore,
            ];

            $reports[] = $reportData;
        }

        return response()->json(['reports' => $reports]);
    }
    
}