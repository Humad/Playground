package com.example.humadshah.shakedetector;

import android.hardware.SensorEventListener;
import android.hardware.SensorManager;
import android.hardware.Sensor;
import android.hardware.SensorEvent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.TextView;

import java.util.ArrayList;
import java.util.List;

public class MainActivity extends AppCompatActivity implements SensorEventListener {

    private SensorManager sensorManager;

    // Views that need to be updated
    TextView threeDeeValues;
    TextView shakeStatus;
    TextView pressureStatus;

    // Buffers to hold acceleration values
    List<Float> axBuffer, ayBuffer, azBuffer;

    EditText shakeThreshold;
    double shakeThresholdValue;
    boolean isStart, barEnabled;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // Initialize and sensors and register listeners
        sensorManager = (SensorManager) getSystemService(SENSOR_SERVICE);
        sensorManager.registerListener(this, sensorManager.getDefaultSensor(Sensor.TYPE_ACCELEROMETER), 100000);
        sensorManager.registerListener(this, sensorManager.getDefaultSensor(Sensor.TYPE_PRESSURE), 200000);

        // Initialize text views
        threeDeeValues = findViewById(R.id.AccValues);
        shakeStatus = findViewById(R.id.ShakeValue);
        shakeThreshold = findViewById(R.id.ShakeThresholdValue);
        pressureStatus = findViewById(R.id.PressureValue);

        // Initialize buffers
        axBuffer = ayBuffer = azBuffer = new ArrayList<Float>();

        shakeThresholdValue = 0.0;
        isStart = false;
        barEnabled = false;
    }

    public void startDetection(View view) {
        isStart = true;
    }

    public void stopDetection(View view) {
        isStart = false;
        threeDeeValues.setText("{}");
        shakeStatus.setText("no shake");
    }

    public void enableBarometer(View view) { barEnabled = true; }

    public float averageValue(List<Float> buffer) {
        float sum = 0;

        for (float f : buffer) {
            sum += f;
        }

        return sum / buffer.size();
    }

    // Update accelerometer values
    public void updateAccelValues(float ax, float ay, float az) {

        axBuffer.add(ax);
        ayBuffer.add(ay);
        azBuffer.add(az);

        if (axBuffer.size() >= 10 && ayBuffer.size() >= 10 && azBuffer.size() >= 10) {
            float newax = averageValue(axBuffer);
            float neway = averageValue(ayBuffer);
            float newaz = averageValue(azBuffer);

            axBuffer.clear();
            ayBuffer.clear();
            azBuffer.clear();

            threeDeeValues.setText("{" + Math.round (newax * 10000.0) / 10000.0 + ", " +
                    Math.round (neway * 10000.0) / 10000.0 + ", " +
                    Math.round (newaz * 10000.0) / 10000.0 + "}" );

            if (shakeThreshold.getText().toString().length() > 0) {
                shakeThresholdValue = Double.parseDouble(shakeThreshold.getText().toString());
                if (Math.sqrt(newax * newax + neway * neway + newaz * newaz) < shakeThresholdValue) {
                    shakeStatus.setText("no shake");
                } else {
                    shakeStatus.setText("shake");
                }
            } else {
                shakeThresholdValue = 0.0;
                shakeStatus.setText("Enter a value");
            }

        }


    }

    // Update pressure value
    public void updateBarometerValues(float pressure) {
        pressureStatus.setText("" + pressure);
    }

    @Override
    public void onAccuracyChanged(Sensor arg0, int arg1) {
    }

    @Override
    public void onSensorChanged(SensorEvent event) {
        // Accelerometer
        if (event.sensor.getType() == Sensor.TYPE_ACCELEROMETER && isStart) {
            updateAccelValues(event.values[0], event.values[1], event.values[2]);
        }

        // Barometer
        if (event.sensor.getType() == Sensor.TYPE_PRESSURE && barEnabled) {
            updateBarometerValues(event.values[0]);
        }
    }
}
