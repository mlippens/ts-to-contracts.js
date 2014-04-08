interface ModelSetOptions extends Silenceable, Validable {
}

interface ModelFetchOptions extends PersistenceOptions, ModelSetOptions, Parseable {
}

interface Silenceable {
    silent?: boolean;
}

interface Validable {
    validate?: boolean;
}

interface Parseable {
    parse?: any;
}

interface PersistenceOptions {
    url?: string;
    beforeSend?: (jqxhr: JQueryXHR) => void;
    success?: (modelOrCollection?: any, response?: any, options?: any) => void;
    error?: (modelOrCollection?: any, jqxhr?: JQueryXHR, options?: any) => void;
}