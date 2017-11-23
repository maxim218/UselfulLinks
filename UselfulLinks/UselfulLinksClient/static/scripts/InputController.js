"use strict";

export default class InputController {
    constructor() {
        this.normalChars = "abcdefghijklmnopqrstuvwxyz_0123456789";
    }

    isNormalChar(c) {
        c = c.toLowerCase();
        for(let i = 0; i < this.normalChars.length; i++) {
            if(c === this.normalChars.charAt(i)) {
                return true;
            }
        }
        return false;
    }

    typeString(s) {
        if(s.length === 0) {
            return "EMPTY";
        }

        for(let i = 0; i < s.length; i++) {
            const c = s.charAt(i);
            if(this.isNormalChar(c) === false) {
                return "NO_CORRECT";
            }
        }

        return "OK";
    }
}
