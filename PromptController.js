const headerSuffix = "Phraseology Prompts";
const airportInfoUrl = 'airportInfo.json';
const aircraftUrl = 'aircraft.json';
const airportsUrl = 'flightFollowingAirports.json';
const flightPlansUrl = 'flightPlans.json';
const metarsUrl = 'metars.json';

let airportInfo = {
    "info": {
        "icao": "KDMO",
        "faa": "DMO",
        "name": "Demonstration Airport",
        "name_short": "Demo"
    },
    "positions": {
        "clearance": "Clearance",
        "ground": "Ground"
    },
    "runways": {
        "available": [
            {
                "heading": 180,
                "runways": ["18"]
            },
            {
                "heading": 360,
                "runways": ["36"]
            }
        ],
        "calm_wind": ["18"]
    },
    "taxiways": {
        "18": ["A", "B", "C", "D", "E", "F"],
        "36": ["A", "B", "C", "D", "E", "F"]
    }
};

let metarList = [ 
        "00000KT 10SM CLR 19/14 A3015 RMK AO2 SLP203 T01940139 $",
        "00000KT 10SM CLR 29/22 A3003 RMK AO2 SLP159 T02890217 10289 20228 58007 $",
        "01004KT 10SM CLR 22/17 A3011 RMK AO2 SLP189 T02170167 53016 $",
        "01006KT 10SM -RA BKN008 BKN120 21/19 A3001 RMK AO2 P0000 T02110194 $",
        "01008KT 10SM CLR 25/16 A3006 RMK AO2 SLP172 T02500156 10267 20200 55005 $"
    ];

const checkInTypes = [ 'arrival', 'departure', 'flightFollowing', 'reposition', 'clearance', 'callsign' ];

