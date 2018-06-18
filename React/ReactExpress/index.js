const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.get('/api/customers', function(req, res) {
    const customers = [
        {
            id: 1,
            firstName: "John",
            lastName: "Doe"
        },
        {
            id: 3,
            firstName: "Jane",
            lastName: "Deer"
        }
    ];

    res.json(customers);
});

app.listen(port, function() {
    console.log("Server started on port", port);
});