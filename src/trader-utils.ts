/// <reference path="../typings/node/node.d.ts" />

import ticketCodes = require("./enums/ticket-codes")

export interface ISecurity {
    ticket: ticketCodes.TicketCodes
    code: string
    lotSize: number
}

export function getSecurity(code: ticketCodes.TicketCodes): ISecurity {

    var securities = require("./data/MX-TQBR-190315.json");
    var seq = securities[ticketCodes.TicketCodes[code]];
    if (!seq)
        throw new Error("Code not found");

    return {
        ticket: code, code: ticketCodes.TicketCodes[code], lotSize: seq
    };
}


export function getCodes(tickets: Array<ticketCodes.TicketCodes|string>, sort: boolean = true): Array<string>{
    var res = typeof tickets[0] != "string" ? tickets.map(m => ticketCodes.TicketCodes[<any>m]) : tickets;
    if (sort)
        res.sort();
    return <Array<string>>res;
}


