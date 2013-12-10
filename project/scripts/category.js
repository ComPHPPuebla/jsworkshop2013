/**
 * Category functions 
 */
(function() {
    var Category = function(service) {
        var q = new Query();
        var category = this;

        this.populateForm = function(category) {
            q.findOne('#name').value(category.name);
            q.findOne('#short-description').value(category.short_description);
        };

        this.populateTable = function(categories) {
            var tbody = q.findOne('.category-list tbody');
            var template = '<tr data-js-id="{{category_id}}"> \
                                <td>{{name}}</td> \
                                <td>{{description}}</td> \
                                <td> \
                                    <a href="#" class="category-edit">Edit</a></td> \
                            </tr>';

            categories.forEach(function(category) {
                var html = template.replace('{{category_id}}', category.category_id)
                                   .replace('{{name}}', category.name)
                                   .replace('{{description}}', category.short_description);
                tbody.appendHtml(html);
            });

            q.findAll('.category-edit').click(category.onEdit);
        };

        this.onEdit = function(e) {
            var tr = this.parentNode.parentNode;
            var categoryId = tr.getAttribute('data-js-id');

            e.preventDefault();

            service.fetchById(categoryId, category.populateForm);
        };
    };

    var CategoryService = function() {
        var baseUrl = 'http://admin.comunidadphppuebla.com/api';

        this.fetchAll = function(callback) {
            var request = new Request();

            request.sendJsonp(
                baseUrl + '/categories',
                callback
            );
        };
        this.fetchById = function(id, callback) {
            var request = new Request();

            request.sendJsonp(
                baseUrl + '/categories/' + id,
                callback
            );
        };
    };

    var CategoryController = function() {
        var service = new CategoryService();
        var category = new Category(service);
        var q = new Query();

        this.init = function() {
            q.findOne('#category-save').hide();
            q.findOne('#category-delete').hide();

            this.list();
        };

        this.list = function() {
            service.fetchAll(category.populateTable);
        };
    };

    var controller = new CategoryController();
    controller.init();

    var categoryNewButton = document.getElementById('category-new');
    newCategoryClick = new Event();
    newCategoryClick.on('click', categoryNewButton, function(e) {
        var request, form, queryString;

        e.preventDefault();

        form = new Form();
        queryString = form.serialize(document.getElementById('category-form'));

        request = new Request();
        request.sendJsonp(
            'http://admin.comunidadphppuebla.com/api/categories/save' + queryString, 
            function(response) {
                alert('Acabas de insertar una categoría con id= ' + response.category_id);
                console.log(category);
            }
        );

    });
    
})();
