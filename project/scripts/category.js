/**
 * Category functions 
 */
(function() {
    var Category = function(service) {
        var q = new Query();
        var category = this;
        var template = '<tr data-js-id="{{category_id}}"> \
                            <td>{{name}}</td> \
                            <td>{{description}}</td> \
                            <td> \
                                <a href="#" class="category-edit">Edit</a> \
                            </td> \
                        </tr>';

        this.populateForm = function(category) {
            q.findOne('#name').value(category.name);
            q.findOne('#short-description').value(category.short_description);
            q.findOne('#category-id').value(category.category_id);
            q.findOne('#category-save').show();
            q.findOne('#category-delete').show();
            q.findOne('#category-new').hide();
        };

        this.populateTable = function(categories) {
            var tbody = q.findOne('.category-list tbody');

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

        this.appendToTable = function(category) {
            var tbody = q.findOne('.category-list tbody');
            var html = template.replace('{{category_id}}', category.category_id)
                               .replace('{{name}}', category.name)
                               .replace('{{description}}', category.short_description);

            tbody.appendHtml(html);
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
        this.update = function(id, values, callback) {
            var request = new Request();

            request.sendJsonp(
                baseUrl + '/categories/' + id + '/update' + values,
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

            q.findOne('#category-save').click(this.update);
        };

        this.list = function() {
            service.fetchAll(category.populateTable);
        };

        this.update = function(e) {
            var form = new Form();
            var queryString = form.serialize(document.getElementById('category-form'));
            var categoryId = q.findOne('#category-id').value();

            e.preventDefault();

            service.update(categoryId, queryString, category.appendToTable);
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
