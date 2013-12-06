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

    var categoryNewButton = document.getElementById('categoryNew');
    newCategoryClick = new Event();
    newCategoryClick.on('click', categoryNewButton, function(e) {
        var request = new Request();
        var name, shortDescription,queryString;
        
        e.preventDefault();
        
        name = document.getElementById('name').value;
        shortDescription = document.getElementById('short-description').innerHtml;
        queryString = '?name=' + name + '&short_description=' + shortDescription;
                
        request.sendJsonp(
            'http://admin.comunidadphppuebla.com/api/categories/save' + queryString, 
            function(response) {
                alert('Acabas de insertar una categoría con id= ' + response.category_id);
                console.log(category);
            }
        );
        
    });
    
})();

//(function(name) {alert(name);})('Luis');
