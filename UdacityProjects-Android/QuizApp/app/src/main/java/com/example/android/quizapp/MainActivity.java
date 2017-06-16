package com.example.android.quizapp;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.CheckBox;
import android.widget.RadioButton;
import android.widget.Toast;

public class MainActivity extends AppCompatActivity {

    private int score;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        score = 0;
        setContentView(R.layout.activity_main);
    }

    public void submit(View view){

        boolean isCorrect = ((CheckBox) findViewById(R.id.correct1)).isChecked()
                && ((CheckBox) findViewById(R.id.correct2)).isChecked();

        updateScore(isCorrect);

        isCorrect = ((RadioButton) findViewById(R.id.correct3)).isChecked();

        updateScore(isCorrect);

        isCorrect = ((RadioButton) findViewById(R.id.correct4)).isChecked();

        updateScore(isCorrect);

        isCorrect = ((RadioButton) findViewById((R.id.correct5))).isChecked();

        updateScore(isCorrect);

        Toast.makeText(this, "You scored " + score + " out of 4", Toast.LENGTH_SHORT).show();
        score = 0;
    }

    private void updateScore(boolean correct){
        if (correct){
            score++;
        }
    }

    public void reset(View view){
        score = 0;
        setContentView(R.layout.activity_main);
    }
}