// parking == where they stay for the night
// reposition == where they park temporarily before parking for the night
let aircraft = [
    {"type": "C152", "medevac": false, "callsign": null, "callsignSpoken": null, "name": "Aerobat",  "registration": "152TM", "parkingName": "Rich Aviation", "parking": "25N", "repositionName": null,     "reposition": null,  "flightSchool": "Rich Aviation",     "ifr": false },
    {"type": "C172", "medevac": false, "callsign": null, "callsignSpoken": null, "name": "Cessna",   "registration": "553RA", "parkingName": "Rich Aviation", "parking": "25N", "repositionName": null,     "reposition": null,  "flightSchool": "Rich Aviation",     "ifr": false },
    {"type": "C172", "medevac": false, "callsign": null, "callsignSpoken": null, "name": "Cessna",   "registration": "733WG", "parkingName": "Flying Club",   "parking": "2S",  "repositionName": "Modern", "reposition": "MOD", "flightSchool": "Flying Club",       "ifr": false },
    {"type": "C172", "medevac": false, "callsign": null, "callsignSpoken": null, "name": "Cessna",   "registration": "1041Q", "parkingName": "Flying Club",   "parking": "2S",  "repositionName": null,     "reposition": null,  "flightSchool": "Flying Club",       "ifr": false },
    {"type": "C172", "medevac": false, "callsign": null, "callsignSpoken": null, "name": "Cessna",   "registration": "3744L", "parkingName": "Rich Aviation", "parking": "25N", "repositionName": null,     "reposition": null,  "flightSchool": "Rich Aviation",     "ifr": false },
    {"type": "C172", "medevac": false, "callsign": null, "callsignSpoken": null, "name": "Cessna",   "registration": "5437J", "parkingName": "4 North",       "parking": "4N",  "repositionName": null,     "reposition": null,  "flightSchool": "Delta Qualiflight", "ifr": false },
    {"type": "C172", "medevac": false, "callsign": null, "callsignSpoken": null, "name": "Cessna",   "registration": "5437J", "parkingName": "Flying Club",   "parking": "2S",  "repositionName": null,     "reposition": null,  "flightSchool": "Flying Club",       "ifr": false },
    {"type": "C172", "medevac": false, "callsign": null, "callsignSpoken": null, "name": "Cessna",   "registration": "7296Q", "parkingName": "Rich Aviation", "parking": "25N", "repositionName": null,     "reposition": null,  "flightSchool": "Rich Aviation",     "ifr": false },
    {"type": "C172", "medevac": false, "callsign": null, "callsignSpoken": null, "name": "Cessna",   "registration": "7487G", "parkingName": "Rich Aviation", "parking": "25N", "repositionName": null,     "reposition": null,  "flightSchool": "Rich Aviation",     "ifr": false },
    {"type": "C172", "medevac": false, "callsign": null, "callsignSpoken": null, "name": "Cessna",   "registration": "46550", "parkingName": "Rich Aviation", "parking": "25N", "repositionName": null,     "reposition": null,  "flightSchool": "Rich Aviation",     "ifr": false },
    {"type": "C172", "medevac": false, "callsign": null, "callsignSpoken": null, "name": "Cessna",   "registration": "63332", "parkingName": "Flying Club",   "parking": "2S",  "repositionName": "Modern", "reposition": "MOD", "flightSchool": "Flying Club",       "ifr": false },
    {"type": "C177", "medevac": false, "callsign": null, "callsignSpoken": null, "name": "Cardinal", "registration": "2083Q", "parkingName": "Rich Aviation", "parking": "25N", "repositionName": null,     "reposition": null,  "flightSchool": "Rich Aviation",     "ifr": false },
    {"type": "P28A", "medevac": false, "callsign": null, "callsignSpoken": null, "name": "Cherokee", "registration": "154FT", "parkingName": "4 North",       "parking": "4N",  "repositionName": null,     "reposition": null,  "flightSchool": "Delta Qualiflight", "ifr": false },
    {"type": "P28A", "medevac": false, "callsign": null, "callsignSpoken": null, "name": "Cherokee", "registration": "1914H", "parkingName": "4 North",       "parking": "4N",  "repositionName": null,     "reposition": null,  "flightSchool": "Delta Qualiflight", "ifr": false },
    {"type": "P28A", "medevac": false, "callsign": null, "callsignSpoken": null, "name": "Cherokee", "registration": "2135B", "parkingName": "4 North",       "parking": "4N",  "repositionName": null,     "reposition": null,  "flightSchool": "Delta Qualiflight", "ifr": false },
    {"type": "P28A", "medevac": false, "callsign": null, "callsignSpoken": null, "name": "Cherokee", "registration": "2202W", "parkingName": "4 North",       "parking": "4N",  "repositionName": null,     "reposition": null,  "flightSchool": "Delta Qualiflight", "ifr": false },
    {"type": "P28A", "medevac": false, "callsign": null, "callsignSpoken": null, "name": "Cherokee", "registration": "2233W", "parkingName": "4 North",       "parking": "4N",  "repositionName": null,     "reposition": null,  "flightSchool": "Delta Qualiflight", "ifr": false },
    {"type": "P28A", "medevac": false, "callsign": null, "callsignSpoken": null, "name": "Cherokee", "registration": "2236W", "parkingName": "4 North",       "parking": "4N",  "repositionName": null,     "reposition": null,  "flightSchool": "Delta Qualiflight", "ifr": false },
    {"type": "P28A", "medevac": false, "callsign": null, "callsignSpoken": null, "name": "Cherokee", "registration": "5120S", "parkingName": "Rich Aviation", "parking": "25N", "repositionName": null,     "reposition": null,  "flightSchool": "Rich Aviation",     "ifr": false },
    {"type": "P28A", "medevac": false, "callsign": null, "callsignSpoken": null, "name": "Cherokee", "registration": "6281C", "parkingName": "4 North",       "parking": "4N",  "repositionName": null,     "reposition": null,  "flightSchool": "Delta Qualiflight", "ifr": false },
    {"type": "P28A", "medevac": false, "callsign": null, "callsignSpoken": null, "name": "Cherokee", "registration": "8097H", "parkingName": "4 North",       "parking": "4N",  "repositionName": null,     "reposition": null,  "flightSchool": "Delta Qualiflight", "ifr": false },
    {"type": "P28A", "medevac": false, "callsign": null, "callsignSpoken": null, "name": "Cherokee", "registration": "8135G", "parkingName": "4 North",       "parking": "4N",  "repositionName": null,     "reposition": null,  "flightSchool": "Delta Qualiflight", "ifr": false },
    {"type": "P28A", "medevac": false, "callsign": null, "callsignSpoken": null, "name": "Cherokee", "registration": "8137U", "parkingName": "4 North",       "parking": "4N",  "repositionName": null,     "reposition": null,  "flightSchool": "Delta Qualiflight", "ifr": false },
    {"type": "P28A", "medevac": false, "callsign": null, "callsignSpoken": null, "name": "Cherokee", "registration": "8405B", "parkingName": "4 North",       "parking": "4N",  "repositionName": null,     "reposition": null,  "flightSchool": "Delta Qualiflight", "ifr": false },
    {"type": "P28A", "medevac": false, "callsign": null, "callsignSpoken": null, "name": "Cherokee", "registration": "9062K", "parkingName": "4 North",       "parking": "4N",  "repositionName": null,     "reposition": null,  "flightSchool": "Delta Qualiflight", "ifr": false },
    {"type": "P28A", "medevac": false, "callsign": null, "callsignSpoken": null, "name": "Cherokee", "registration": "9358C", "parkingName": "4 North",       "parking": "4N",  "repositionName": null,     "reposition": null,  "flightSchool": "Delta Qualiflight", "ifr": false },
    {"type": "P28A", "medevac": false, "callsign": null, "callsignSpoken": null, "name": "Cherokee", "registration": "9717C", "parkingName": "4 North",       "parking": "4N",  "repositionName": null,     "reposition": null,  "flightSchool": "Delta Qualiflight", "ifr": false },
    {"type": "P28A", "medevac": false, "callsign": null, "callsignSpoken": null, "name": "Cherokee", "registration": "42998", "parkingName": "4 North",       "parking": "4N",  "repositionName": null,     "reposition": null,  "flightSchool": "Delta Qualiflight", "ifr": false },
    {"type": "P28A", "medevac": false, "callsign": null, "callsignSpoken": null, "name": "Cherokee", "registration": "42998", "parkingName": "Flying Club",   "parking": "2S",  "repositionName": null,     "reposition": null,  "flightSchool": "Flying Club",       "ifr": false },
    {"type": "P28A", "medevac": false, "callsign": null, "callsignSpoken": null, "name": "Cherokee", "registration": "43408", "parkingName": "4 North",       "parking": "4N",  "repositionName": null,     "reposition": null,  "flightSchool": "Delta Qualiflight", "ifr": false },
    {"type": "P28A", "medevac": false, "callsign": null, "callsignSpoken": null, "name": "Cherokee", "registration": "47615", "parkingName": "4 North",       "parking": "4N",  "repositionName": null,     "reposition": null,  "flightSchool": "Delta Qualiflight", "ifr": false },
    {"type": "P28A", "medevac": false, "callsign": null, "callsignSpoken": null, "name": "Cherokee", "registration": "81981", "parkingName": "4 North",       "parking": "4N",  "repositionName": null,     "reposition": null,  "flightSchool": "Delta Qualiflight", "ifr": false },
    {"type": "P28A", "medevac": false, "callsign": null, "callsignSpoken": null, "name": "Cherokee", "registration": "82075", "parkingName": "4 North",       "parking": "4N",  "repositionName": null,     "reposition": null,  "flightSchool": "Delta Qualiflight", "ifr": false },
    {"type": "PA34", "medevac": false, "callsign": null, "callsignSpoken": null, "name": "Seneca",   "registration": "44AE",  "parkingName": "4 North",       "parking": "4N",  "repositionName": null,     "reposition": null,  "flightSchool": "Delta Qualiflight", "ifr": false },
    {"type": "PA34", "medevac": false, "callsign": null, "callsignSpoken": null, "name": "Seneca",   "registration": "777JR", "parkingName": "4 North",       "parking": "4N",  "repositionName": null,     "reposition": null,  "flightSchool": "Delta Qualiflight", "ifr": false },
    {"type": "PA34", "medevac": false, "callsign": null, "callsignSpoken": null, "name": "Seneca",   "registration": "969WA", "parkingName": "4 North",       "parking": "4N",  "repositionName": null,     "reposition": null,  "flightSchool": "Delta Qualiflight", "ifr": false },
    {"type": "PA34", "medevac": false, "callsign": null, "callsignSpoken": null, "name": "Seneca",   "registration": "977LB", "parkingName": "4 North",       "parking": "4N",  "repositionName": null,     "reposition": null,  "flightSchool": "Delta Qualiflight", "ifr": false },
    {"type": "PA34", "medevac": false, "callsign": null, "callsignSpoken": null, "name": "Seneca",   "registration": "8691E", "parkingName": "4 North",       "parking": "4N",  "repositionName": null,     "reposition": null,  "flightSchool": "Delta Qualiflight", "ifr": false }
];

