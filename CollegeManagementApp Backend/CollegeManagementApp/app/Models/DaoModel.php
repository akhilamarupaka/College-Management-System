<?php
class DAOModel {
    private $mysqli;
 
    public function __construct() {
        // Create a database connection
        require_once('config/database.php');
 
        $this->mysqli = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
        if ($this->mysqli->connect_error) {
            die('Database connection error: ' . $this->mysqli->connect_error);
        }
    }
    public function getDaoProfileById($id) {
        $query = "SELECT FirstName, LastName, Email FROM Users WHERE User_ID = ? ";
        $stmt = $this->mysqli->prepare($query);
        if (!$stmt) {
            die('Prepare failed: ' . $this->mysqli->error);
        }
        $stmt->bind_param('i', $id);
        if (!$stmt) {
            die('Bind failed: ' . $stmt->error);
        }
        if ($stmt->execute()) {
            $result = $stmt->get_result();
            if ($result->num_rows === 0) {
                return null;
            } else {
                return $result->fetch_assoc();
            }
        } else {
            die('Execute failed: ' . $stmt->error);
        }
 
    }
 
    public function updateDaoProfileById($firstname, $lastname, $address, $phoneNumber, $id) {
        $query = "UPDATE Users SET FirstName = ?, LastName = ?, Address = ? , Phone_number = ?  WHERE User_ID = ?;";
        $stmt = $this->mysqli->prepare($query);
        if (!$stmt) {
            die('Prepare failed: ' . $this->mysqli->error);
        }
        $stmt->bind_param('ssssi', $firstname, $lastname, $address, $phoneNumber, $id);
 
        if (!$stmt) {
            die('Bind failed: ' . $stmt->error);
        }
        if ($stmt->execute()) {
            $result = $stmt->get_result();
            if ($result->num_rows === 0) {
                return null;
            } else {
                return $result->fetch_assoc();
            }
        } else {
            die('Execute failed: ' . $stmt->error);
        }
    }
    public function createPolicy($courseId, $courseName, $policyTitle, $policyDescription){
        $query = "INSERT INTO course_policy (Course_ID, Course_Name, Policy_Title, Policy_Description) VALUES (?, ?, ?, ?)";
        $stmt = $this->mysqli->prepare($query);
        if (!$stmt) {
            return false; // Query preparation failed
        }
        $stmt->bind_param('isss', $courseId, $courseName, $policyTitle, $policyDescription);
        if ($stmt->execute()) {
            $stmt->close();
            return true; // Successful execution
        } else {
            $stmt->close();
            return false; // Execution failed
        }
    }
    public function getCoursePolicies($courseId) {
    // Get the course_name from the user (you might need to validate and sanitize the input)
    $query = "SELECT * FROM course_policy WHERE Course_ID = ?";
    $stmt = $this->mysqli->prepare($query);
 
    if (!$stmt) {
        return false; // Query preparation failed
    }
 
    $stmt->bind_param('i', $courseId);
 
    if ($stmt->execute()) {
        $result = $stmt->get_result();
 
        $policies = $result->fetch_all(MYSQLI_ASSOC);
 
        $stmt->close();
 
        return $policies;
    } else {
        $stmt->close();
        return false; // Execution failed
    }
}
 
    
    public function updateCoursePolicy($newPolicyTitle, $newPolicyDescription, $policyID) { 
        $query = "UPDATE course_policy SET Policy_Title = ?, Policy_Description = ? WHERE Policy_ID = ?";
        //"UPDATE course_policy SET Policy_Title = ?, Policy_Description = ? WHERE Policy_ID = ?";
        $stmt = $this->mysqli->prepare($query);
        if (!$stmt) {
            return false; // Query preparation failed
        }
        $stmt->bind_param('ssi', $newPolicyTitle, $newPolicyDescription, $policyID);
        if ($stmt->execute()) {
            $stmt->close();
            return true; // Successful execution
        } else {
            $stmt->close();
            return false; // Execution failed
        }
    }
    public function deleteCoursePolicy($policyID) {
    $query = "DELETE FROM course_policy WHERE Policy_ID = ?";
    $stmt = $this->mysqli->prepare($query);
 
    if (!$stmt) {
        return false; // Query preparation failed
    }
 
    $stmt->bind_param('i', $policyID);
 
    if ($stmt->execute()) {
        $stmt->close();
        return true; // Successful execution
    } else {
        $stmt->close();
        return false; // Execution failed
    }
}
 
    
    public function createFeedbackForm($formName, $courseId) {
    $query = "INSERT INTO forms (Form_Name, Course_ID) VALUES (?, ?)";
    $stmt = $this->mysqli->prepare($query);
 
    if (!$stmt) {
        return false; // Query preparation failed
    }
 
    $stmt->bind_param('si', $formName, $courseId);
 
    if ($stmt->execute()) {
        $stmt->close();
        return true; // Successful execution
    } else {
        $stmt->close();
        return false; // Execution failed
    }
}
 
 
    public function addQuestionToForm($formId, $questionText) {
        $query = "INSERT INTO questions (Form_ID, Question_Text) VALUES (?, ?)";
        $stmt = $this->mysqli->prepare($query);
 
        if (!$stmt) {
            return false; // Query preparation failed
        }
 
        $stmt->bind_param('is', $formId, $questionText);
 
        if ($stmt->execute()) {
            $stmt->close();
            return true; // Successful execution
        } else {
            $stmt->close();
            return false; // Execution failed
        }
    }
 
public function getFeedbackForms($courseId) {
    $query = "SELECT f.Form_ID, f.Form_Name, q.Question_Text FROM forms f 
              LEFT JOIN questions q ON f.Form_ID = q.Form_ID 
              WHERE f.Course_ID = ?";
    echo "Query: $query";
    $stmt = $this->mysqli->prepare($query);
 
    if (!$stmt) {
        return false; // Query preparation failed
    }
 
    $stmt->bind_param('i', $courseId);
 
    if ($stmt->execute()) {
        //
    } else {
        $stmt->close();
        return false; // Execution failed
    }
}

public function getDaoReports($instructorId) {
    $query = "SELECT c.Course_Name, AVG(e.Score) AS Average_Marks
              FROM Courses c
              LEFT JOIN Exam_Results e ON c.Course_ID = e.Course_ID
              WHERE c.Instructor_ID = ?
              GROUP BY c.Course_ID";
 
    $stmt = $this->mysqli->prepare($query);
 
    if (!$stmt) {
        die('Prepare failed: ' . $this->mysqli->error);
    }
 
    $stmt->bind_param('i', $instructorId);
 
    if ($stmt->execute()) {
        $result = $stmt->get_result();
        $reports = $result->fetch_all(MYSQLI_ASSOC);
        $stmt->close();
        return $reports;
    } else {
        $stmt->close();
        return false; // Execution failed
    }
}
}