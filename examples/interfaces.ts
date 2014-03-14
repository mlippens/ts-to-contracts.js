interface Foo {
    bar?: string;
    foo: boolean;
}

interface PersistenceOptions {
    url?: string;
    beforeSend?: (jqxhr: JQueryXHR) => void;
    success?: (modelOrCollection?: any, response?: any, options?: any) => void;
    error?: (modelOrCollection?: any, jqxhr?: JQueryXHR, options?: any) => void;
}