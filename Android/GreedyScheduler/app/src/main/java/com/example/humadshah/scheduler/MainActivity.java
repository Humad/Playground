package com.example.humadshah.scheduler;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.DatePicker;
import android.widget.TextView;
import android.widget.TimePicker;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;

public class MainActivity extends AppCompatActivity {

    ArrayList<Assignment> list = new ArrayList<Assignment>();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

    }

    public void submitAss(View view) {
        TextView assNameView = findViewById(R.id.assName);
        TextView assCompletionTime = findViewById(R.id.assCompletion);
        TimePicker timePicker = findViewById(R.id.timePick);
        DatePicker datePicker = findViewById(R.id.datePick);

        Calendar calendar = Calendar.getInstance();
        calendar.set(datePicker.getYear(), datePicker.getMonth(), datePicker.getDayOfMonth(),
                timePicker.getCurrentHour(), timePicker.getCurrentMinute(), 0);
        long dueTime = calendar.getTimeInMillis();

        long timeToComplete = Integer.parseInt(assCompletionTime.getText().toString()) * 60 * 60 * 1000;

        list.add(new Assignment(assNameView.getText().toString(), dueTime, timeToComplete));

        quickSort(list, 0, list.size() - 1);

        Calendar cal = Calendar.getInstance();
        long currentTime = cal.getTimeInMillis();

        HashMap<String, Long> map = new HashMap<String, Long>();

        for (Assignment a : list) {
            currentTime = currentTime + a.timeToComplete;
            if (currentTime > a.dueDate) {
                map.put(a.name, currentTime - a.dueDate);
            }
        }

        for (String s : map.keySet()) {
            Log.d("result","Assigment: " + s + " was late by " + map.get(s) + " milliseconds");
        }


    }

    public void quickSort(ArrayList<Assignment> list, int low, int high) {
        int i = low;
        int j = high;

        Assignment mid = list.get(low + (high - low) / 2);

        while (i <= j) {
            while (list.get(i).timeToComplete < mid.timeToComplete) {
                i++;
            }

            while (list.get(j).timeToComplete > mid.timeToComplete) {
                j--;
            }

            if (i <= j) {
                Assignment temp = list.get(i);
                list.set(i, list.get(j));
                list.set(j, temp);
                i++;
                j--;
            }
        }

        if (i < high) {
            quickSort(list, i, high);
        }

        if (low < j) {
            quickSort(list, low, j);
        }
    }
}

class Assignment {
    String name;
    long dueDate;
    long timeToComplete;

    public Assignment(String name, long dueDate, long timeToComplete) {
        this.name = name;
        this.dueDate = dueDate;
        this.timeToComplete = timeToComplete;
    }
}
