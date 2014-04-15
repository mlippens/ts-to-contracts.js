/**
 * Created by mello on 4/15/14.
 */
import validation = require('./Validation');
var lettersRegexp = /^[A-Za-z]+$/;

export class LettersOnlyValidator implements validation.StringValidator {
    isAcceptable(s:string) {
        return lettersRegexp.test(s);
    }
}
