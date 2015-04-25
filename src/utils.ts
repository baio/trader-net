import ticketCodes = require("./ticket-codes");

export function getCodes(tickets: Array<ticketCodes.TicketCodes|string>, sort: boolean = true): Array<string>{
    var res = typeof tickets[0] != "string" ? tickets.map(m => ticketCodes.TicketCodes[<any>m]) : tickets;
    if (sort)
        res.sort();
    return <Array<string>>res;
}

