#include <string>
#include <fstream>
#include <iostream>
#include <queue>
#include <list>

#include "scheduling.h"

using namespace std;

pqueue_arrival read_workload(string filename)
{

  pqueue_arrival workload;
  ifstream inFile;
  inFile.open(filename);
  int arrival;
  int duration;

  cout << filename << endl;

  if (!inFile) {
      //cout << "Can't find file" << endl;
      return workload;
  }

  while (inFile >> arrival && inFile >> duration) {
      Process p;
      p.arrival = arrival;
      p.duration = duration;

      //cout << "process arrival: " << p.arrival << ", duration: " << p.duration << endl;

      workload.push(p);
  }

  inFile.close();

  return workload;
}

void show_workload(pqueue_arrival workload)
{
  pqueue_arrival xs = workload;
  cout << "Workload:" << endl;
  while (!xs.empty())
  {
    Process p = xs.top();
    cout << '\t' << p.arrival << ' ' << p.duration << endl;
    xs.pop();
  }
}

void show_processes(list<Process> processes)
{
  list<Process> xs = processes;
  cout << "Processes:" << endl;
  while (!xs.empty())
  {
    Process p = xs.front();
    cout << "\tarrival=" << p.arrival << ", duration=" << p.duration
         << ", first_run=" << p.first_run << ", completion=" << p.completion << endl;
    xs.pop_front();
  }
}

list<Process> fifo(pqueue_arrival workload)
{
  list<Process> complete;
  int currentTime = 0;
  while (!workload.empty()) {
      Process p = workload.top();
      p.first_run = currentTime;
      currentTime = currentTime + p.duration;
      p.completion = currentTime;
      workload.pop();
      complete.push_back(p);
  }
  return complete;
}

list<Process> sjf(pqueue_arrival workload)
{
  list<Process> complete;
  list<Process> to_run;
  pqueue_duration d;
  
  int currentTime = 0;
  
  while (!workload.empty() || !to_run.empty()) {
      Process current;
      while (!workload.empty() && workload.top().arrival <= currentTime) {
         d.push(workload.top());
         workload.pop();
      }
      
      while (!d.empty()) {
         to_run.push_back(d.top());
         d.pop();
      }
      
      if (!to_run.empty()) {
         current = to_run.front();
         to_run.pop_front();
         current.first_run = currentTime;
         currentTime = currentTime + current.duration;
         current.completion = currentTime;
         complete.push_back(current);
      }
  }
  return complete;
}

list<Process> stcf(pqueue_arrival workload)
{
  list<Process> complete;
  pqueue_duration d;
  int currentTime = 0;
  
  while (!workload.empty() || !d.empty()) {
      while (!workload.empty() && workload.top().arrival <= currentTime) {
         Process current = workload.top();
         current.first_run = -1;
         d.push(current);
         workload.pop();
      }
      
      if (!d.empty()) {
         Process current = d.top();
         d.pop();
         
         if (current.first_run == -1) {
            current.first_run = currentTime;
         }
         
         current.duration = current.duration - 1;
         
         if (current.duration == 0) {
            current.completion = currentTime + 1;
            complete.push_back(current);
         } else {
            d.push(current);
         }
      }
      
      currentTime = currentTime + 1;
  }
  return complete;
}

list<Process> rr(pqueue_arrival workload)
{
    list<Process> complete;
    list<Process> to_run;
    
    int currentTime = 0;
    
    while (!workload.empty() || !to_run.empty()) {
      Process current;
      if (!workload.empty() && workload.top().arrival <= currentTime) {
         current = workload.top();
         workload.pop();
         current.first_run = currentTime;
      } else {
         current = to_run.front();
         to_run.pop_front();
      }
      
      currentTime = currentTime + 1;
      current.duration = current.duration - 1;
      
      if (current.duration == 0) {
         current.completion = currentTime;
         complete.push_back(current);
      } else {
         to_run.push_back(current);
      }
    }
    
    
    return complete;
}

float avg_turnaround(list<Process> processes)
{
    float *total;
    total = (float *)malloc(sizeof(float));
    *total = 0;
    for (Process p : processes) {
        *total = *total + (p.completion - p.arrival);
    }
    if (processes.size() > 0) {
        *total = *total / processes.size();
    }
    return *total;
}

float avg_response(list<Process> processes)
{
    float *total;
    total = (float *)malloc(sizeof(float));
    *total = 0;
    for (Process p : processes) {
        *total = *total + (p.first_run - p.arrival);
    }
    if (processes.size() > 0) {
        *total = *total / processes.size();
    }

    return *total;
}

void show_metrics(list<Process> processes)
{
  float avg_t = avg_turnaround(processes);
  float avg_r = avg_response(processes);
  show_processes(processes);
  cout << '\n';
  cout << "Average Turnaround Time: " << avg_turnaround(processes) << endl;
  cout << "Average Response Time:   " << avg_response(processes) << endl;
}
