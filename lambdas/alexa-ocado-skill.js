/* @flow */

import type {LambdaContext} from "../lib/lambda-types.js";
import Alexa from "alexa-sdk";

type AlexaOptions = {
    name: string
};

export function handler(options, context: LambdaContext): void {
    let alexa = Alexa.handler(options, context);
    alexa.APP_ID = 'amzn1.ask.skill.19b114c7-4720-4ac1-a9cf-0ff034e6e1a6';

    let handlers = {

        'OcadoIntent': function () {

            let itemSlot = this.event.request.intent.slots.Item;
            let itemName;
            if (itemSlot && itemSlot.value) {
                itemName = itemSlot.value.toLowerCase();
            }

            if(!itemName) {
                this.emit(':ask', 'Sorry, I didn\'t get that');
                return;
            }

            this.emit(':ask', 'Hello World! ' + itemName);
        },

        'Unhandled': function() {
            this.emit(':ask', 'Sorry, I didn\'t get that. Try saying a product name', 'Try saying a product name.');
        }

    };

    alexa.registerHandlers(handlers);
    alexa.execute();

    context.succeed();
}