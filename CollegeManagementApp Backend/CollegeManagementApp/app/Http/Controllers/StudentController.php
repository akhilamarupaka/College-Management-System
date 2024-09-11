<?php

namespace App\Http\Controllers;
use App\Models\UserActivity;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Validator;
use Illuminate\Support\Facades\Storage;


class StudentController extends Controller
{
    

    public function getCoursesById(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()->first()], 400);
        }

        $id = $request->input('user_id');

        $courses = DB::table('student_enrollment_information')
            ->join('Courses', 'student_enrollment_information.Course_ID', '=', 'Courses.Course_ID')
            ->select('Courses.Course_Name', 'Courses.Course_ID', 'Courses.Course_Description')
            ->where('student_enrollment_information.Student_ID', $id)
            ->distinct()
            ->get();

        if ($courses->isEmpty()) {
            return response()->json(['message' => 'No courses found for the given user ID'], 404);
        } else {
            return response()->json(['courses'=>$courses], 200);
        }
    }


    public function getCourseMetaDataByCourseId(Request $request)
    {
        
        $validator = Validator::make($request->all(), [
            'course_id' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()->first()], 400);
        }

        $id = $request->input('course_id');

        $courseMetaData =  DB::table('student_enrollment_information')
            ->join('Courses', 'student_enrollment_information.Course_ID', '=', 'Courses.Course_ID')
            ->select('Courses.Course_Name', 'Courses.Course_Code', 'Courses.Course_Description')
            ->where('student_enrollment_information.Student_ID', $id)
            ->get();

        if ($courseMetaData->isEmpty()) {
            return response()->json(['message' => 'No courses found for the given user ID'], 404);
        } else {
            return response()->json($courseMetaData, 200);
        }
    }


    public function getCourseAnnsByCourseId(Request $request)
    {
        
        $validator = Validator::make($request->all(), [
            'course_id' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()->first()], 400);
        }

        $id = $request->input('course_id');

        $announcements = DB::table('course_make_announcements')
            ->select('Announcement_Title', 'Announcement_Description')
            ->where('Course_ID', $id)
            ->get();

        if ($announcements->isEmpty()) {
            return response()->json(['message' => 'No Announcements found for the given Course ID'], 404);
        } else {
            return response()->json([ 'data'=> $announcements], 200);
        }
    }

    
    public function getGradesByCourseIdAndStudentId(Request $request){

        // Validate the incoming request data
        $validator = Validator::make($request->all(), [
            'course_id' => 'required|numeric',
            'student_id' => 'required|numeric',
        ]);
    
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()->first()], 400);
        }
    
        $course_id = $request->input('course_id');
        $stud_id = $request->input('student_id');
    
        // Retrieve grades from the database
        $grades = DB::table('exam_results')
            ->select('Exam_ID', 'Score')
            ->where('Student_ID', $stud_id)
            ->where('Course_ID', $course_id)
            ->get();
    
        // Check if grades were found
        if ($grades->isEmpty()) {
            // Return a JSON response indicating no grades were found
            return response()->json(['message' => 'No grades found for the given student and course ID'], 404);
        } else {
            // Return the grades in a JSON response
            return response()->json(['data' => $grades], 200);
        }
    }


    public function getModulesByCourseId(Request $request)
    {
        // Validate the incoming request data
        $validator = Validator::make($request->all(), [
            'course_id' => 'required|numeric',
        ]);
    
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()->first()], 400);
        }
    
        $id = $request->input('course_id');
    
        // Retrieve modules from the database based on the course ID
        $modules = DB::table('modules')
            ->select('Module_Name', 'Module_Description', 'MODULE_FILE_NAME', 'MODULE_FILE')
            ->where('Course_ID', $id)
            ->get();

        // Check if modules were found for the given course ID
        if ($modules->isEmpty()) {
            // Return a JSON response indicating no modules were found
            return response()->json(['message' => 'No modules found for the given course ID'], 404);
        } else {
            foreach ($modules as $module) {
                $module->contentDisposition = 'attachment; filename="' . $module->MODULE_FILE_NAME . '"';
            }
    
            $headers = [
                'Content-Type' => 'application/pdf',
     
            ];
            return response()->json([ 'modules' => $modules], 200,$headers);
        }
    }

    public function getAssessmentsByCourseId(Request $request)
    {
        // Validate the incoming request data
        $validator = Validator::make($request->all(), [
            'course_id' => 'required|numeric',
        ]);
    
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()->first()], 400);
        }
    
        $id = $request->input('course_id');
    
        // Retrieve assessments from the database based on the course ID
        $assessments = DB::table('exams')
            ->where('Course_ID', $id)
            ->get();
    
        // Check if assessments were found for the given course ID
        if ($assessments->isEmpty()) {
            // Return a JSON response indicating no assessments were found
            return response()->json(['message' => 'No assessments found for the given course ID'], 404);
        } else {
            // Return the assessments in a JSON response
            return response()->json(['data' => $assessments], 200);
        }
    }


    public function uploadExamFile(Request $request)
    {
        // Validate the incoming request data
        $validator = Validator::make($request->all(), [
            'exam_id' => 'required|numeric',
            'student_id' => 'required|numeric',
            'pdfFileName' => 'required',
            'pdfFile' => 'required|file|mimes:pdf', // Adjust file size limit and MIME type if needed
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()->first()], 400);
        }

        $exam_id = $request->input('exam_id');
        $student_id = $request->input('student_id');
        $pdfFileName = $request->input('pdfFileName');
        $pdfFile = $request->file('pdfFile');

        if ($pdfFile->isValid()) {
            // Read the file contents as binary data
            $pdfData = $pdfFile;

            // Insert binary file data into the database
            $insertedId = DB::table('Exam_Submissions')->insert([
                'Exam_ID' => $exam_id,
                'Student_ID' => $student_id,
                'File_Data' => $pdfData, // Store file data in the database as binary
                'File_Name' => $pdfFileName,
            ]);

            // Build the created object as an associative array
            $createdObject = [
                'ExamSubmission_id' => $insertedId,
                'exam_id' => $exam_id,
                'student_id' => $student_id,
                'file_name' => $pdfFileName,
            ];
            $colAdmin = new UserActivity;
    
            $colAdmin->User_ID = $student_id;
            $name = 'Student with User Id of ' . $student_id . ' submitted exam solution for exam id '.$exam_id ;
            $colAdmin->ActivityName = $name;
            $colAdmin->ActivityDate =  \Carbon\Carbon::now();
            $colAdmin->Description = 'SUCCESS';
            

            $colAdmin->save();

            return response()->json($createdObject, 200);
        } else {
            return response()->json(['error' => 'Invalid file'], 400);
        }
    }

    public function downloadExamFile(Request $request)
    {
        // Validate the incoming request data
        $validator = Validator::make($request->all(), [
            'course_id' => 'required|numeric',
            'exam_id' => 'required|numeric',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()->first()], 400);
        }

        $course_id = $request->input('course_id');
        $exam_id = $request->input('exam_id');

        $result = DB::table('Exams')
            ->select('Exam_file', 'Exam_file_name')
            ->where('Course_ID', $course_id)
            ->where('Exam_ID', $exam_id)
            ->first();

        if (!$result) {
            return response()->json(['error' => 'No exam file found'], 404);
        }

        $examFileData = $result->Exam_file;
        $examFileName = $result->Exam_file_name;

        // Send the file as a download response
        $headers = [
            'Content-Type' => 'application/pdf', // Adjust the content type based on your file type
            'Content-Disposition' => 'attachment; filename="' . $examFileName . '"',
        ];

        return Response::make($examFileData, 200, $headers);
    }


}