let airports = [
    {"airportFAA": "WEA", "airportICAO": "KWEA", "airportName": "Parker County"},
    {"airportFAA": "TKI", "airportICAO": "KTKI", "airportName": "Mckinney"},
    {"airportFAA": "ADS", "airportICAO": "KADS", "airportName": "Addison"},
    {"airportFAA": "DTO", "airportICAO": "KDTO", "airportName": "Denton"},
    {"airportFAA": "RBD", "airportICAO": "KRBD", "airportName": "Dallas Executive"},
    {"airportFAA": "DAL", "airportICAO": "KDAL", "airportName": "Dallas Love"},
    {"airportFAA": "GPM", "airportICAO": "KGPM", "airportName": "Grand Prairie "},
    {"airportFAA": "GKY", "airportICAO": "KGKY", "airportName": "Arlington"},
    {"airportFAA": "HQZ", "airportICAO": "KHQZ", "airportName": "Mesquite"},
    {"airportFAA": "LNC", "airportICAO": "KLNC", "airportName": "Lancaster"},
    {"airportFAA": "FWS", "airportICAO": "KFWS", "airportName": "Spinks"},
    {"airportFAA": "MWL", "airportICAO": "KMWL", "airportName": "Mineral Wells"},
    {"airportFAA": "SEP", "airportICAO": "KSEP", "airportName": "Stephenville"},
    {"airportFAA": "CPT", "airportICAO": "KCPT", "airportName": "Cleburne"},
    {"airportFAA": "CRS", "airportICAO": "KCRS", "airportName": "Corsicana"},
    {"airportFAA": "GVT", "airportICAO": "KGVT", "airportName": "Majors Field"},
    {"airportFAA": "GLE", "airportICAO": "KGLE", "airportName": "Gainesville Municipal"},
    {"airportFAA": "GDJ", "airportICAO": "KGDJ", "airportName": "Granbury"},
    {"airportFAA": "LUD", "airportICAO": "KLUD", "airportName": "Decatur"},
    {"airportFAA": "0F2", "airportICAO": "0F2",  "airportName": "Bowie Municipal"},
    {"airportFAA": "TYR", "airportICAO": "KTYR", "airportName": "Tyler"},
    {"airportFAA": "PRX", "airportICAO": "KPRX", "airportName": "Cox Field"}
];

let ifrFlightPlans = [
    { "destination": "KAUS", "destinationName": "Austin",            "minAlt": 5, "maxAlt": 60, "route": "KFTW JPOOL8 WINDU SEWZY6 KAUS" },
    { "destination": "KCFD", "destinationName": "Bryan",             "minAlt": 5, "maxAlt": 60, "route": "KFTW TTT JASPA KCFD" },
    { "destination": "KCLL", "destinationName": "College Station",   "minAlt": 5, "maxAlt": 60, "route": "KFTW JPOOL8 CLL KCLL" },
    { "destination": "KEDC", "destinationName": "Austin Executive",  "minAlt": 5, "maxAlt": 60, "route": "KFTW JPOOL8 WINDU BLEWE5 KEDC" },
    { "destination": "KHOU", "destinationName": "Houston Hobby",     "minAlt": 5, "maxAlt": 60, "route": "KFTW JPOOL8 ELLVR KIDDZ5<br>KHOU" },
    { "destination": "KSAT", "destinationName": "San Antonio",       "minAlt": 5, "maxAlt": 60, "route": "+TEX5 EAKER MLC+<br>KFTW MLC KSAT" },
    { "destination": "KSAT", "destinationName": "San Antonio",       "minAlt": 5, "maxAlt": 60, "route": "KFTW JPOOL8 WINDU QERVO1<br>KSAT" },
    { "destination": "KSGR", "destinationName": "Sugarland",         "minAlt": 5, "maxAlt": 60, "route": "KFTW JPOOL8 ELLVR SNDAY1<br>KSGR" },
    { "destination": "KSJT", "destinationName": "San Angelo",        "minAlt": 5, "maxAlt": 60, "route": "+KING5 MQP KSJT+<br>KFTW KSJT" },
    { "destination": "KTME", "destinationName": "Houston Executive", "minAlt": 5, "maxAlt": 60, "route": "KFTW JPOOL8 ELLVR SNDAY1<br>KTME" },
    { "destination": "KTYR", "destinationName": "Tyler",             "minAlt": 5, "maxAlt": 60, "route": "KFTW GARL6 TYR KTYR" }
]; 

const taxiwayList = [ "A1",
                   "A2",
                   "D",
                   "C",
                   "A6" ];

const atisOptions = [ "+", "WX", "previous", "-" ];

