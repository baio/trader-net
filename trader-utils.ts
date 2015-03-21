/// <reference path="./typings/node/node.d.ts" />

import ticketCodes = require("./ticket-codes")

export interface ISecurity {
    ticket: ticketCodes.TicketCodes
    code: string
    lotSize: number
}

export class TraderUtils {
    private static securities : any

    static getSecurity(code: ticketCodes.TicketCodes): ISecurity {
        if (!TraderUtils.securities) {
            TraderUtils.securities = require("./data/MX-TQBR-190315.json");
        }
        var seq = TraderUtils.securities[ticketCodes.TicketCodes[code]];
        if (!seq)
            throw new Error("Code not found");

        return {
            ticket: code, code: ticketCodes.TicketCodes[code], lotSize: seq
        };
    }
}


