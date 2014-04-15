/**
 * Created by mello on 4/15/14.
 */
/// <reference path="Validation.ts" />
module Validation {
    var lettersRegexp = /^[A-Za-z]+$/;

    export class LettersOnlyValidator implements StringValidator {
        isAcceptable(s: string) {
            return lettersRegexp.test(s);
        }
    }
}