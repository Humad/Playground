$("#urlSubmitForm").on("submit", function(event) {

    console.log("Form submitted");
    event.preventDefault();

    var url = $("#urlInput").val();

    $.ajax({
        type: "POST",
        url: "/findUrl",
        data: {url: url},
        success: function(data) {
            console.log("Success ajax")
            console.log(data)
        },
        error: function(error) {
            console.log("Fail ajax")
            console.log(error)
        }
    })
});
