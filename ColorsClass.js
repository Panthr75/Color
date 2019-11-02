class Color {
    constructor() {}
    
    /**
     * Red Value (Between 0 and 255)
     * @type {Number}
     */
    r

    /**
     * Green Value (Between 0 and 255)
     * @type {Number}
     */
    g

    /**
     * Blue Value (Between 0 and 255)
     * @type {Number}
     */
    b

    /**
     * Alpha Value (Between 0 and 1)
     */
    a


    /**
     * Creates a new Color using the HSV values provided. Numbers must be between (Inclusive) 0 and 1.
     * 
     * Will convert the hsv provided to rgb
     * @param {Number} h Hue
     * @param {Number} s Saturation
     * @param {Number} v Value (Lightness)
     * @param {Number} [a=1] Alpha
     */
    HSV(h, s, v, a = 1) {
        // ## Argument Verification
        if (typeof h !== "number") throw new InvalidArgumentError("Hue specified must be a number");
        if (typeof s !== "number") throw new InvalidArgumentError("Saturation specified must be a number");
        if (typeof v !== "number") throw new InvalidArgumentError("Value/Lightness specified must be a number");
        if (typeof a !== "number") throw new InvalidArgumentError("Alpha specified must be a number");


        if (h < 0 || h > 1) throw new InvalidArgumentError("Hue specified can only be between (Inclusive) values 0 and 1.");
        if (s < 0 || s > 1) throw new InvalidArgumentError("Saturation specified can only be between (Inclusive) values 0 and 1.");
        if (v < 0 || v > 1) throw new InvalidArgumentError("Value/Lightness specified can only be between (Inclusive) values 0 and 1.");
        if (a < 0 || a > 1) throw new InvalidArgumentError("Alpha specified can only be between (Inclusive) values 0 and 1.");


        // Credit: https://stackoverflow.com/a/17243070/9588181
        // Convert HSV to RGB so it can be used easily by programs and the GameEngine
        var r, g, b, i, f, p, q, t;
        if (arguments.length === 1) {
            s = h.s, v = h.v, h = h.h;
        }
        i = Math.floor(h * 6);
        f = h * 6 - i;
        p = v * (1 - s);
        q = v * (1 - f * s);
        t = v * (1 - (1 - f) * s);
        switch (i % 6) {
            case 0: r = v, g = t, b = p; break;
            case 1: r = q, g = v, b = p; break;
            case 2: r = p, g = v, b = t; break;
            case 3: r = p, g = q, b = v; break;
            case 4: r = t, g = p, b = v; break;
            case 5: r = v, g = p, b = q; break;
        }
        
        // ### Set Values
        this.r = Math.round(r * 255);
        this.g = Math.round(g * 255);
        this.b = Math.round(b * 255);
        this.a = a;

        // return this for util
        return this;
    }
    
    /**
     * Creates a new Color using the RGB values provided. Red, Green, and Blue values must be between (Inclusive) 0 and 255.
     * Alpha value must be between (Inclusive) 0 and 1.
     * @param {Number} r Red Value
     * @param {Number} g Green Value
     * @param {Number} b Blue Value
     * @param {Number} [a=1] Alpha
     */
    RGB(r, g, b, a = 1) {
        // ### Argument Verification
        if (typeof r !== "number") throw new InvalidArgumentError("Red Value specified must be a number");
        if (typeof g !== "number") throw new InvalidArgumentError("Green Value specified must be a number");
        if (typeof b !== "number") throw new InvalidArgumentError("Blue Value specified must be a number");
        if (typeof a !== "number") throw new InvalidArgumentError("Alpha specified must be a number");


        if (r < 0 || r > 255) throw new InvalidArgumentError("Red Value specified can only be between (Inclusive) values 0 and 255.");
        if (g < 0 || g > 255) throw new InvalidArgumentError("Green Value specified can only be between (Inclusive) values 0 and 255.");
        if (b < 0 || b > 255) throw new InvalidArgumentError("Blue Value specified can only be between (Inclusive) values 0 and 255.");
        if (a < 0 || a > 1) throw new InvalidArgumentError("Alpha specified can only be between (Inclusive) values 0 and 1.");

        // ### Set Values
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;

        // return this for util
        return this;
    }

    /**
     * Converts this color to string hex
     * @param {Boolean} [hashTag=false] Whether the string should be prefixed with "#"
     * @param {Boolean} [upperCase=true] Whether the string should be uppercase
     * @method
     */
    toHexString(hashTag=false,upperCase=true) {
        let hexValues = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
        // Divide each color chunk into a base 16 system so it can be shown as a hex value
        var ConvertHex = (colorChunk) => {
            return hexValues[Math.floor(colorChunk / hexValues.length)] + hexValues[colorChunk % hexValues.length];
        }
        var r = ConvertHex(this.r);
        var g = ConvertHex(this.g);
        var b = ConvertHex(this.b);
        // include the # in the result if it was specified, then the hex values
        var result = (hashTag ? "#" : "") + r + g + b;

        // turn the result to uppercase if uppercase was specified
        return (upperCase ? result.toUpperCase() : result);
    }

    
    /**
     * Converts this color to a string seperated by the seperator specified as "r" "g" "b"
     * @param {String} [seperator=", "] The string that will seperate each item. If not specified, will default to ", "
     * @example
     * // returns "17, 17, 17"
     * new Color().RGB(1, 1, 1).toRGBString();
     * @example
     * // returns "255|255|255"
     * new Color().RGB(255, 255, 255).toRGBString("|");
     */
    toRGBString(seperator=", ") {
        // ### Argument Verification
        if (typeof seperator !== 'string') throw new InvalidArgumentError("Seperator specified must be a string.");

        // ### Main
        return [this.r, this.g, this.b].join(seperator)
    }

    /**
     * Converts the string to a color
     * @param {String} string the color string containing hex values
     * @param {Number} [a=1] Alpha (Optional). Defaults to 1. 
     */
    fromString(string, a=1) {
        // ### Tools
        let hexValues = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
        var pos = 0;

        // ### Argument Verification
        if (typeof a !== 'number') throw new InvalidArgumentError("Alpha specified must be a number");
        if (typeof string !== 'string') throw new InvalidArgumentError("String specified must be a string");

        string = string.toLowerCase();

        // remove leading '#' if present
        string = string.startsWith("#") ? string.slice(1, string.length) : string;

        if (a < 0 || a > 1) throw new InvalidArgumentError("Alpha specified must be between (Inclusive) 0 and 1");

        if (string.length != 6 && string.length != 3) throw new InvalidArgumentError("String specified must be made of 6 hex values (RRGGBB) or 3 hex values (RGB)");

        // check to make sure hexes are valid
        string.split("").forEach((val) => {
            if (hexValues.indexOf(val) == -1) {
                throw new InvalidArgumentError("Unexpected hex character '" + val + "' at position '" + (pos + 1) + "'");
            }
            pos++;
        });

        // ### MAIN
        var val = Math.floor(string.length / 3); // Used for calculating Hex Position, so code knows where R section, G section, and B section is.
        var r = string.slice(0, val);
        var g = string.slice(val, val * 2);
        var b = string.slice(val * 2, val * 3);

        // used to convert the hex to a number. (All it does is convert the base 16 item to base 10)
        var converter = (value) => {
            var returnValue = 0;
            // split into character array
            var subValues = value.split("");
            subValues.forEach((subVal, index) => {
                // multiplier, AKA get the base, then its value
                let multiplier = Math.pow(hexValues.length, subValues.length - index - 1);
                returnValue += multiplier * hexValues.indexOf(subVal);
            });
            return returnValue;
        }

        // ### Assign Values
        this.r = converter(r);
        this.g = converter(g);
        this.b = converter(b);
        this.a = a;

        // return this for utils
        return this;
    }

    /**
     * A MAYBE more efficient verson of fromString.
     * 
     * Converts the string to a color
     * @param {String} string the color string containing hex values
     * @param {Number} [a=1] Alpha (Optional). Defaults to 1. 
     */
    fromString2(string, a=1) {
        // ### Tools
        let hexValues = ["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];
        var pos = 0;

        // ### Argument Verification
        if (typeof a !== 'number') throw new InvalidArgumentError("Alpha specified must be a number");
        if (typeof string !== 'string') throw new InvalidArgumentError("String specified must be a string");

        string = string.toLowerCase();

        // remove leading '#' if present
        string = string.startsWith("#") ? string.slice(1, string.length) : string;

        if (a < 0 || a > 1) throw new InvalidArgumentError("Alpha specified must be between (Inclusive) 0 and 1");

        if (string.length != 6 && string.length != 3) throw new InvalidArgumentError("String specified must be made of 6 hex values (RRGGBB) or 3 hex values (RGB)");
        // ### MAIN
        var val = Math.floor(string.length / 3); // Used for calculating Hex Position, so code knows where R section, G section, and B section is.
        var r = string.slice(0, val);

        // check r
        if (hexValues.indexOf(r) == -1) throw new InvalidArgumentError("Unexpected hex '" + r + "' at position '" + (pos + 1) + "'");
        pos += val;


        var g = string.slice(val, val * 2);

        // check g
        if (hexValues.includes(g) == -1) throw new InvalidArgumentError("Unexpected hex '" + g + "' at position '" + (pos + 1) + "'");
        pos += val;


        var b = string.slice(val * 2, val * 3);

        // check b
        if (!hexValues.includes(b)) throw new InvalidArgumentError("Unexpected hex '" + b + "' at position '" + (pos + 1) + "'");
        pos += val;

        // ### Assign Values
        this.r = hexValues.indexOf(r);
        this.g = hexValues.indexOf(g);
        this.b = hexValues.indexOf(b);
        this.a = a;

        // return this for utils
        return this;
    }
}
