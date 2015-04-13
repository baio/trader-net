/// <reference path="../typings/node/node.d.ts" />
import ticketCodes = require("./ticket-codes");
export interface ISecurity {
    ticket: ticketCodes.TicketCodes;
    code: string;
    lotSize: number;
}
export declare class TraderUtils {
    private static securities;
    static getSecurity(code: ticketCodes.TicketCodes): ISecurity;
}
