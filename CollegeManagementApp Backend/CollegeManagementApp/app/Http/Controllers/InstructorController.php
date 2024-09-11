<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\File;
use Illuminate\Http\Response;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Mail\MyMail;
use Illuminate\Support\Facades\Storage;

use Illuminate\Support\Facades\Mail;
use App\Models\UserActivity;
use Illuminate\Support\Facades\DB;
use App\Models\Modules;
use App\Models\Exams;
use App\Models\Courses;
use Validator;

class InstructorController extends Controller
{
    

    public function createCourse(Request $request)
    {
        // Validate the incoming request data
        $validator = Validator::make($request->all(), [
            'c_name' => 'required|string|max:255',
            'c_code' => 'required|string|max:50',
            'c_desc' => 'required|string|max:500',
            'instructor_id' => 'required|numeric',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()->first()], 400);
        }

        $c_name = $request->input('c_name');
        $c_code = $request->input('c_code');
        $c_desc = $request->input('c_desc');
        $inst_id = $request->input('instructor_id');

        try {
            DB::table('Courses')->insert([
                'Course_Name' => $c_name,
                'Course_Code' => $c_code,
                'Course_Description' => $c_desc,
                'Instructor_ID' => $inst_id,
            ]);
            $name = 'Instructor with User Id of ' . $inst_id . ' created a course '.$c_name ;
            Mail::to('akhilamarupaka@gmail.com')->send(new MyMail($name));
            $colAdmin = new UserActivity;

            $colAdmin->User_ID = $inst_id;
            $colAdmin->ActivityName = $name;
            $colAdmin->ActivityDate =  \Carbon\Carbon::now();
            $colAdmin->Description = 'SUCCESS';
            

            $colAdmin->save();
            return response()->json(['success' => true], 200);
        } catch (\Exception $e) {

            return response()->json(['error' => 'Failed to create course'], 500);
        }
    }

    public function updateCourse(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'c_id' =>'required',
            'inst_id' =>'required',
            'c_desc' => 'required|string|max:500',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()->first()], 400);
        }
        
        $c_desc = $request->input('c_desc');
        $id = $request->input('c_id');
        $instid=$request->input('inst_id');

        try {

            DB::table('Courses')
                ->where('Course_ID', $id)
                ->update(['Course_Description' => $c_desc]);
            $name = 'Instructor with User Id of ' . $instid . ' updated course description for course with id of '.$id ;
            Mail::to('akhilamarupaka@gmail.com')->send(new MyMail($name));
            $colAdmin = new UserActivity;
    
            $colAdmin->User_ID = $instid;
            $colAdmin->ActivityName = $name;
            $colAdmin->ActivityDate =  \Carbon\Carbon::now();
            $colAdmin->Description = 'SUCCESS';
            

            $colAdmin->save();
            return response()->json(['success' => true], 200);

        } catch (\Exception $e) {

            return response()->json(['error' => 'Failed to update course'], 500);

        }
    }

    public function getModuleFile($fileName)
    {
        $filePath = public_path('modules') . '/' . $fileName;

        //echo $filePath;
        if (File::exists($filePath)) {
            $fileContents = file_get_contents($filePath);
            echo $filePath;

            return response($fileContents)
    ->header('Content-Type', 'application/pdf')
    ->header('Content-Disposition', 'inline; filename="' . $fileName . '"');
        } else {
            abort(404, 'File not found');
        }
    }

    public function addModule(Request $request)
    {
        // Validate the incoming request data
        $validator = Validator::make($request->all(), [
            'instid' => 'required',
            'course_id' => 'required|numeric',
            'm_name' => 'required|string|max:255',
            'm_desc' => 'required|string|max:500',
            'pdfFile' => 'file|mimes:pdf|max:5016', // Adjust file size limit and MIME type if needed
            'pdfFileName' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()->first()], 400);
        }
        $inst_id = $request->input('instid');
        $course_id = $request->input('course_id');
        $m_name = $request->input('m_name');
        $m_desc = $request->input('m_desc');
        $pdfFile = $request->file('pdfFile');
        $pdfFileName = $request->input('pdfFileName');
        $c = Courses::where('COURSE_ID', $course_id)
        ->first();
        if(!$c){
            return response()->json(['status' => 120], 120);
        }

       if($c) {
        try{
            $module = new Modules();
    
            // Set the attributes
            $module->COURSE_ID = $course_id;
            $module->MODULE_NAME = $m_name;
            $module->MODULE_DESCRIPTION = $m_desc;
        
            // Process and store the PDF file
            if ($pdfFile) {
                $module->MODULE_FILE = $pdfFile;
                $pdfFileName = uniqid() . '_' . $pdfFileName;
                $module->MODULE_FILE_NAME = $pdfFileName;
                $pdfFile->move(public_path('modules'), $pdfFileName);
            }
        
            // Save the module to the database
            $module->save();

            $colAdmin = new UserActivity;
    
            $colAdmin->User_ID = $inst_id;
            $name = 'Instructor with User Id of ' . $inst_id . ' created a module for course with id of '.$course_id ;
            $colAdmin->ActivityName = $name;
            $colAdmin->ActivityDate =  \Carbon\Carbon::now();
            $colAdmin->Description = 'SUCCESS';
            

            $colAdmin->save();


            return response()->json($module, 200);
        }
        catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            // Handle the case where the course ID doesn't exist
            return response()->json(['status' => 120], 120);
        }
        catch (\Exception $e) {
            // Handle other types of exceptions
            Log::error($e);
            return response()->json(['status' => 500], 500);
        }
    }
    }

    public function addExam(Request $request)
    {
               // Validate the incoming request data
               $validator = Validator::make($request->all(), [
                'exam_title' => 'required|string|max:255',
                'course_id' => 'required|numeric',
                'exam_desc' => 'required|string|max:500',
                'exam_date' => 'required',
                'max_score' => 'required|numeric',
                'inst_id' => 'required|numeric',
                'pdfFile' => 'file|mimes:pdf|max:2048', // Adjust file size limit and MIME type if needed
                'pdfFileName' => 'required|string|max:255',
            ]);
    
            if ($validator->fails()) {
                return response()->json(['error' => $validator->errors()->first()], 400);
            }
    
            $exam_title = $request->input('exam_title');
            $course_id = $request->input('course_id');
            $exam_desc = $request->input('exam_desc');
            $max_score = $request->input('max_score');
            $inst_id = $request->input('inst_id');
            $pdfFile = $request->file('pdfFile');
            $pdfFileName = $request->input('pdfFileName');
            $examdate = $request->input('exam_date');
    
            try {
                $exam = new Exams();
                $exam->Exam_Title = $exam_title;
                $exam->Course_ID = $course_id;
                $exam->Exam_Description = $exam_desc;
                $exam->Exam_Max_Score = $max_score;
                $exam->Instructor_ID = $inst_id;
                $exam->Exam_date = $examdate;
                if ($pdfFile) {
                    $exam->Exam_file = $pdfFile;
                    $pdfFileName = uniqid() . '_' . $pdfFileName;
                    $exam->Exam_file_name = $pdfFileName;
                    $pdfFile->move(public_path('modules'), $pdfFileName);
                    
                }
                $exam->save();
    
    
                return response()->json(['status' => 200], 200);
    
            } catch (\Exception $e) {
                return response()->json(['status' => 500], 500);
            }
       
    }


    public function gradeStudent(Request $request)
    {
        // Validate the incoming request data
        $validator = Validator::make($request->all(), [
            'course_id' => 'required|numeric',
            'exam_id' => 'required|numeric',
            'student_id' => 'required|numeric',
            'inst_id' => 'required|string|max:500',
            'grade' => 'required',
            'marks' => 'required|numeric',
        ]);
    
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()->first()], 400);
        }
    
        $exam_id = $request->input('exam_id');
        $course_id = $request->input('course_id');
        $student_id = $request->input('student_id');
        $grade = $request->input('grade');
        $marks = $request->input('marks');
        $inst_id = $request->input('inst_id');
    
        try {
            DB::table('exam_results')->insert([
                'Course_ID' => $course_id,
                'Exam_ID' => $exam_id,
                'Grade' => $grade,
                'Student_ID' => $student_id,
                'Score'=>$marks,
            ]);
            $colAdmin = new UserActivity;
    
            $colAdmin->User_ID = $inst_id;
            $name = 'Instructor with User Id of ' . $inst_id . ' grade a student for course with exam id of '.$exam_id ;
            $colAdmin->ActivityName = $name;
            $colAdmin->ActivityDate =  \Carbon\Carbon::now();
            $colAdmin->Description = 'SUCCESS';
            

            $colAdmin->save();
            return response()->json(['success' => true], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to make announcement: ' . $e->getMessage()], 500);
        }
    }

    public function makeAnnouncement(Request $request)
    {
        // Validate the incoming request data
        $validator = Validator::make($request->all(), [
            'course_id' => 'required|numeric',
            'ann_title' => 'required|string|max:255',
            'ann_desc' => 'required|string|max:500',
            'inst_id' => 'required',
        ]);
    
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()->first()], 400);
        }
    
        $course_id = $request->input('course_id');
        $ann_title = $request->input('ann_title');
        $ann_desc = $request->input('ann_desc');
        $id = $request->input('inst_id');
    
        try {
            DB::table('course_make_announcements')->insert([
                'Course_ID' => $course_id,
                'Announcement_Title' => $ann_title,
                'Announcement_Description' => $ann_desc,
                'Instructor_ID' => $id,
            ]);
            $colAdmin = new UserActivity;
    
            $colAdmin->User_ID = $id;
            $name = 'Instructor with User Id of ' . $id . ' created a announcement for course with id of '.$course_id ;
            $colAdmin->ActivityName = $name;
            $colAdmin->ActivityDate =  \Carbon\Carbon::now();
            $colAdmin->Description = 'SUCCESS';
            

            $colAdmin->save();
            return response()->json(['success' => true], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to make announcement: ' . $e->getMessage()], 500);
        }
    }


    public function getCourseDetails(Request $request)
    {
        // Validate the incoming request data
        $validator = Validator::make($request->all(), [
            'course_id' => 'required|numeric',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()->first()], 400);
        }

        try {
            // Retrieve the courseId from the request
            $courseId = $request->input('course_id');

            // Execute the query to get course description
            $courseDescription = DB::table('Courses')
                ->where('Course_ID', $courseId)
                ->value('Course_Description');

            if ($courseDescription === null) {
                return response()->json(['error' => 'Course not found'], 404);
            }

            // Execute the query to get student enrollments
            $studentEnrollments = DB::table('student_enrollment_information')
                ->join('c_users', 'student_enrollment_information.Student_ID', '=', 'c_users.User_ID')
                ->select('c_users.User_ID', 'c_users.FirstName', 'c_users.LastName')
                ->where('student_enrollment_information.Course_ID', $courseId)
                ->get()
                ->toArray();

            // Combine the results into a single array
            $output = [
                "course_description" => $courseDescription,
                "student_enrollments" => $studentEnrollments,
            ];

            // Return the results as JSON response
            return response()->json($output, 200);
        } catch (\Exception $e) {
            // Handle any exceptions and return an error response
            return response()->json(['error' => 'Failed to fetch course details: ' . $e->getMessage()], 500);
        }
    }


    public function getInstructorReports(Request $request)
    {
        // Validate the incoming request data
        $validator = Validator::make($request->all(), [
            'course_id' => 'required|numeric|gt:0', // Course ID should be a positive number
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()->first()], 400);
        }

        try {
            // Get the courseId from the request
            $courseId = $request->input('course_id');

            // Query to fetch reports
            $reports = DB::table('exam_results')
                ->select('Course_ID', 'Exam_ID', DB::raw('AVG(Score) AS Average_Score'))
                ->where('Course_ID', $courseId)
                ->groupBy('Course_ID', 'Exam_ID')
                ->get()
                ->toArray();

            return response()->json( ['data'=> $reports], 200);
        } catch (\Exception $e) {
            // Handle any exceptions and return an error response
            return response()->json(['error' => 'Failed to fetch instructor reports: ' . $e->getMessage()], 500);
        }
    }

}
