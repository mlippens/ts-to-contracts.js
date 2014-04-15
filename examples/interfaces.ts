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
    beforeSend?: (jqxhr: string) => void;
    success?: (modelOrCollection?: any, response?: any, options?: any) => void;
    error?: (modelOrCollection?: any, jqxhr?: string, options?: any) => void;
}