const informationList = [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' ];
var runwayInUse = "";
var lastFocusElement = "";

var checkInList = [];

// Check In Types

// Settings

// Check Ins
//  Voice Prompts

// SIA

// Local Reference

// Activity Log

// Flight Progress Strip

// STARs


class CallIn {
    constructor( aircraft ) {
        this.aircraft = aircraft;
        this.squawk = '' + Math.floor( Math.random() * 6 ) + Math.floor( Math.random() * 7 ) + Math.floor( Math.random() * 7 ) + Math.floor( Math.random() * 7 );
    }

    airCarrier() {
        let flightNum = this.aircraft.registration.split('').reverse().join('');
        flightNum = flightNum.replace(/(.{2})/g, '$1 ');
        flightNum = flightNum.split('').reverse().join('');
        return ( this.aircraft.medevac ? "Medevac " : '' ) + this.aircraft.callsignSpoken + " " + flightNum;
    }

    getAcftIdForOutput() {
        let output = this.aircraft.medevac ? "L" : " ";
        if ( this.aircraft.callsign != null ) {
            output += this.aircraft.callsign + this.aircraft.registration;
        } else {
            output += "N" + this.aircraft.registration;
        }
        return output.padEnd( 8, " " );
    }

    getAcftIdForInput() {
        if ( this.aircraft.callsign != null ) {
            return this.aircraft.callsign + this.aircraft.registration;
        } else {
            return this.aircraft.registration;
        }
    }

    requestCallsign() {
        if ( this.aircraft.callsign != null ) {
            return this.airCarrier();
        } else {
            let spokenID = ( this.aircraft.medevac ? "Medevac" : this.aircraft.name );
            if ( document.getElementById( 'truncateCallsigns' ).value === "none" ) {
                spokenID += " " + alphanumerics( this.aircraft.registration );
            } else if ( document.getElementById( 'truncateCallsigns' ).value === "first3" ) {
                spokenID += " " + alphanumerics( this.aircraft.registration.slice(0, 3) );
            } else if ( document.getElementById( 'truncateCallsigns' ).value === "last3" ) {
                spokenID += " " + alphanumerics( this.aircraft.registration.slice(-3) );
            } else if ( document.getElementById( 'truncateCallsigns' ).value === "rand3" ) {
                let length = this.aircraft.registration.length - 3;
                let randStart = Math.floor( Math.random() * length );
                spokenID += " " + alphanumerics( this.aircraft.registration.slice(randStart, randStart+3) );
            }
            return spokenID;
        }
    }

    shortCallsign() {
        if ( this.aircraft.callsign != null ) {
            return this.airCarrier();
        } else {
            let spokenID = ( this.aircraft.medevac ? "Medevac" : this.aircraft.name );
            spokenID += " " + alphanumerics( this.aircraft.registration.slice(-3) );
            return spokenID;
        }
    }

    getSquawk() {
        return this.squawk;
    }
}

class Arrival extends CallIn {
    constructor( aircraft, location ) {
        super( aircraft );
        this.location = location;
        this.parkingName = ( !this.aircraft.repositionName ? this.aircraft.parkingName : this.aircraft.repositionName );
        this.parking = ( !this.aircraft.reposition ? this.aircraft.parking : this.aircraft.reposition );
        this.intent = "taxi to";
    }
    
    initialCall() {
        let locationVerb = [ 
            "",
            alphanumerics( this.location ),
            this.parkingName,
            `off at ${alphanumerics( this.location )}`,
            `off runway ${alphanumerics(runwayInUse)} at ${alphanumerics( this.location )}`,
            `off runway ${alphanumerics(runwayInUse)} at ${alphanumerics( this.location )} request taxi`,
            `off runway ${alphanumerics(runwayInUse)} at ${alphanumerics( this.location )} ${this.parkingName}`,
            `off runway ${alphanumerics(runwayInUse)} at ${alphanumerics( this.location )} ${this.intent} ${this.parkingName}`
            `clearing at ${alphanumerics( this.location )}`,
            `clearing runway ${alphanumerics(runwayInUse)} at ${alphanumerics( this.location )}`,
            `clearing runway ${alphanumerics(runwayInUse)} at ${alphanumerics( this.location )} request taxi`,
            `clearing runway ${alphanumerics(runwayInUse)} at ${alphanumerics( this.location )} ${this.parkingName}`,
            `clearing runway ${alphanumerics(runwayInUse)} at ${alphanumerics( this.location )} ${this.intent} ${this.parkingName}`
        ];
        let random = Math.floor( Math.random() * locationVerb.length );

        return condenseWhiteSpace( `${airportInfo.positions.ground}, ${this.requestCallsign()} ${locationVerb[random]}` );
    }

    requestAgain() {
        return `${this.requestCallsign()} at ${alphanumerics( this.location )} ${this.intent} ${this.parkingName}`;
    }

    requestParking() {
        return `${this.parkingName}, ${this.shortCallsign()}`;
    }

    requestPosition() {
        return `${alphanumerics( this.location )}, ${this.shortCallsign()}`;
    }

    requestIntent() {
        return `${this.intent} ${this.requestParking()}`;
    }

    toString() {
        return `${this.aircraft.type} ${this.getAcftIdForOutput()} ARR  ${this.location.padStart(3," ")} → ${this.parking.padStart(3," ")}`;
    }
}

class Departure extends CallIn {
    constructor( aircraft, atis ) {
        super( aircraft );
        this.atis = atis;
        this.intent = "request taxi to the active";
    }
    
    initialCall() {
        return `${airportInfo.positions.ground}, ${this.requestCallsign()} at ${this.aircraft.parkingName} ${this.intent} ${atisToText( this.atis )}`;
    }

    requestAgain() {
        return `${this.requestCallsign()} at ${this.aircraft.parkingName} ${this.intent}`;
    }

    requestParking() {
        return `${this.aircraft.parkingName}, ${this.shortCallsign()}`;
    }

    requestPosition() {
        return `${this.aircraft.parkingName}, ${this.shortCallsign()}`;
    }

    requestIntent() {
        return `${this.intent}, ${this.shortCallsign()}`;
    }

    toString() {
        return `${this.aircraft.type} ${this.getAcftIdForOutput()} DEP  ${this.aircraft.parking.padStart(3," ")} → RWY ${runwayInUse} ${this.atis}`;
    }
}

class FlightFollowing extends CallIn {
    constructor( aircraft, destination, altitude ) {
        super( aircraft );
        this.destination = destination;
        this.altitude = altitude;
        this.intent = "request flight following to";
    }
    
    initialCall() {
        return `${airportInfo.positions.clearance}, ${this.requestCallsign()} ${this.intent} ${this.destination.airportName} at ${this.altitude * 100}`;
    }

    requestAgain() {
        return `${this.requestCallsign()} ${this.intent} ${alphanumerics( this.destination.airportICAO )} at ${this.altitude * 100}`;
    }

    requestParking() {
        return `${this.aircraft.parkingName}, ${this.shortCallsign()}`;
    }

    requestPosition() {
        return `${this.aircraft.parkingName}, ${this.shortCallsign()}`;
    }

    requestIntent() {
        return `${this.intent} ${alphanumerics( this.destination.airportICAO )} ${this.shortCallsign()}`;
    }

    flightFollowingInput() {
        return `${this.getAcftIdForInput()} ${this.destination.airportFAA} ${this.aircraft.type} ${this.altitude} ${runwayInUse == 16 ? "1D" : "1M"}`;
    }

    toString() {
        return `${this.aircraft.type} ${this.getAcftIdForOutput()} FF   ${this.destination.airportFAA} @ ${this.altitude}`;
    }
}

class Reposition extends CallIn {
    constructor( aircraft ) {
        super( aircraft );
        this.intent = "request reposition to";
    }
    
    initialCall() {
        return `${airportInfo.positions.ground}, ${this.requestCallsign()} at ${this.aircraft.repositionName} ${this.intent} ${this.aircraft.parkingName}`;
    }

    requestAgain() {
        return `${this.requestCallsign()} at ${this.aircraft.repositionName} ${this.intent} ${this.aircraft.parkingName}`;
    }

    requestParking() {
        return `${this.aircraft.parkingName}, ${this.shortCallsign()}`;
    }

    requestPosition() {
        return `${this.aircraft.repositionName}, ${this.shortCallsign()}`;
    }

    requestIntent() {
        return `${this.intent} ${this.requestParking()}`;
    }

    toString() {
        return `${this.aircraft.type} ${this.getAcftIdForOutput()} RPOS ${this.aircraft.reposition.padStart(3," ")} → ${this.aircraft.parking.padStart(3," ")}`;
    }
}

class Clearance extends CallIn {
    constructor( aircraft, route ) {
        super( aircraft );
        this.route = route;
        this.altitude = ( Math.floor( Math.random() * ( this.route.maxAlt - this.route.minAlt ) ) + this.route.minAlt ) + "0";
        this.intent = "request clearance to";
        this.cid = '' + Math.floor( Math.random() * 9 ) + Math.floor( Math.random() * 9 ) + Math.floor( Math.random() * 9 );
        var date = new Date();
        
        let startTime = new Date();
        startTime.setHours(startTime.getHours() - 3);
        let endTime = new Date();
        endTime.setMinutes(endTime.getMinutes() + 30);

        // Convert start and end times to milliseconds since epoch
        const startMillis = startTime.getTime();
        const endMillis = endTime.getTime();

        // Generate a random number of milliseconds within the range
        const randomMillis = Math.random() * (endMillis - startMillis) + startMillis;

        // this.depTime = "P" + String(date.getUTCHours()).padStart(2,"0") + String(date.getUTCMinutes()).padStart(2,"0")
        date = new Date(randomMillis);
        this.depTime = "P" + String(date.getUTCHours()).padStart(2,"0") + String(date.getUTCMinutes()).padStart(2,"0");
    }
    
    initialCall() {
        return `${airportInfo.positions.clearance}, ${this.requestCallsign()} at ${this.aircraft.parkingName} ${this.intent} ${this.route.destinationName}`;
    }

    requestAgain() {
        return `${this.requestCallsign()} at ${this.aircraft.parkingName} ${this.intent} ${this.route.destinationName}`;
    }

    requestParking() {
        return `${this.aircraft.parkingName}, ${this.shortCallsign()}`;
    }

    requestPosition() {
        return `${this.aircraft.parkingName}, ${this.shortCallsign()}`;
    }

    requestIntent() {
        return `${this.intent} ${this.route.destinationName}, ${this.shortCallsign()}`;
    }

    toString() {
        return `${this.aircraft.type} ${this.getAcftIdForOutput()} CLNC ${this.route.destination}`;
    }
}

class Callsign extends CallIn {
    constructor( aircraft ) {
        super( aircraft );
    }
    
    initialCall() {
        return `${airportInfo.positions.ground}, ${this.requestCallsign()}`;
    }

    requestAgain() {
        return this.requestCallsign();
    }

    requestParking() {
        return this.shortCallsign();
    }

    requestPosition() {
        return this.shortCallsign();
    }

    requestIntent() {
        return this.shortCallsign();
    }

    toString() {
        return `${this.aircraft.type} ${this.getAcftIdForOutput()} ${this.aircraft.flightSchool}`;
    }
}

async function fetchFacilities() {
    const response = await fetch( './facilityList.json' );
    document.getElementById( "facilitySelection" ).replaceChildren();
    let facilities = await response.json();
    facilities.forEach( facility => {
        let opt = document.createElement('option');
        opt.value = facility.id.toLowerCase();
        opt.textContent += facility.id;
        opt.title = facility.name;
        document.getElementById( "facilitySelection" ).appendChild(opt);
    });
}

async function fetchAirportInfo( airport ) {
    const response = await fetch( `./facilities/${airport}/${airportInfoUrl}` );
    return await response.json();
}

async function fetchAircraft( airport ) {
    const response = await fetch( `./facilities/${airport}/${aircraftUrl}` );
    let tempList = await response.json();
    return tempList.filter( acft => acft.parking != null );
}

async function fetchAirports( airport ) {
    const response = await fetch( `./facilities/${airport}/${airportsUrl}` );
    return await response.json();
}

async function fetchFlightPlans( airport ) {
    const response = await fetch( `./facilities/${airport}/${flightPlansUrl}` );
    return await response.json();
}

async function fetchMetars( airport ) {
    const response = await fetch( `./facilities/${airport}/${metarsUrl}` );
    return await response.json();
}

async function setFacility( airport ) {
    airportInfo = await fetchAirportInfo( airport );
    aircraft = await fetchAircraft( airport );
    airports = await fetchAirports( airport );
    ifrFlightPlans = await fetchFlightPlans( airport );
    metarList = await fetchMetars( airport );

    updateHeader();
    updateLocalAircraft();
    getNewMETAR();
}

function updateHeader() {
    document.getElementById("headerText").innerHTML = `${airportInfo.info.name_short} ${headerSuffix}`;
}

function updateLocalAircraft( sortBy ) {
    let toReturn = "";
    let localList = aircraft.filter( acft => acft.flightSchool != null );
    // sort by callsign and school
    switch ( sortBy ) {
        case "callsign":
            localList.sort((a, b) => {
                const nameA = a.registration.toUpperCase();
                const nameB = b.registration.toUpperCase();
                return ( nameA < nameB ? -1 : 1 );
            });
            break;
        case "last3":
            localList.sort((a, b) => {
                const nameA = a.registration.slice(-3).toUpperCase();
                const nameB = b.registration.slice(-3).toUpperCase();
                return ( nameA < nameB ? -1 : 1 );
            });
            break;
        case "type":
            localList.sort((a, b) => {
                const nameA = a.type.toUpperCase();
                const nameB = b.type.toUpperCase();
                return ( nameA < nameB ? -1 : 1 );
            });
            break;
        case "company":
            localList.sort((a, b) => {
                const nameA = a.flightSchool.toUpperCase();
                const nameB = b.flightSchool.toUpperCase();
                return ( nameA < nameB ? -1 : 1 );
            });
            break;
    }
    localList.forEach( ( acft ) => {
        toReturn += `${acft.type} N${acft.registration.padEnd(5," ")} ${acft.flightSchool}\n`
    });

    document.getElementById("localAircraftDisplay").innerHTML = toReturn;
}

async function main() {
    await fetchFacilities();

    await setFacility( document.getElementById("facilitySelection").value );
    updateTime(); // Display time immediately on page load
    setInterval(updateTime, 1000);
    setTheme( document.getElementById("themeSelection").value );
    updateDisplay();
    
    getNewMETAR();
}

function getMETAR() {
    var date = new Date();
    if ( String(date.getUTCMinutes()) < 52 ) {
        date = new Date( Date.now() - 1000 * 60 * date.getUTCMinutes() );
    }
    var obsDay = String(date.getUTCDate()).padStart(2,"0");
    var obsHour = String(date.getUTCHours()).padStart(2,"0");
    var obsMin = "53";
    let observationTime = obsDay + obsHour + obsMin + "Z";

    return `${airportInfo.info.icao} ${observationTime} ${metarList[ Math.floor( Math.random() * metarList.length ) ]}`;
}

function getNewMETAR() {
    document.getElementById("currentMETAR").innerHTML = getMETAR();

    getRunways();
    document.getElementById("currentRunway").innerHTML = runwayInUse;

    let information = document.getElementById("currentATIS").innerHTML;
    if ( information === "" ) {
        information = informationList[ Math.floor( Math.random() * informationList.length ) ];
    } else {
        information = informationList[ ( informationList.indexOf( information ) + 1 ) % informationList.length ];
    }
    document.getElementById("currentATIS").innerHTML = information;
}

function getRunways() {
    var metarComponents = document.getElementById("currentMETAR").innerHTML.split( " " );
    for (let i = 0; i < metarComponents.length; i++) {
        if ( metarComponents[i].includes( "KT" ) ) {
            var windDir = metarComponents[i].substring(0,3);

            // if wind calm or variable -> calm wind
            if ( windDir === "000" ) {
                runwayInUse = airportInfo.runways.calm_wind[0];
            } else if ( windDir === "VRB" ) {
                runwayInUse = airportInfo.runways.calm_wind[0];
            } else {
                windDir = Number(windDir);
                let minAIdx = airportInfo.runways.available.reduce((minAIdx, currRwy, currIdx, arr) => {
                    if ( Math.abs(currRwy.heading - windDir) < Math.abs(arr[minAIdx].heading - windDir) ) {
                        return currIdx;
                    }
                    return minAIdx;
                }, 0);

                let minBIdx = airportInfo.runways.available.reduce((minBIdx, currRwy, currIdx, arr) => {
                    if ( Math.abs(360 - currRwy.heading + windDir) < Math.abs(360 - arr[minBIdx].heading + windDir) ) {
                        return currIdx;
                    }
                    return minBIdx;
                }, 0);

                let minADiff = Math.abs(airportInfo.runways.available[minAIdx].heading - windDir);
                let minBDiff = Math.abs(360 - airportInfo.runways.available[minBIdx].heading + windDir);
                runwayInUse = ( minADiff <= minBDiff ? airportInfo.runways.available[minAIdx] : airportInfo.runways.available[minBIdx] ).runways[0];
            }
        }
    }
}

function alphanumerics( characters ) {
    let converted = "";
    for (let i = 0; i < characters.toString().length; i++) {
        switch (characters.toString().charAt(i)) {
            case "A":
                converted += "Alpha ";
                break;
            case "B":
                converted += "Bravo ";
                break;
            case "C":
                converted += "Charlie ";
                break;
            case "D":
                converted += "Delta ";
                break;
            case "E":
                converted += "Echo ";
                break;
            case "F":
                converted += "Foxtrot ";
                break;
            case "G":
                converted += "Golf ";
                break;
            case "H":
                converted += "Hotel ";
                break;
            case "I":
                converted += "India ";
                break;
            case "J":
                converted += "Juliet ";
                break;
            case "K":
                converted += "Kilo ";
                break;
            case "L":
                converted += "Lima ";
                break;
            case "M":
                converted += "Mike ";
                break;
            case "N":
                converted += "November ";
                break;
            case "O":
                converted += "Oscar ";
                break;
            case "P":
                converted += "Papa ";
                break;
            case "Q":
                converted += "Quebec ";
                break;
            case "R":
                converted += "Romeo ";
                break;
            case "S":
                converted += "Sierra ";
                break;
            case "T":
                converted += "Tango ";
                break;
            case "U":
                converted += "Uniform ";
                break;
            case "V":
                converted += "Victor ";
                break;
            case "W":
                converted += "Whiskey ";
                break;
            case "X":
                converted += "X-Ray ";
                break;
            case "Y":
                converted += "Yankee ";
                break;
            case "Z":
                converted += "Zulu ";
                break;
            case "0":
                converted += "Zero ";
                break;
            case "1":
                converted += "One ";
                break;
            case "2":
                converted += "Two ";
                break;
            case "3":
                converted += "Three ";
                break;
            case "4":
                converted += "Four ";
                break;
            case "5":
                converted += "Five ";
                break;
            case "6":
                converted += "Six ";
                break;
            case "7":
                converted += "Seven ";
                break;
            case "8":
                converted += "Eight ";
                break;
            case "9":
                converted += "Niner ";
                break;
        }
    }
    return converted.trim();
}

function newCheckIn() {
    clearFlightProgressStrip();
    document.getElementById("btnStarsEntry").style.display = "none";
    document.getElementById("txtStarsEntry").style.display = "none";
    document.getElementById("starsEntry").style.display = "none";
    document.getElementById("starsError").style.display = "none";

    let selectedCheckInTypes = [];
    if ( document.getElementById("chkbxCallsignPractice").checked ) {
        selectedCheckInTypes.push( 'callsign' );
    }
    if ( document.getElementById("chkbxClearance").checked ) {
        selectedCheckInTypes.push( 'clearance' );
    }
    if ( document.getElementById("chkbxArrival").checked ) {
        selectedCheckInTypes.push( 'arrival' );
    }
    if ( document.getElementById("chkbxDeparture").checked ) {
        selectedCheckInTypes.push( 'departure' );
    }
    if ( document.getElementById("chkbxFlightFollowing").checked ) {
        selectedCheckInTypes.push( 'flightFollowing' );
    }
    if ( document.getElementById("chkbxReposition").checked ) {
        selectedCheckInTypes.push( 'reposition' );
    }
    
    let checkInType = selectedCheckInTypes[ Math.floor( Math.random() * selectedCheckInTypes.length ) ];

    if ( checkInType === checkInTypes[0] ) {
        // Arrival
        let currentAircraft = aircraft[ Math.floor( Math.random() * aircraft.length ) ];
        let availableTaxiways = airportInfo.taxiways.runwayInUse;
        let currentTaxiway = taxiwayList[ Math.floor( Math.random() * taxiwayList.length ) ];
        checkInList.push( new Arrival( currentAircraft, currentTaxiway ) );
    } else if ( checkInType === checkInTypes[1] ) {
        // Departure
        let currentAircraft = aircraft[ Math.floor( Math.random() * aircraft.length ) ];
        checkInList.push( new Departure( currentAircraft, getATIS() ) );
    } else if ( checkInType === checkInTypes[2] ) {
        // Flight Following
        // FTW GC, ACFT, FF to LOC at ALT
        let ffAircraft = aircraft.filter( acft => !acft.ifr );
        let currentAircraft = ffAircraft[ Math.floor( Math.random() * ffAircraft.length ) ];
        let currentDestination = airports[ Math.floor( Math.random() * airports.length ) ];
        let currentAltitude = "" + ( Math.floor( Math.random() * 13 ) + 3 ) + "5";
        currentAltitude = currentAltitude.padStart(3,"0");
        checkInList.push( new FlightFollowing( currentAircraft, currentDestination, currentAltitude ) );
        
        if ( document.getElementById("checkKeyboardEntries").checked ) {   
            setFocusToSTARSEntry();
        } else {
            showSTARSEntryButton();
        }

        // after successful input: set focus to previous

        // bonus if next call is FF acft to taxi
    } else if ( checkInType === checkInTypes[3] ) {
        // Reposition
        let repositionAircraft = aircraft.filter( acft => acft.repositionName != null );
        checkInList.push( new Reposition( repositionAircraft[ Math.floor( Math.random() * repositionAircraft.length ) ] ) );
    } else if ( checkInType === checkInTypes[4] ) {
        // Clearance
        let ifrCapableAircraft = aircraft.filter( acft => acft.ifr );
        let currentAircraft = ifrCapableAircraft[ Math.floor( Math.random() * ifrCapableAircraft.length ) ];
        let currentFlightPlan = ifrFlightPlans[ Math.floor( Math.random() * ifrFlightPlans.length ) ];
        checkInList.push( new Clearance( currentAircraft, currentFlightPlan ) );
        fillIFRFlightProgressStrip( checkInList.at(-1) );
    } else if ( checkInType === checkInTypes[5] ) {
        // Callsign
        let localAircraft = aircraft.filter( acft => acft.flightSchool != null );
        let currentAircraft = localAircraft[ Math.floor( Math.random() * localAircraft.length ) ];
        checkInList.push( new Callsign( currentAircraft ) );
    }
    
    speakText( checkInList.at(-1).initialCall() );

    updateDisplay();
}

function repeatInitial() {
    speakText( checkInList.at(-1).initialCall() );
}

function sayAgain() {
    speakText( checkInList.at(-1).requestAgain() );
}

function sayCallsign() {
    speakText( checkInList.at(-1).requestCallsign() );
}

function sayIntent() {
    speakText( checkInList.at(-1).requestIntent() );
}

function sayLocation() {
    speakText( checkInList.at(-1).requestLocation() );
}

function sayParking() {
    speakText( checkInList.at(-1).requestParking() );
}

function speakText( text ) {
    consoleDebug( text );
    if ( document.getElementById("voice").checked ) {
        let tts = new SpeechSynthesisUtterance(text);
        const synth = window.speechSynthesis;
        tts.voice = synth.getVoices()[0];
        tts.rate = document.getElementById("speechRate").value;
        tts.pitch = 1;
        synth.speak(tts);
    }
}

function changeCheckInFocus( whichType ) {
    if ( whichType === 'cd' ) {
        let state = ( document.getElementById('chkbxClearanceDelivery').checked ? true : false );
        document.getElementById('chkbxClearance').checked = state;
        document.getElementById('chkbxFlightFollowing').checked = state;   
    } else if ( whichType === 'gc' ) {
        let state = ( document.getElementById('chkbxGroundControl').checked ? true : false );
        document.getElementById('chkbxArrival').checked = state;
        document.getElementById('chkbxDeparture').checked = state;
        document.getElementById('chkbxReposition').checked = state;
    }
}

function consoleDebug( text ) {
    if( document.getElementById("consoleOutput").checked ) {
        console.log( text );
    }
}

function setFocusToSTARSEntry() {
    lastFocusElement = document.activeElement.id;
    document.getElementById("starsEntry").style.display = "block";
    document.getElementById("starsEntry").focus();
}

function starsKeyboard( key ) {
    consoleDebug( key );
}

function showSTARSEntryButton() {
    document.getElementById("btnStarsEntry").style.display = "block";
}

function fillFlightProgressStrip( box1, box3, box4, box5, box6, box7, box8, box9, box10, box11, box12, box13, box14, box15, box16, box17, box18 ) {
    document.getElementById("fps1").innerHTML = box1;
    document.getElementById("fps3").innerHTML = box3;
    document.getElementById("fps4").innerHTML = box4;
    document.getElementById("fps5").innerHTML = box5;
    document.getElementById("fps6").innerHTML = box6;
    document.getElementById("fps7").innerHTML = box7;
    document.getElementById("fps8").innerHTML = box8;
    document.getElementById("fps9").innerHTML = box9;
    document.getElementById("fps10").innerHTML = box10;
    document.getElementById("fps11").innerHTML = box11;
    document.getElementById("fps12").innerHTML = box12;
    document.getElementById("fps13").innerHTML = box13;
    document.getElementById("fps14").innerHTML = box14;
    document.getElementById("fps15").innerHTML = box15;
    document.getElementById("fps16").innerHTML = box16;
    document.getElementById("fps17").innerHTML = box17;
    document.getElementById("fps18").innerHTML = box18;
}

function completeStripMarking( box ) {
    if ( box === 'b16' ) {
        document.getElementById("fps16").innerHTML = "✓";
    }
}

function fillFlightFollowingStrip( ffObj ) {
    fillFlightProgressStrip( ffObj.getAcftIdForOutput(), ffObj.aircraft.type, "", ffObj.getSquawk(), "", "VFR/" + ffObj.altitude, "FTW " + ffObj.destination.airportFAA, "FTW " + ffObj.destination.airportFAA, "", "", "", "", "", "", "", "", "" );
}

function fillIFRFlightProgressStrip( ifrObj ) {
    fillFlightProgressStrip( ifrObj.getAcftIdForOutput(), ifrObj.aircraft.type, ifrObj.cid, ifrObj.getSquawk(), ifrObj.depTime, ifrObj.altitude, "KFTW " + ifrObj.route.destination, ifrObj.route.route, "", "", "", "", "", "", "", "", "" );
}

function clearFlightProgressStrip() {
    document.getElementById("fps1").innerHTML = "";
    document.getElementById("fps3").innerHTML = "";
    document.getElementById("fps4").innerHTML = "";
    document.getElementById("fps5").innerHTML = "";
    document.getElementById("fps6").innerHTML = "";
    document.getElementById("fps7").innerHTML = "";
    document.getElementById("fps8").innerHTML = "";
    document.getElementById("fps9").innerHTML = "";
    document.getElementById("fps10").innerHTML = "";
    document.getElementById("fps11").innerHTML = "";
    document.getElementById("fps12").innerHTML = "";
    document.getElementById("fps13").innerHTML = "";
    document.getElementById("fps14").innerHTML = "";
    document.getElementById("fps15").innerHTML = "";
    document.getElementById("fps16").innerHTML = "";
    document.getElementById("fps17").innerHTML = "";
    document.getElementById("fps18").innerHTML = "";
}

function noStarsEntryFlightFollowing() {
    document.getElementById("btnStarsEntry").style.display = "none";
    document.getElementById("txtStarsEntry").style.display = "block";
    let starsEntryToShow = checkInList.at(-1).flightFollowingInput().toUpperCase().replace(/ /g, "<br>");
    document.getElementById("txtStarsEntry").innerHTML = starsEntryToShow;
    fillFlightFollowingStrip( checkInList.at(-1) );
}

function checkFlightFollowing() {
    let receivedInput = document.getElementById("starsEntry").value.toUpperCase();
    let expectedInput = checkInList.at(-1).flightFollowingInput().toUpperCase();
    if ( receivedInput.includes( expectedInput ) || receivedInput.includes( expectedInput.replace( /\s+\d{3}/, '' ) ) ) {
        document.getElementById("starsError").style.display = "none";
        document.getElementById("starsEntry").value = "";
        document.getElementById("starsEntry").style.display = "none";
        // document.getElementById(lastFocusElement).focus();
        fillFlightFollowingStrip( checkInList.at(-1) );
    } else {
        document.getElementById("starsError").style.display = "block";
    }
}

function getATIS() {
    let currentInformation = document.getElementById( "currentATIS" ).innerHTML;
    let chosenOption = atisOptions[ 0 ];
    if ( document.getElementById("listenForATIS").checked ) {
        // two randoms to skew towards more having the correct ATIS
        let rand1 = Math.random();
        let rand2 = Math.random();
        chosenOption = atisOptions[ Math.floor( rand1 /** * rand2 */ * atisOptions.length ) ];
    }
    if ( chosenOption == atisOptions[0] ) {
        return currentInformation;
    } else if ( chosenOption == atisOptions[2] ) {
        if ( informationList.indexOf( currentInformation ) == 0 ) {
            return informationList.at(-1);
        } else {
            return informationList[ ( informationList.indexOf( currentInformation ) - 1 ) % informationList.length ];
        }
    } else {
        return chosenOption;
    }
}

function condenseWhiteSpace( text ) {
    return text.replace(/\s+/g, ' ');
}

function atisToText(atis) {
    if ( atis === atisOptions[3] ) {
        return "";
    } else if ( atis === atisOptions[1] ) {
        return "with the numbers";
    } else {
        return "with information " + alphanumerics(atis);
    }
}

function listToText( direction ) {
    if ( checkInList != undefined ) {
        var toReturn = "";
        if ( direction === "none" ) {
            toReturn = "*** output hidden ***";
        } else if ( checkInList.length == 0 ) {
            toReturn = "--"
        } else if ( direction === "forward" ) {
            toReturn = checkInList.toString().replaceAll(",", "\n");
        } else if ( direction === "reverse" ) {
            toReturn = checkInList.toReversed().toString().replaceAll(",", "\n");
        } else if ( direction === "current" ) {
            toReturn = checkInList.at(-1).toString();
        } else if ( direction === "previous" ) {
            toReturn = checkInList.at(-2).toString();
        }
        return toReturn;
    } else {
        toReturn = "--";
    }
}

function setTheme( theme ) {
    document.getElementById("body").className = theme;
}

function updateDisplay() {
    document.getElementById("aircraftDisplay").innerHTML = listToText( document.getElementById("displayData").value );
}

function updateTime() {
    const now = new Date();
    const hours = String(now.getUTCHours()).padStart(2, '0');
    const minutes = String(now.getUTCMinutes()).padStart(2, '0');
    const seconds = String(now.getUTCSeconds()).padStart(2, '0');
    const formattedTime = `${hours}:${minutes}:${seconds}`;

    document.getElementById('currentTime').innerHTML = formattedTime;
}

window.onload = main;