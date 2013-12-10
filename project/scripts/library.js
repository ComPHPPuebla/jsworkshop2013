/**
 * Utitlities for handling events and Ajax Calls
 */
var Event = function() {
    
    this.on = function(eventName, element, callback) {
       if (element.addEventListener) {
           element.addEventListener(eventName, callback, false);
        } else if (element.attachEvent) { // IE
            element.attachEvent('on' + eventName, callback);
        } else {
            element['on' + eventName] = callback;
        }
    };
    
    this.off = function(eventName, element) {
        if (element.addEventListener) {
            element.removeEventListener(eventName);
         } else if (element.attachEvent) { // IE
             element.removeEvent('on' + eventName);
         } else {
             element['on' + eventName] = null;
         }
     };
};

var Request = function() {
    var unique = 0;

    /**
     * @param string url
     * @param function callback
     * @param object context Defaults to window
     */
    this.sendJsonp  = function(url, callback, context) {
        var name = "_jsonp_" + unique++;
        var script = document.createElement('script');

        if (url.match(/\?/)) {
            url += "&callback=" + name;
        } else {
            url += "?callback=" + name;
        }

        script.type = 'text/javascript';
        script.src = url;

        window[name] = function(request) {
            callback.call((context || window), request);
            document.getElementsByTagName('head')[0].removeChild(script);
            script = null;
            delete window[name];
        };

        document.getElementsByTagName('head')[0].appendChild(script);
    };

    /**
     * @param Object options {
     *      method: GET or POST
     *      url: Target URL
     *      asynchronous: Wether the call is asynchronous or not
     *      success: Callback to be executed when the Ajax request succeeds
     *      error: Callback to be executed when the Ajax request fails
     *  }
     */
    this.send = function(options) {
        var xhr = new XMLHttpRequest();

        options.error = options.error || function() {};

        xhr.onreadystatechange = (function(request, options) {
    
            return function() {
                if (request.readyState < 4) {
                    return; // not ready yet
                }
                if (request.status !== 200) {
                    options.error.apply(null, [request]); // the HTTP status code is not OK
                    return;
                }
                options.success.apply(null, [request]);
            };
        })(xhr, options);

        xhr.open(options.method, options.url, options.asynchronous);
        xhr.send('');
    };
};

var Form = function() {
    this.serialize = function(form) {
        var queryString = '';
        var i, j, q = [];

        if (!form || form.nodeName !== "FORM") {
            return;
        }

        for (i = form.elements.length - 1; i >= 0; i = i - 1) {
            var element = form.elements[i];

            if (element.name === "") {
                continue;
            }

            switch (element.nodeName) {
                case 'INPUT':
                    switch (element.type) {
                        case 'text':
                        case 'hidden':
                        case 'password':
                            q.push(element.name + "=" + encodeURIComponent(element.value));
                            break;
                        case 'checkbox':
                        case 'radio':
                            if (element.checked) {
                                q.push(element.name + "=" + encodeURIComponent(element.value));
                            }
                            break;
                    }
                    break;
                case 'TEXTAREA':
                    q.push(element.name + "=" + encodeURIComponent(element.value));
                    break;
                case 'SELECT':
                    switch (element.type) {
                        case 'select-one':
                            q.push(element.name + "=" + encodeURIComponent(element.value));
                            break;
                        case 'select-multiple':
                            for (j = element.options.length - 1; j >= 0; j = j - 1) {
                                if (element.options[j].selected) {
                                    q.push(element.name + "=" + encodeURIComponent(element.options[j].value));
                                }
                            }
                            break;
                    }
                    break;
            }
        }

        if (q.length > 0) {
            queryString = '?' + q.join('&');
        }

        return queryString;
    };
};

var Element = function(element) {
    this.click = function (callback) {
        var click = new Event();

        click.on('click', element, callback);
    };

    this.hide = function() {
        element.style.display = 'none';
    };

    this.value = function(value) {
        element.value = value;
    };

    this.html = function(html) {
        element.innerHTML = html;
    };

    this.appendHtml = function(html) {
        element.innerHTML += html;
    };
};

var ElementCollection = function(elements) {
    this.click = function(callback) {
        [].forEach.call(elements, function(node) {
            var element = new Element(node);

            element.click(callback);
        });
    };
};

var Query = function() {
    this.findOne = function(selector) {
        return new Element(document.querySelector(selector));
    };
    this.findAll = function(selector) {
        return new ElementCollection(document.querySelectorAll(selector));
    };
};
