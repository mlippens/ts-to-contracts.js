/**
 * Created by mello on 4/15/14.
 */
import validation = require('./Validation');

var numberRegexp = /^[0-9]+$/;

export class ZipCodeValidator implements validation.StringValidator {
    isAcceptable(s:string) {
        return s.length === 5 && numberRegexp.test(s);
    }
}
