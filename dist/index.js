var tn;
(function (tn) {
    var security;
    (function (security) {
        var crypto = require('crypto');
        var isObject = function (val) {
            return Object.prototype.toString.call(val) === '[object Object]';
        };
        var hash_hmac = function (type, data, key) {
            var hash = crypto.createHmac(type, key);
            hash.update(data);
            return hash.digest('hex');
        };
        security.sign = function (data, apiSec) {
            return hash_hmac('sha256', preSign(data), apiSec);
        };
        var sortBy = function (arr, cb) {
            return arr.sort(function (a, b) {
                var aKey = cb(a);
                var bKey = cb(b);
                if (aKey < bKey)
                    return -1;
                if (aKey > bKey)
                    return 1;
                return 0;
            });
        };
        var pairs = function (collection) {
            return Object.keys(collection).map(function (key) {
                return [key, collection[key]];
            });
        };
        var ksort = function (collection) {
            return sortBy(pairs(collection), function (a) {
                return a[0];
            });
        };
        var preSign = function (collection) {
            var keyVals = ksort(collection);
            return keyVals.map(function (keyVal) {
                var key = keyVal[0];
                var value = keyVal[1];
                if (isObject(value)) {
                    value = preSign(value);
                }
                return key + '=' + value;
            }).join('&');
        };
    })(security = tn.security || (tn.security = {}));
})(tn || (tn = {}));
/*
exports.pairs = pairs;
exports.ksort = ksort;
exports.sign = sign;
*/
var tn;
(function (tn) {
    (function (TicketCodes) {
        TicketCodes[TicketCodes["ABRD"] = 0] = "ABRD";
        TicketCodes[TicketCodes["AESL"] = 1] = "AESL";
        TicketCodes[TicketCodes["AFKS"] = 2] = "AFKS";
        TicketCodes[TicketCodes["AFLT"] = 3] = "AFLT";
        TicketCodes[TicketCodes["AGRO"] = 4] = "AGRO";
        TicketCodes[TicketCodes["AKRN"] = 5] = "AKRN";
        TicketCodes[TicketCodes["ALBK"] = 6] = "ALBK";
        TicketCodes[TicketCodes["ALNU"] = 7] = "ALNU";
        TicketCodes[TicketCodes["ALRS"] = 8] = "ALRS";
        TicketCodes[TicketCodes["AMEZ"] = 9] = "AMEZ";
        TicketCodes[TicketCodes["APTK"] = 10] = "APTK";
        TicketCodes[TicketCodes["ARMD"] = 11] = "ARMD";
        TicketCodes[TicketCodes["ARSA"] = 12] = "ARSA";
        TicketCodes[TicketCodes["ASSB"] = 13] = "ASSB";
        TicketCodes[TicketCodes["AVAN"] = 14] = "AVAN";
        TicketCodes[TicketCodes["AVAZ"] = 15] = "AVAZ";
        TicketCodes[TicketCodes["AVAZP"] = 16] = "AVAZP";
        TicketCodes[TicketCodes["BANE"] = 17] = "BANE";
        TicketCodes[TicketCodes["BANEP"] = 18] = "BANEP";
        TicketCodes[TicketCodes["BISV"] = 19] = "BISV";
        TicketCodes[TicketCodes["BISVP"] = 20] = "BISVP";
        TicketCodes[TicketCodes["BLNG"] = 21] = "BLNG";
        TicketCodes[TicketCodes["BRZL"] = 22] = "BRZL";
        TicketCodes[TicketCodes["BSPB"] = 23] = "BSPB";
        TicketCodes[TicketCodes["CHEP"] = 24] = "CHEP";
        TicketCodes[TicketCodes["CHGZ"] = 25] = "CHGZ";
        TicketCodes[TicketCodes["CHKZ"] = 26] = "CHKZ";
        TicketCodes[TicketCodes["CHMF"] = 27] = "CHMF";
        TicketCodes[TicketCodes["CHMK"] = 28] = "CHMK";
        TicketCodes[TicketCodes["CHZN"] = 29] = "CHZN";
        TicketCodes[TicketCodes["CLSB"] = 30] = "CLSB";
        TicketCodes[TicketCodes["CLSBP"] = 31] = "CLSBP";
        TicketCodes[TicketCodes["CNTL"] = 32] = "CNTL";
        TicketCodes[TicketCodes["CNTLP"] = 33] = "CNTLP";
        TicketCodes[TicketCodes["DALM"] = 34] = "DALM";
        TicketCodes[TicketCodes["DASB"] = 35] = "DASB";
        TicketCodes[TicketCodes["DGBZ"] = 36] = "DGBZ";
        TicketCodes[TicketCodes["DGBZP"] = 37] = "DGBZP";
        TicketCodes[TicketCodes["DIOD"] = 38] = "DIOD";
        TicketCodes[TicketCodes["DIXY"] = 39] = "DIXY";
        TicketCodes[TicketCodes["DVEC"] = 40] = "DVEC";
        TicketCodes[TicketCodes["DZRD"] = 41] = "DZRD";
        TicketCodes[TicketCodes["DZRDP"] = 42] = "DZRDP";
        TicketCodes[TicketCodes["ELTZ"] = 43] = "ELTZ";
        TicketCodes[TicketCodes["ENRU"] = 44] = "ENRU";
        TicketCodes[TicketCodes["EONR"] = 45] = "EONR";
        TicketCodes[TicketCodes["ERCO"] = 46] = "ERCO";
        TicketCodes[TicketCodes["FEES"] = 47] = "FEES";
        TicketCodes[TicketCodes["FESH"] = 48] = "FESH";
        TicketCodes[TicketCodes["FORTP"] = 49] = "FORTP";
        TicketCodes[TicketCodes["GAZA"] = 50] = "GAZA";
        TicketCodes[TicketCodes["GAZAP"] = 51] = "GAZAP";
        TicketCodes[TicketCodes["GAZC"] = 52] = "GAZC";
        TicketCodes[TicketCodes["GAZP"] = 53] = "GAZP";
        TicketCodes[TicketCodes["GAZS"] = 54] = "GAZS";
        TicketCodes[TicketCodes["GAZT"] = 55] = "GAZT";
        TicketCodes[TicketCodes["GCHE"] = 56] = "GCHE";
        TicketCodes[TicketCodes["GMKN"] = 57] = "GMKN";
        TicketCodes[TicketCodes["GRAZ"] = 58] = "GRAZ";
        TicketCodes[TicketCodes["GTLC"] = 59] = "GTLC";
        TicketCodes[TicketCodes["GTPR"] = 60] = "GTPR";
        TicketCodes[TicketCodes["GUMM"] = 61] = "GUMM";
        TicketCodes[TicketCodes["HALS"] = 62] = "HALS";
        TicketCodes[TicketCodes["HIMC"] = 63] = "HIMC";
        TicketCodes[TicketCodes["HIMCP"] = 64] = "HIMCP";
        TicketCodes[TicketCodes["HYDR"] = 65] = "HYDR";
        TicketCodes[TicketCodes["IDVP"] = 66] = "IDVP";
        TicketCodes[TicketCodes["IGST"] = 67] = "IGST";
        TicketCodes[TicketCodes["IGST03"] = 68] = "IGST03";
        TicketCodes[TicketCodes["IGSTP"] = 69] = "IGSTP";
        TicketCodes[TicketCodes["IRAO"] = 70] = "IRAO";
        TicketCodes[TicketCodes["IRGZ"] = 71] = "IRGZ";
        TicketCodes[TicketCodes["IRKT"] = 72] = "IRKT";
        TicketCodes[TicketCodes["ISKJ"] = 73] = "ISKJ";
        TicketCodes[TicketCodes["JNOS"] = 74] = "JNOS";
        TicketCodes[TicketCodes["JNOSP"] = 75] = "JNOSP";
        TicketCodes[TicketCodes["KAZT"] = 76] = "KAZT";
        TicketCodes[TicketCodes["KAZTP"] = 77] = "KAZTP";
        TicketCodes[TicketCodes["KBSB"] = 78] = "KBSB";
        TicketCodes[TicketCodes["KBTK"] = 79] = "KBTK";
        TicketCodes[TicketCodes["KCHE"] = 80] = "KCHE";
        TicketCodes[TicketCodes["KCHEP"] = 81] = "KCHEP";
        TicketCodes[TicketCodes["KGKC"] = 82] = "KGKC";
        TicketCodes[TicketCodes["KGKCP"] = 83] = "KGKCP";
        TicketCodes[TicketCodes["KLSB"] = 84] = "KLSB";
        TicketCodes[TicketCodes["KMAZ"] = 85] = "KMAZ";
        TicketCodes[TicketCodes["KMEZ"] = 86] = "KMEZ";
        TicketCodes[TicketCodes["KMTZ"] = 87] = "KMTZ";
        TicketCodes[TicketCodes["KOGK"] = 88] = "KOGK";
        TicketCodes[TicketCodes["KRKN"] = 89] = "KRKN";
        TicketCodes[TicketCodes["KRKNP"] = 90] = "KRKNP";
        TicketCodes[TicketCodes["KRKO"] = 91] = "KRKO";
        TicketCodes[TicketCodes["KRKOP"] = 92] = "KRKOP";
        TicketCodes[TicketCodes["KROT"] = 93] = "KROT";
        TicketCodes[TicketCodes["KROTP"] = 94] = "KROTP";
        TicketCodes[TicketCodes["KRSB"] = 95] = "KRSB";
        TicketCodes[TicketCodes["KRSBP"] = 96] = "KRSBP";
        TicketCodes[TicketCodes["KRSG"] = 97] = "KRSG";
        TicketCodes[TicketCodes["KSGR"] = 98] = "KSGR";
        TicketCodes[TicketCodes["KTSB"] = 99] = "KTSB";
        TicketCodes[TicketCodes["KTSBP"] = 100] = "KTSBP";
        TicketCodes[TicketCodes["KUBE"] = 101] = "KUBE";
        TicketCodes[TicketCodes["KUNF"] = 102] = "KUNF";
        TicketCodes[TicketCodes["KUSTP"] = 103] = "KUSTP";
        TicketCodes[TicketCodes["KUZB"] = 104] = "KUZB";
        TicketCodes[TicketCodes["KZBE"] = 105] = "KZBE";
        TicketCodes[TicketCodes["KZMS"] = 106] = "KZMS";
        TicketCodes[TicketCodes["KZOS"] = 107] = "KZOS";
        TicketCodes[TicketCodes["KZOSP"] = 108] = "KZOSP";
        TicketCodes[TicketCodes["LIFE"] = 109] = "LIFE";
        TicketCodes[TicketCodes["LKOH"] = 110] = "LKOH";
        TicketCodes[TicketCodes["LNTA"] = 111] = "LNTA";
        TicketCodes[TicketCodes["LNZL"] = 112] = "LNZL";
        TicketCodes[TicketCodes["LNZLP"] = 113] = "LNZLP";
        TicketCodes[TicketCodes["LPSB"] = 114] = "LPSB";
        TicketCodes[TicketCodes["LSNG"] = 115] = "LSNG";
        TicketCodes[TicketCodes["LSNGP"] = 116] = "LSNGP";
        TicketCodes[TicketCodes["LSRG"] = 117] = "LSRG";
        TicketCodes[TicketCodes["LVHK"] = 118] = "LVHK";
        TicketCodes[TicketCodes["MAGE"] = 119] = "MAGE";
        TicketCodes[TicketCodes["MAGEP"] = 120] = "MAGEP";
        TicketCodes[TicketCodes["MAGN"] = 121] = "MAGN";
        TicketCodes[TicketCodes["MASZ"] = 122] = "MASZ";
        TicketCodes[TicketCodes["MERF"] = 123] = "MERF";
        TicketCodes[TicketCodes["MFGS"] = 124] = "MFGS";
        TicketCodes[TicketCodes["MFGSP"] = 125] = "MFGSP";
        TicketCodes[TicketCodes["MFON"] = 126] = "MFON";
        TicketCodes[TicketCodes["MGNT"] = 127] = "MGNT";
        TicketCodes[TicketCodes["MGNZ"] = 128] = "MGNZ";
        TicketCodes[TicketCodes["MGTS"] = 129] = "MGTS";
        TicketCodes[TicketCodes["MGTSP"] = 130] = "MGTSP";
        TicketCodes[TicketCodes["MISB"] = 131] = "MISB";
        TicketCodes[TicketCodes["MISBP"] = 132] = "MISBP";
        TicketCodes[TicketCodes["MMBM"] = 133] = "MMBM";
        TicketCodes[TicketCodes["MNFD"] = 134] = "MNFD";
        TicketCodes[TicketCodes["MOBB"] = 135] = "MOBB";
        TicketCodes[TicketCodes["MOEX"] = 136] = "MOEX";
        TicketCodes[TicketCodes["MORI"] = 137] = "MORI";
        TicketCodes[TicketCodes["MOTZ"] = 138] = "MOTZ";
        TicketCodes[TicketCodes["MRKC"] = 139] = "MRKC";
        TicketCodes[TicketCodes["MRKK"] = 140] = "MRKK";
        TicketCodes[TicketCodes["MRKP"] = 141] = "MRKP";
        TicketCodes[TicketCodes["MRKS"] = 142] = "MRKS";
        TicketCodes[TicketCodes["MRKU"] = 143] = "MRKU";
        TicketCodes[TicketCodes["MRKV"] = 144] = "MRKV";
        TicketCodes[TicketCodes["MRKY"] = 145] = "MRKY";
        TicketCodes[TicketCodes["MRKZ"] = 146] = "MRKZ";
        TicketCodes[TicketCodes["MRSB"] = 147] = "MRSB";
        TicketCodes[TicketCodes["MSNG"] = 148] = "MSNG";
        TicketCodes[TicketCodes["MSRS"] = 149] = "MSRS";
        TicketCodes[TicketCodes["MSSB"] = 150] = "MSSB";
        TicketCodes[TicketCodes["MSST"] = 151] = "MSST";
        TicketCodes[TicketCodes["MSTT"] = 152] = "MSTT";
        TicketCodes[TicketCodes["MTLR"] = 153] = "MTLR";
        TicketCodes[TicketCodes["MTLRP"] = 154] = "MTLRP";
        TicketCodes[TicketCodes["MTSS"] = 155] = "MTSS";
        TicketCodes[TicketCodes["MUGS"] = 156] = "MUGS";
        TicketCodes[TicketCodes["MUGSP"] = 157] = "MUGSP";
        TicketCodes[TicketCodes["MVID"] = 158] = "MVID";
        TicketCodes[TicketCodes["NAUK"] = 159] = "NAUK";
        TicketCodes[TicketCodes["NBTR"] = 160] = "NBTR";
        TicketCodes[TicketCodes["NFAZ"] = 161] = "NFAZ";
        TicketCodes[TicketCodes["NKNC"] = 162] = "NKNC";
        TicketCodes[TicketCodes["NKNCP"] = 163] = "NKNCP";
        TicketCodes[TicketCodes["NKSH"] = 164] = "NKSH";
        TicketCodes[TicketCodes["NLMK"] = 165] = "NLMK";
        TicketCodes[TicketCodes["NMTP"] = 166] = "NMTP";
        TicketCodes[TicketCodes["NNSB"] = 167] = "NNSB";
        TicketCodes[TicketCodes["NNSBP"] = 168] = "NNSBP";
        TicketCodes[TicketCodes["NPOF"] = 169] = "NPOF";
        TicketCodes[TicketCodes["NSVZ"] = 170] = "NSVZ";
        TicketCodes[TicketCodes["NVNG"] = 171] = "NVNG";
        TicketCodes[TicketCodes["NVNGP"] = 172] = "NVNGP";
        TicketCodes[TicketCodes["NVTK"] = 173] = "NVTK";
        TicketCodes[TicketCodes["ODVA"] = 174] = "ODVA";
        TicketCodes[TicketCodes["OFCB"] = 175] = "OFCB";
        TicketCodes[TicketCodes["OGKB"] = 176] = "OGKB";
        TicketCodes[TicketCodes["OMSH"] = 177] = "OMSH";
        TicketCodes[TicketCodes["OMZZP"] = 178] = "OMZZP";
        TicketCodes[TicketCodes["OPIN"] = 179] = "OPIN";
        TicketCodes[TicketCodes["OSMP"] = 180] = "OSMP";
        TicketCodes[TicketCodes["OTCP"] = 181] = "OTCP";
        TicketCodes[TicketCodes["PAZA"] = 182] = "PAZA";
        TicketCodes[TicketCodes["PETR"] = 183] = "PETR";
        TicketCodes[TicketCodes["PGIL"] = 184] = "PGIL";
        TicketCodes[TicketCodes["PHOR"] = 185] = "PHOR";
        TicketCodes[TicketCodes["PHST"] = 186] = "PHST";
        TicketCodes[TicketCodes["PIKK"] = 187] = "PIKK";
        TicketCodes[TicketCodes["PLSM"] = 188] = "PLSM";
        TicketCodes[TicketCodes["PLZL"] = 189] = "PLZL";
        TicketCodes[TicketCodes["PMSB"] = 190] = "PMSB";
        TicketCodes[TicketCodes["PMSBP"] = 191] = "PMSBP";
        TicketCodes[TicketCodes["POLY"] = 192] = "POLY";
        TicketCodes[TicketCodes["PRFN"] = 193] = "PRFN";
        TicketCodes[TicketCodes["PRIM"] = 194] = "PRIM";
        TicketCodes[TicketCodes["PRMB"] = 195] = "PRMB";
        TicketCodes[TicketCodes["PRTK"] = 196] = "PRTK";
        TicketCodes[TicketCodes["PSBR"] = 197] = "PSBR";
        TicketCodes[TicketCodes["QIWI"] = 198] = "QIWI";
        TicketCodes[TicketCodes["RASP"] = 199] = "RASP";
        TicketCodes[TicketCodes["RBCM"] = 200] = "RBCM";
        TicketCodes[TicketCodes["RDRB"] = 201] = "RDRB";
        TicketCodes[TicketCodes["REBR"] = 202] = "REBR";
        TicketCodes[TicketCodes["RGSS"] = 203] = "RGSS";
        TicketCodes[TicketCodes["RKKE"] = 204] = "RKKE";
        TicketCodes[TicketCodes["RLMN"] = 205] = "RLMN";
        TicketCodes[TicketCodes["RLMNP"] = 206] = "RLMNP";
        TicketCodes[TicketCodes["RNAV"] = 207] = "RNAV";
        TicketCodes[TicketCodes["RODNP"] = 208] = "RODNP";
        TicketCodes[TicketCodes["ROLO"] = 209] = "ROLO";
        TicketCodes[TicketCodes["ROSB"] = 210] = "ROSB";
        TicketCodes[TicketCodes["ROSN"] = 211] = "ROSN";
        TicketCodes[TicketCodes["ROST"] = 212] = "ROST";
        TicketCodes[TicketCodes["RSEA"] = 213] = "RSEA";
        TicketCodes[TicketCodes["RSTI"] = 214] = "RSTI";
        TicketCodes[TicketCodes["RSTIP"] = 215] = "RSTIP";
        TicketCodes[TicketCodes["RTGZ"] = 216] = "RTGZ";
        TicketCodes[TicketCodes["RTKM"] = 217] = "RTKM";
        TicketCodes[TicketCodes["RTKMP"] = 218] = "RTKMP";
        TicketCodes[TicketCodes["RTSB"] = 219] = "RTSB";
        TicketCodes[TicketCodes["RTSBP"] = 220] = "RTSBP";
        TicketCodes[TicketCodes["RUALR"] = 221] = "RUALR";
        TicketCodes[TicketCodes["RUGR"] = 222] = "RUGR";
        TicketCodes[TicketCodes["RUSI"] = 223] = "RUSI";
        TicketCodes[TicketCodes["RUSP"] = 224] = "RUSP";
        TicketCodes[TicketCodes["RZSB"] = 225] = "RZSB";
        TicketCodes[TicketCodes["SAGO"] = 226] = "SAGO";
        TicketCodes[TicketCodes["SAGOP"] = 227] = "SAGOP";
        TicketCodes[TicketCodes["SARE"] = 228] = "SARE";
        TicketCodes[TicketCodes["SAREP"] = 229] = "SAREP";
        TicketCodes[TicketCodes["SBER"] = 230] = "SBER";
        TicketCodes[TicketCodes["SBERP"] = 231] = "SBERP";
        TicketCodes[TicketCodes["SELG"] = 232] = "SELG";
        TicketCodes[TicketCodes["SELGP"] = 233] = "SELGP";
        TicketCodes[TicketCodes["SELL"] = 234] = "SELL";
        TicketCodes[TicketCodes["SEMZ"] = 235] = "SEMZ";
        TicketCodes[TicketCodes["SIBN"] = 236] = "SIBN";
        TicketCodes[TicketCodes["SKYC"] = 237] = "SKYC";
        TicketCodes[TicketCodes["SNGS"] = 238] = "SNGS";
        TicketCodes[TicketCodes["SNGSP"] = 239] = "SNGSP";
        TicketCodes[TicketCodes["STSB"] = 240] = "STSB";
        TicketCodes[TicketCodes["STSBP"] = 241] = "STSBP";
        TicketCodes[TicketCodes["SVAV"] = 242] = "SVAV";
        TicketCodes[TicketCodes["SXPNP"] = 243] = "SXPNP";
        TicketCodes[TicketCodes["SYNG"] = 244] = "SYNG";
        TicketCodes[TicketCodes["SZPR"] = 245] = "SZPR";
        TicketCodes[TicketCodes["TAER"] = 246] = "TAER";
        TicketCodes[TicketCodes["TANL"] = 247] = "TANL";
        TicketCodes[TicketCodes["TANLP"] = 248] = "TANLP";
        TicketCodes[TicketCodes["TASB"] = 249] = "TASB";
        TicketCodes[TicketCodes["TASBP"] = 250] = "TASBP";
        TicketCodes[TicketCodes["TATN"] = 251] = "TATN";
        TicketCodes[TicketCodes["TATNP"] = 252] = "TATNP";
        TicketCodes[TicketCodes["TAVR"] = 253] = "TAVR";
        TicketCodes[TicketCodes["TFKF"] = 254] = "TFKF";
        TicketCodes[TicketCodes["TGKA"] = 255] = "TGKA";
        TicketCodes[TicketCodes["TGKB"] = 256] = "TGKB";
        TicketCodes[TicketCodes["TGKBP"] = 257] = "TGKBP";
        TicketCodes[TicketCodes["TGKD"] = 258] = "TGKD";
        TicketCodes[TicketCodes["TGKDP"] = 259] = "TGKDP";
        TicketCodes[TicketCodes["TGKN"] = 260] = "TGKN";
        TicketCodes[TicketCodes["TGKO"] = 261] = "TGKO";
        TicketCodes[TicketCodes["TORS"] = 262] = "TORS";
        TicketCodes[TicketCodes["TORSP"] = 263] = "TORSP";
        TicketCodes[TicketCodes["TRCN"] = 264] = "TRCN";
        TicketCodes[TicketCodes["TRMK"] = 265] = "TRMK";
        TicketCodes[TicketCodes["TRNFP"] = 266] = "TRNFP";
        TicketCodes[TicketCodes["TRUDP"] = 267] = "TRUDP";
        TicketCodes[TicketCodes["TTLK"] = 268] = "TTLK";
        TicketCodes[TicketCodes["TUCH"] = 269] = "TUCH";
        TicketCodes[TicketCodes["TUZA"] = 270] = "TUZA";
        TicketCodes[TicketCodes["UAZA"] = 271] = "UAZA";
        TicketCodes[TicketCodes["UCSS"] = 272] = "UCSS";
        TicketCodes[TicketCodes["UKUZ"] = 273] = "UKUZ";
        TicketCodes[TicketCodes["UNAC"] = 274] = "UNAC";
        TicketCodes[TicketCodes["UNKL"] = 275] = "UNKL";
        TicketCodes[TicketCodes["URFD"] = 276] = "URFD";
        TicketCodes[TicketCodes["URKA"] = 277] = "URKA";
        TicketCodes[TicketCodes["URKZ"] = 278] = "URKZ";
        TicketCodes[TicketCodes["USBN"] = 279] = "USBN";
        TicketCodes[TicketCodes["UTAR"] = 280] = "UTAR";
        TicketCodes[TicketCodes["UTII"] = 281] = "UTII";
        TicketCodes[TicketCodes["VDSB"] = 282] = "VDSB";
        TicketCodes[TicketCodes["VGSB"] = 283] = "VGSB";
        TicketCodes[TicketCodes["VGSBP"] = 284] = "VGSBP";
        TicketCodes[TicketCodes["VJGZ"] = 285] = "VJGZ";
        TicketCodes[TicketCodes["VJGZP"] = 286] = "VJGZP";
        TicketCodes[TicketCodes["VLHZ"] = 287] = "VLHZ";
        TicketCodes[TicketCodes["VRAO"] = 288] = "VRAO";
        TicketCodes[TicketCodes["VRAOP"] = 289] = "VRAOP";
        TicketCodes[TicketCodes["VRPH"] = 290] = "VRPH";
        TicketCodes[TicketCodes["VRSB"] = 291] = "VRSB";
        TicketCodes[TicketCodes["VRSBP"] = 292] = "VRSBP";
        TicketCodes[TicketCodes["VSMO"] = 293] = "VSMO";
        TicketCodes[TicketCodes["VSYD"] = 294] = "VSYD";
        TicketCodes[TicketCodes["VSYDP"] = 295] = "VSYDP";
        TicketCodes[TicketCodes["VTBR"] = 296] = "VTBR";
        TicketCodes[TicketCodes["VTGK"] = 297] = "VTGK";
        TicketCodes[TicketCodes["VTRS"] = 298] = "VTRS";
        TicketCodes[TicketCodes["VZRZ"] = 299] = "VZRZ";
        TicketCodes[TicketCodes["VZRZP"] = 300] = "VZRZP";
        TicketCodes[TicketCodes["WTCM"] = 301] = "WTCM";
        TicketCodes[TicketCodes["WTCMP"] = 302] = "WTCMP";
        TicketCodes[TicketCodes["YAKG"] = 303] = "YAKG";
        TicketCodes[TicketCodes["YASH"] = 304] = "YASH";
        TicketCodes[TicketCodes["YKEN"] = 305] = "YKEN";
        TicketCodes[TicketCodes["YKENP"] = 306] = "YKENP";
        TicketCodes[TicketCodes["YNDX"] = 307] = "YNDX";
        TicketCodes[TicketCodes["YRSB"] = 308] = "YRSB";
        TicketCodes[TicketCodes["YRSBP"] = 309] = "YRSBP";
        TicketCodes[TicketCodes["YRSL"] = 310] = "YRSL";
        TicketCodes[TicketCodes["ZHIV"] = 311] = "ZHIV";
        TicketCodes[TicketCodes["ZILL"] = 312] = "ZILL";
        TicketCodes[TicketCodes["ZMZN"] = 313] = "ZMZN";
        TicketCodes[TicketCodes["ZMZNP"] = 314] = "ZMZNP";
        TicketCodes[TicketCodes["ZVEZ"] = 315] = "ZVEZ";
    })(tn.TicketCodes || (tn.TicketCodes = {}));
    var TicketCodes = tn.TicketCodes;
})(tn || (tn = {}));
var tn;
(function (tn) {
    (function (OrderStatusCodes) {
        OrderStatusCodes[OrderStatusCodes["Received"] = 1] = "Received";
        OrderStatusCodes[OrderStatusCodes["Cancel"] = 2] = "Cancel";
        OrderStatusCodes[OrderStatusCodes["Placed"] = 10] = "Placed";
        OrderStatusCodes[OrderStatusCodes["Sent"] = 11] = "Sent";
        OrderStatusCodes[OrderStatusCodes["PartialFill"] = 12] = "PartialFill";
        OrderStatusCodes[OrderStatusCodes["CancelSent"] = 13] = "CancelSent";
        OrderStatusCodes[OrderStatusCodes["PartialExecuted"] = 20] = "PartialExecuted";
        OrderStatusCodes[OrderStatusCodes["Executed"] = 21] = "Executed";
        OrderStatusCodes[OrderStatusCodes["PartialCanceled"] = 30] = "PartialCanceled";
        OrderStatusCodes[OrderStatusCodes["Cancelled"] = 31] = "Cancelled";
        OrderStatusCodes[OrderStatusCodes["Rejected"] = 70] = "Rejected";
        OrderStatusCodes[OrderStatusCodes["Expired"] = 71] = "Expired";
        OrderStatusCodes[OrderStatusCodes["PartialExpired"] = 72] = "PartialExpired";
        OrderStatusCodes[OrderStatusCodes["MarketPlaceError"] = 73] = "MarketPlaceError";
        OrderStatusCodes[OrderStatusCodes["SendError"] = 74] = "SendError";
        OrderStatusCodes[OrderStatusCodes["CancelError"] = 75] = "CancelError";
    })(tn.OrderStatusCodes || (tn.OrderStatusCodes = {}));
    var OrderStatusCodes = tn.OrderStatusCodes;
    (function (OrderActionTypes) {
        OrderActionTypes[OrderActionTypes["Buy"] = 1] = "Buy";
        OrderActionTypes[OrderActionTypes["BuyOnMargin"] = 2] = "BuyOnMargin";
        OrderActionTypes[OrderActionTypes["Sell"] = 3] = "Sell";
        OrderActionTypes[OrderActionTypes["SellShort"] = 4] = "SellShort";
    })(tn.OrderActionTypes || (tn.OrderActionTypes = {}));
    var OrderActionTypes = tn.OrderActionTypes;
    (function (OrderTypes) {
        OrderTypes[OrderTypes["Market"] = 1] = "Market";
        OrderTypes[OrderTypes["Limit"] = 2] = "Limit";
        OrderTypes[OrderTypes["Stop"] = 3] = "Stop";
        OrderTypes[OrderTypes["StopLimit"] = 4] = "StopLimit";
    })(tn.OrderTypes || (tn.OrderTypes = {}));
    var OrderTypes = tn.OrderTypes;
    (function (OrderExpirationTypes) {
        OrderExpirationTypes[OrderExpirationTypes["Day"] = 1] = "Day";
        OrderExpirationTypes[OrderExpirationTypes["DayExt"] = 2] = "DayExt";
        OrderExpirationTypes[OrderExpirationTypes["GTC"] = 3] = "GTC"; //Till cancel
    })(tn.OrderExpirationTypes || (tn.OrderExpirationTypes = {}));
    var OrderExpirationTypes = tn.OrderExpirationTypes;
})(tn || (tn = {}));
var tn;
(function (tn) {
    (function (SecurityType) {
        SecurityType[SecurityType["Stock"] = 1] = "Stock";
        SecurityType[SecurityType["Bond"] = 2] = "Bond";
        SecurityType[SecurityType["Futures"] = 3] = "Futures";
        SecurityType[SecurityType["Option"] = 4] = "Option";
        SecurityType[SecurityType["Indexes"] = 5] = "Indexes";
        SecurityType[SecurityType["Money"] = 6] = "Money";
        SecurityType[SecurityType["Night"] = 7] = "Night";
    })(tn.SecurityType || (tn.SecurityType = {}));
    var SecurityType = tn.SecurityType;
    (function (SecurityKind) {
        SecurityKind[SecurityKind["Common"] = 1] = "Common";
        SecurityKind[SecurityKind["Pref"] = 2] = "Pref";
        SecurityKind[SecurityKind["Percent"] = 3] = "Percent";
        SecurityKind[SecurityKind["Discount"] = 4] = "Discount";
        SecurityKind[SecurityKind["Delivery"] = 5] = "Delivery";
        SecurityKind[SecurityKind["Rated"] = 6] = "Rated";
        SecurityKind[SecurityKind["Interval"] = 7] = "Interval";
        SecurityKind[SecurityKind["Crypto"] = 8] = "Crypto"; // Криптовалюта
    })(tn.SecurityKind || (tn.SecurityKind = {}));
    var SecurityKind = tn.SecurityKind;
})(tn || (tn = {}));
var tn;
(function (tn) {
    (function (CurrencyCodes) {
        CurrencyCodes[CurrencyCodes["USD"] = 0] = "USD";
        CurrencyCodes[CurrencyCodes["EUR"] = 1] = "EUR";
        CurrencyCodes[CurrencyCodes["RUR"] = 2] = "RUR";
    })(tn.CurrencyCodes || (tn.CurrencyCodes = {}));
    var CurrencyCodes = tn.CurrencyCodes;
})(tn || (tn = {}));
///<reference path="./enums/ticket-codes"/>
///<reference path="./enums/order-codes"/>
///<reference path="./enums/security-types"/>
///<reference path="./enums/currency-codes"/>
var tn;
(function (tn) {
    (function (BookOrderActions) {
        BookOrderActions[BookOrderActions["insert"] = 0] = "insert";
        BookOrderActions[BookOrderActions["update"] = 1] = "update";
        BookOrderActions[BookOrderActions["remove"] = 2] = "remove";
    })(tn.BookOrderActions || (tn.BookOrderActions = {}));
    var BookOrderActions = tn.BookOrderActions;
})(tn || (tn = {}));
///<reference path="./enums/ticket-codes"/>
///<reference path="./enums/order-codes"/>
///<reference path="./enums/security-types"/>
///<reference path="./enums/currency-codes"/>
///<reference path="./trader-net-types"/>
var tn;
(function (tn) {
    function formatPutOrder(data) {
        return {
            instr_name: tn.getCodes([data.ticket])[0],
            action_id: data.action,
            order_type_id: data.orderType,
            curr: tn.CurrencyCodes[data.currency],
            limit_price: data.limitPrice,
            stop_price: data.stopPrice,
            qty: data.quantity,
            aon: data.allOrNothing ? 1 : 0,
            expiration_id: data.expiration,
            submit_ch_c: 1,
            message_id: 0,
            replace_order_id: 0,
            groupPortfolioName: data.groupPortfolio,
            userOrderId: data.userOrderId
        };
    }
    tn.formatPutOrder = formatPutOrder;
    function mapPortfolio(servicePortfolio) {
        return {
            key: servicePortfolio.key,
            accounts: servicePortfolio.acc.map(mapAccount),
            positions: servicePortfolio.pos.map(mapPosition)
        };
    }
    tn.mapPortfolio = mapPortfolio;
    function mapOrderBookItem(ticket, action, orderBookItem) {
        return {
            index: orderBookItem.k,
            ticket: tn.TicketCodes[ticket],
            action: action,
            price: orderBookItem.p,
            quantity: orderBookItem.q,
            orderAction: orderBookItem.s == "S" ? tn.OrderActionTypes.Sell : tn.OrderActionTypes.Buy
        };
    }
    function mapOrderBook(orderBook) {
        //https://github.com/tradernet/tn.api#notifyOrderBook
        var res = orderBook.dom.map(function (m) {
            var ins = m.ins.map(function (x) {
                return mapOrderBookItem(m.i, tn.BookOrderActions.insert, x);
            });
            var upd = m.upd.map(function (x) {
                return mapOrderBookItem(m.i, tn.BookOrderActions.update, x);
            });
            var del = m.del.map(function (x) {
                return mapOrderBookItem(m.i, tn.BookOrderActions.remove, x);
            });
            return ins.concat(del).concat(upd);
        });
        return [].concat.apply([], res);
    }
    tn.mapOrderBook = mapOrderBook;
    function mapOrder(tnOrder) {
        return {
            id: tnOrder.id,
            date: tnOrder.date,
            status: tnOrder.stat,
            statusOriginal: tnOrder.stat_orig,
            statusDate: tnOrder.stat_d,
            security: tn.TicketCodes[tnOrder.instr],
            securityName: tnOrder.name,
            securityName2: tnOrder.name2,
            oper: tnOrder.oper,
            type: tnOrder.type,
            currency: tn.CurrencyCodes[tnOrder.cur],
            price: tnOrder.p,
            stopPrice: tnOrder.stop,
            quantity: tnOrder.q,
            allOrNothing: !!tnOrder.aon,
            expiration: tn.OrderExpirationTypes[tnOrder.exp],
            rep: tnOrder.rep,
            fv: tnOrder.fv,
            stat_prev: tnOrder.stat_prev,
            userOrderId: tnOrder.userOrderId
        };
    }
    tn.mapOrder = mapOrder;
    function mapAccount(serviceAccount) {
        return {
            availableAmount: serviceAccount.s,
            currency: tn.CurrencyCodes[serviceAccount.curr],
            currencyRate: serviceAccount.currval,
            forecastIn: serviceAccount.forecast_in,
            forecastOut: serviceAccount.forecast_out
        };
    }
    function mapPosition(servicePos) {
        return {
            security: tn.TicketCodes[servicePos.i],
            securityType: servicePos.t,
            securityKind: servicePos.k,
            price: servicePos.s,
            quantity: servicePos.q,
            currency: tn.CurrencyCodes[servicePos.curr],
            currencyRate: servicePos.currval,
            securityName: servicePos.name,
            securityName2: servicePos.name2,
            openPrice: servicePos.open_bal,
            marketPrice: servicePos.mkt_price
        };
    }
    function mapQuotes(serviceQuote) {
        return {
            security: tn.TicketCodes[serviceQuote.c],
            ticket: serviceQuote.c,
            latestPrice: serviceQuote.ltp,
            lot: serviceQuote.x_lot,
            ask: serviceQuote.bap,
            bid: serviceQuote.bbp
        };
    }
    tn.mapQuotes = mapQuotes;
})(tn || (tn = {}));
/// <reference path="./enums/ticket-codes" />
var tn;
(function (tn) {
    function getSecurity(code) {
        var securities = require("./data/MX-TQBR-190315.json");
        var seq = securities[tn.TicketCodes[code]];
        if (!seq)
            throw new Error("Code not found");
        return {
            ticket: code, code: tn.TicketCodes[code], lotSize: seq
        };
    }
    tn.getSecurity = getSecurity;
    function getSecurities() {
        var securities = require("../data/MX-TQBR-190315.json");
        return Object.keys(securities).map(function (key) {
            return {
                ticket: tn.TicketCodes[key],
                code: key,
                lotSize: securities[key]
            };
        });
    }
    tn.getSecurities = getSecurities;
    function getCodes(tickets, sort) {
        if (sort === void 0) { sort = true; }
        var res = typeof tickets[0] != "string" ? tickets.map(function (m) { return tn.TicketCodes[m]; }) : tickets;
        if (sort)
            res.sort();
        return res;
    }
    tn.getCodes = getCodes;
})(tn || (tn = {}));
///<reference path="../typings/tsd.d.ts"/>
///<reference path="./enums/ticket-codes"/>
///<reference path="./trader-net-types"/>
///<reference path="./trader-net-mapper"/>
///<reference path="./trader-net-crypto"/>
///<reference path="./trader-utils"/>
var tn;
(function (tn) {
    var io = require('socket.io-client');
    var Promise = require("bluebird");
    var TraderNet = (function () {
        function TraderNet(url, opts) {
            var _this = this;
            if (opts === void 0) { opts = {}; }
            this.url = url;
            this.opts = opts;
            this.notifyPortfolio = function () {
                _this.ws.emit('notifyPortfolio');
            };
            this.notifyOrders = function () {
                _this.ws.emit('notifyOrders');
            };
            this.notifyOrderBook = function (tickets) {
                _this.ws.emit('notifyOrderBook', tn.getCodes(tickets));
            };
            this.notifyQuotes = function (tickets) {
                //TODO: since server have some race conditions, ensure some debounce before sending
                _this.ws.emit('notifyQuotes', tn.getCodes(tickets));
            };
            this.notifyQuotesAsync = function (tickets) {
                var deferred = Promise.defer();
                var opts = {
                    onQuotesOnce: function (quotes) {
                        deferred.resolve(quotes);
                    }
                };
                _this.createNewInstance(opts).then(function (trr) { return trr.notifyQuotes(tickets); });
                return deferred.promise;
            };
            this.notifyOrdersAsync = function () {
                var deferred = Promise.defer();
                var opts = {
                    onOrdersOnce: function (orders) {
                        deferred.resolve(orders);
                    }
                };
                _this.createNewInstance(opts).then(function (trr) { return trr.notifyOrders(); });
                return deferred.promise;
            };
            this.notifyPortfolioAsync = function () {
                var deferred = Promise.defer();
                var opts = {
                    onPortfolioOnce: function (portfolio) {
                        deferred.resolve(portfolio);
                    }
                };
                _this.createNewInstance(opts).then(function (trr) { return trr.notifyPortfolio(); });
                return deferred.promise;
            };
            this.resolvers = {
                disconnect: null
            };
        }
        TraderNet.prototype.connect = function (auth) {
            var _this = this;
            this.auth = auth;
            var _ws = io(this.url, { transports: ['websocket'], forceNew: true });
            var ws = Promise.promisifyAll(_ws);
            this.ws = ws;
            return ws.onAsync("connect").then(function () {
                var data = {
                    apiKey: auth.apiKey,
                    cmd: 'getAuthInfo',
                    nonce: Date.now()
                };
                var sig = tn.security.sign(data, auth.securityKey);
                return ws.emitAsync('auth', data, sig);
            }).then(function (res) {
                if (_this.opts.onPortfolio) {
                    ws.on('portfolio', function (portfolio) {
                        _this.opts.onPortfolio(tn.mapPortfolio(portfolio[0].ps));
                    });
                }
                if (_this.opts.onPortfolioOnce)
                    ws.once('portfolio', function (portfolio) {
                        _this.opts.onPortfolioOnce(tn.mapPortfolio(portfolio[0].ps));
                        _this.disconnect();
                    });
                if (_this.opts.onOrders)
                    ws.on('orders', function (orders) { return _this.opts.onOrders(orders[0].orders.order.map(tn.mapOrder)); });
                if (_this.opts.onOrdersOnce)
                    ws.once('orders', function (orders) {
                        _this.opts.onOrdersOnce(orders[0].orders.order.map(tn.mapOrder));
                        _this.disconnect();
                    });
                if (_this.opts.onOrderBook)
                    ws.on('b', function (orders) { return _this.opts.onOrderBook(tn.mapOrderBook(orders)); });
                if (_this.opts.onQuotes)
                    ws.on('q', function (quotes) { return _this.opts.onQuotes(quotes.q.map(tn.mapQuotes)); });
                if (_this.opts.onQuotesOnce)
                    ws.once('q', function (quotes) {
                        _this.opts.onQuotesOnce(quotes.q.map(tn.mapQuotes));
                        _this.disconnect();
                    });
                ws.on('disconnect', function () {
                    if (_this.resolvers.disconnect) {
                        _this.resolvers.disconnect.resolve();
                        _this.resolvers.disconnect = null;
                    }
                    _this.ws = null;
                });
                return res;
            });
        };
        TraderNet.prototype.disconnect = function () {
            if (!this.ws)
                return Promise.reject("Not connected");
            if (this.resolvers.disconnect)
                return Promise.reject("Already disconnecting");
            this.resolvers.disconnect = Promise.defer();
            var promise = this.resolvers.disconnect.promise;
            this.ws.disconnect();
            return promise;
        };
        TraderNet.prototype.putOrder = function (data) {
            var formatted = tn.formatPutOrder(data);
            return this.ws.emitAsync('putOrder', formatted);
        };
        TraderNet.prototype.createNewInstance = function (opts) {
            var trr = new TraderNet(this.url, opts);
            return trr.connect(this.auth).then(function () { return trr; });
        };
        return TraderNet;
    })();
    tn.TraderNet = TraderNet;
})(tn || (tn = {}));
module.exports = tn;
