/**
 * Category functions 
 */
(function(App) {
    var editLinks = document.querySelectorAll(".edit");
    var click;
    var i;

    for (i = 0; i < editLinks.length; i +=1) {
        click = new App.Event();
    
        click.on(editLinks[i], 'click', function() {
           alert('Hola'); 
        });
    }
    
    
})(Application);