/**
 * Category functions 
 */
(function() {
    var editLinks = document.querySelectorAll(".edit");
    var editBtn = document.querySelectorAll(".editBtn");
    var click;
    var i;

    document.getElementById("categorySave").style.display="none";
    document.getElementById("categoryDelete").style.display="none";

    for (i = 0; i < editLinks.length; i +=1) {
        click = new Event();

        click.on('click', editLinks[i], function(e) {
            var request = new Request();

            e.preventDefault();

            request.sendJsonp(
                'http://admin.comunidadphppuebla.com/api/categories',
                function(response) {
                    console.log(response);
                }
            );
        });
    }

    for (i = 0; i < editBtn.length; i +=1 ) {
        click = new Event();

        click.on('click', editBtn[i], function() {
            document.getElementById('categoryNew').style.display = "none";
            document.getElementById('categoryDelete').style.display = "inline";
            document.getElementById('categorySave').style.display="inline";
        });
    }
})();
