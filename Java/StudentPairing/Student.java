import java.util.*;

public class Student {
   public String name;
   public Set<String> avoids;
   public Student currentMatch;
   public double rank;
   public Set<String> seen;
   public Set<String> wants;
   
   public Student(String name, double rank) {
      this.name = name;
      this.rank = rank;
      avoids = new HashSet<String>();
      currentMatch = null;
      seen = new HashSet<String>();
      wants = new HashSet<String>();
   }
}