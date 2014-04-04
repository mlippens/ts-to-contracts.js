<%= className %>Proxy = function(){ <%= className %>.apply(this, arguments);};
<%= className %>Proxy.prototype = Object.create(<%= className %>.prototype);

