import java.util.*;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

public class PairMaker {
   
   public static void main(String[] args) {
      JSONParser parser = new JSONParser();
      Set<Student> unmatchedStudents = new HashSet<Student>();
      List<Student> allStudents = new ArrayList<Student>();

        try {     
        
            // Read JSON file
            Object obj = parser.parse(new FileReader("./student_data.json"));
            JSONObject jsonObject = (JSONObject) obj;
            
            JSONArray students = (JSONArray) jsonObject.get("students");
            Iterator<JSONObject> studentIterator = students.iterator();
            
            while (studentIterator.hasNext()) {
               JSONObject student = (JSONObject) studentIterator.next();
               String name = (String) student.get("Name");
               
               double bucketValue;
               
               if (student.get("Bucket") instanceof Long) {
                  bucketValue = ((Long) student.get("Bucket")).doubleValue();
               } else {
                  bucketValue = (double) student.get("Bucket");
               }
               
               Student newStudent = new Student(name, bucketValue);
               
               JSONArray avoids = (JSONArray) student.get("Avoids");
               Iterator<String> avoidsIterator = avoids.iterator();
               
               while (avoidsIterator.hasNext()) {
                  String avoid = avoidsIterator.next();
                  newStudent.avoids.add(avoid);
               }
               
               allStudents.add(newStudent);
               unmatchedStudents.add(newStudent);
            }
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (ParseException e) {
            e.printStackTrace();
        }
        
        createPairs(unmatchedStudents, allStudents);
        printResults(allStudents);
   }
   
   public static void createPairs(Set<Student> unmatchedStudents, List<Student> allStudents) {
      
      // While there are still unmatched students
      while (!unmatchedStudents.isEmpty()) {
         Student currentStudent = getRandomStudent(unmatchedStudents);
         
         // While this student has not been matched
         while (currentStudent.currentMatch == null) {
         
            // Get a potential match from the set of all students
            Student potentialMatch = getPotentialMatch(currentStudent, allStudents);
            
            // Both are unmatched
            if (isPossibleToMatch(currentStudent, potentialMatch)) {
            
               // Remove from unmatched set
               if (unmatchedStudents.contains(currentStudent)) {
                  unmatchedStudents.remove(currentStudent);
               }
               
               if (unmatchedStudents.contains(potentialMatch)) {
                  unmatchedStudents.remove(potentialMatch);
               }
            
               // Match students
               currentStudent.currentMatch = potentialMatch;
               potentialMatch.currentMatch = currentStudent;
               
             
            } else if (prefers(currentStudent, potentialMatch)) { // Matched but would prefer other
            
               // Unmatch previous
               potentialMatch.currentMatch.currentMatch = null;
               unmatchedStudents.add(potentialMatch.currentMatch);
               
               // Remove from unmatched set
               if (unmatchedStudents.contains(currentStudent)) {
                  unmatchedStudents.remove(currentStudent);
               }
               
               if (unmatchedStudents.contains(potentialMatch)) {
                  unmatchedStudents.remove(potentialMatch);
               }
               
               // Match students
               currentStudent.currentMatch = potentialMatch;
               potentialMatch.currentMatch = currentStudent;
            }
            
         }
      }
   }
   
   public static Student getRandomStudent(Set<Student> unmatchedStudents) {
   
      // Pick out first student from set
      for (Student s : unmatchedStudents) {
         return s;
      }
      
      return null;
   }
   
   
   public static Student getPotentialMatch(Student currentStudent, List<Student> allStudents) {
   
      // Shuffle all students, return first potential one
      Collections.shuffle(allStudents);
      for(Student student : allStudents) {
      
        if (!currentStudent.seen.contains(student.name) && currentStudent != student) {
        
            // Both students have now seen each other, prevents checking them again
            currentStudent.seen.add(student.name);
            student.seen.add(currentStudent.name);
            return student;
        }
      }
      
      return getPotentialMatch(currentStudent, allStudents);
   } 
   
   
   public static boolean isPossibleToMatch(Student currentStudent, Student potentialMatch) {
      // Both are unmatched, both do NOT want to avoid each other
      return potentialMatch.currentMatch == null && !currentStudent.avoids.contains(potentialMatch.name) && !potentialMatch.avoids.contains(currentStudent.name);
   }
   
   public static boolean prefers(Student currentStudent, Student potentialMatch) {
      // Potential student is matched but prefers current student over current match
      return potentialMatch.currentMatch != null && Math.abs(potentialMatch.rank - potentialMatch.currentMatch.rank) < Math.abs(potentialMatch.rank - currentStudent.rank) && !potentialMatch.avoids.contains(currentStudent.name) && !currentStudent.avoids.contains(potentialMatch.name);
   }
   
   public static void printResults(List<Student> allStudents) {
   
      Set<String> seenNames = new HashSet<String>();
   
      for (Student s : allStudents) {
         if (!seenNames.contains(s.name)) {
            System.out.println(s.name + " matched with " + s.currentMatch.name);
            seenNames.add(s.currentMatch.name);
         }
      }
      
      System.out.println(seenNames.size() + " pairs created");
   }
}

