/**
 * Utitlities for handling events and Ajax Calls
 */
var Application = Application || {};

Application.Event = function() {
    
    this.on = function(element, eventName, callback) {
       if (element.addEventListener) {
           element.addEventListener(eventName, callback, false);
        } else if (element.attachEvent) { // IE
            element.attachEvent('on' + eventName, callback);
        } else {
            element['on' + eventName] = callback;
        }
    };
    
    this.off = function(element, eventName) {
        if (element.addEventListener) {
            element.removeEventListener(eventName);
         } else if (element.attachEvent) { // IE
             element.removeEvent('on' + eventName);
         } else {
             element['on' + eventName] = null;
         }
     };
};

/**
 * @param Object options
 *  method: GET or POST
 *  url: Target URL
 *  asynchronous: Wether the call is asynchronous or not
 *  success: Callback to be executed when the Ajax request succeeds
 *  error: Callback to be executed when the Ajax request fails
 */
Application.Request = function(options) {
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
