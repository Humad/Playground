package com.example.android.scoretracker;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.TextView;

public class MainActivity extends AppCompatActivity {

    int scoreTeamA;
    int scoreTeamB;
    TextView teamADisplay;
    TextView teamBDisplay;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        scoreTeamA = 0;
        scoreTeamB = 0;
        teamADisplay = (TextView) findViewById(R.id.team_A_score);
        teamBDisplay = (TextView) findViewById(R.id.team_B_score);
    }

    // to-do: check how to pass parameters through xml
    public void add(View view){
        switch (view.getId()){
            case R.id.add_one_team_A:
                scoreTeamA++;
                break;
            case R.id.add_one_team_B:
                scoreTeamB++;
                break;
            case R.id.add_two_team_A:
                scoreTeamA += 2;
                break;
            case R.id.add_two_team_B:
                scoreTeamB += 2;
                break;
            default:
                break;
        }
        updateDisplay();
    }

    public void updateDisplay(){
        teamADisplay.setText("" + scoreTeamA);
        teamBDisplay.setText("" + scoreTeamB);
    }

    public void resetEverything(View view){
        scoreTeamA = 0;
        scoreTeamB = 0;
        updateDisplay();
    }
}
