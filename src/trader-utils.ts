/// <reference path="./enums/ticket-codes" />

module tn {

    export interface ISecurity {
        ticket: TicketCodes
        code: string
        lotSize: number
    }

    export function getSecurity(code:TicketCodes):ISecurity {

        var securities = require("./data/MX-TQBR-190315.json");
        var seq = securities[TicketCodes[code]];
        if (!seq)
            throw new Error("Code not found");

        return {
            ticket: code, code: TicketCodes[code], lotSize: seq
        };
    }

    export function getCodes(tickets:Array<TicketCodes|string>, sort:boolean = true):Array<string> {
        var res = typeof tickets[0] != "string" ? tickets.map(m => TicketCodes[<any>m]) : tickets;
        if (sort)
            res.sort();
        return <Array<string>>res;
    }
}
