package com.example.android.justjava;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.CheckBox;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import java.text.NumberFormat;

import static android.R.attr.order;
import static android.R.attr.y;
import static android.R.id.message;

/**
 * This app displays an order form to order coffee.
 */
public class MainActivity extends AppCompatActivity {

    private int quantity;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        quantity = 1;
    }

    /**
     * This method is called when the order button is clicked.
     */
    public void submitOrder(View view) {
        int price = calculatePrice(4);
        showOrderSummary(price);
    }

    /**
     * This method displays the given quantity value on the screen.
     */
    private void display(int number) {
        TextView quantityTextView = (TextView) findViewById(R.id.quantity_text_view);
        quantityTextView.setText("" + number);
    }

    public void decrement(View view){
        if (quantity > 0){
            quantity--;
            display(quantity);
        } else {
            Toast.makeText(this, "You aren't thinking straight. Maybe you've had too much coffee",
                    Toast.LENGTH_SHORT).show();
        }
    }

    public void increment(View view){
        if (quantity < 100){
            quantity++;
            display(quantity);
        } else {
            Toast.makeText(this, "Too much coffee is bad for you!", Toast.LENGTH_SHORT).show();
        }

    }

    /**
     * This method displays the given text on the screen.
     */
    private void showOrderSummary(int price) {
        TextView orderSummaryTextView = (TextView) findViewById(R.id.order_summary_text_view);
        String userName = ((EditText) findViewById(R.id.user_name)).getText().toString();
        boolean hasWhippedCream = ((CheckBox) findViewById(R.id.whipped_cream_checkbox)).isChecked();

        if (hasWhippedCream){
            price += (quantity);
        }

        boolean hasChocolate = ((CheckBox) findViewById(R.id.chocolate_checkbox)).isChecked();

        if (hasChocolate){
            price += (quantity * 2);
        }

        // getString(R.string.app_name);
        String orderSummary = "Name: " + userName + "\nQuantity: " + quantity + "\nAdd whipped cream? "
                + hasWhippedCream + "\nAdd chocolate? " + hasChocolate + "\nPrice: $" + price + "\nThank you!";

        sendEmail(orderSummary);
    }

    public void sendEmail(String orderSummary){
        String[] addresses = new String[1];
        addresses[0] = "myemail@gmail.com";
        Intent intent = new Intent(Intent.ACTION_SENDTO);
        intent.putExtra(Intent.EXTRA_EMAIL, addresses);
        intent.putExtra(Intent.EXTRA_SUBJECT, "Your coffee order");
        intent.putExtra(Intent.EXTRA_TEXT, orderSummary);
        if (intent.resolveActivity(getPackageManager()) != null) {
            startActivity(intent);
        }
    }

    private int calculatePrice(int price){
        return quantity * price;
    }
}