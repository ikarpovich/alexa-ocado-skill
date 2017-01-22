/* @flow */

import assert from "assert";

import {lambdaPromisifier} from "../lib/lambda-promisifier.js"
import {alexaOcado} from "../lambdas/alexa-ocado-skill.js"

const promisifiedAlexaOcado = lambdaPromisifier(alexaOcado);

describe("hello lambda", function() {
    it("should greet the world by default", function(done) {
        promisifiedAlexaOcado({})
            .then(res => {
                assert.equal(res, "Hello world!")
            })
            .then(() => done(), done);
    });

    it("should greet someone when precised", function(done) {
        promisifiedAlexaOcado({name: "someone"})
            .then(res => {
                assert.equal(res, "Hello someone!")
            })
            .then(() => done(), done);
    });
});