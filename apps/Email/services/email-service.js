import { storageService } from "../../../services/storageService.js";
import { utilService } from "../../../services/utilService.js";

export const emailService = {
    myMail,
    query,
    send,
    remove,
    getById
}

const KEY = 'emailsDB';
const MY_MAIL = 'ori@misterbyte.co.il'

var gEmails;
_createEmails();

window.mails = gEmails;

function myMail() {
    return Promise.resolve(MY_MAIL);
}
function query() {
    return Promise.resolve(gEmails);
}

function getById(emailId) {
    const email = gEmails.find(email => email.id == emailId);       // TODO fix string/int
    return Promise.resolve(email);
}
function send(email) {
    email = {
        id: utilService.makeId(),
        ...email
    };
    gEmails = [email, ...gEmails];
    _saveEmailsToStorage();
    return Promise.resolve(email);
}

function remove(emailId) {
    gEmails = gEmails.filter(email => email.id !== emailId);
    _saveEmailsToStorage();
    return Promise.resolve();
}

function _saveEmailsToStorage() {
    storageService.save(KEY, gEmails);
}

function _getDemoEmails() {

    const demoEmails = [
        {
            id: 1,
            from: 'oriyahoo@coldmail.com',
            to: 'Dudiyahoo@nsm.com',
            subject: `Win a Dream Mix in Our Year-End Party`,
            body: ` Win a Dream Mix
            Enter to win a free mix of your song by mixing engineer Manny Marroquin,
             or a free one-on-one consultation session with producer/engineer Jack Joseph Puig or producer/remixer Dave Audé. `,
            isRead: true,
            sentAt: 1551163530583
        },
        {
            id: 2,
            from: 'mark@facebooklet.com',
            to: 'Dudiyahoo@nsm.com',
            subject: `Here's my final schedule for your visit`,
            body: `doron,
    
            here is the list of intl talent that i am talking to; please let me know what you need/costings/ etc.
            best,
            
            jh
            
            Oct 30 Arrival/Dinner/Hang/Studio Tour/Writing Begins (Half Day In Studio)
            Oct 31 Writing Continues  (Full Day In Studio)
            Nov 1 Writing Continues/VIP Reception Evening (Full Day In Studio)
            Nov 2 TUNE IN TEL AVIV Conference (*Day Off*)
            Nov 3 Dead Sea Safari / Jerusalem Tour (Trip Organized By TUNE IN TEL AVIV) (Half Day In Studio) 
            Nov 4 Depart- `,
            isRead: false,
            sentAt: 1551133930583
        },
        {
            id: 3,
            from: 'search@lycos.com',
            to: 'results@excite.com',
            subject: `Cyber Monday Flash Sales | New SoundToys, Image Line & FXpansion Promotions`,
            body: `Plus iZotope Neutron Elements is FREE with every purchase
    
            View in Browser
            Plugin Boutique Deals
            Neutron Elements Free
            Soundtoys Sale 80% Off Plugin Boutique
            Popular Soundtoys
            Image Line Black Friday Sale (Exclusive) - Up To 31% Off
            Popular Image Line
                      
            SoundSpot Ravage Introductory Sale - 65% Off
            Popular Distortion
            Fxpansion Cypher 2 flash sale Plugin Boutique
            Popular Synths
                      
            Bass Master Bundle Sale Plugin Boutique
            Popular Loopmasters `,
            isRead: false,
            sentAt: 1551143930583
        },
        {
            id: 4,
            from: 'alta@vista.com',
            to: 'we_are_done@aol.com',
            subject: `Revealing the new Duolingo`,
            body: `Vibrant new style
    
            Duolingo has a bright new art style that pops off the screen and makes learning even more exciting.
            
            A more expressive Duo
            Whether he’s crying or cheering your progress, our mascot Duo has more personality than ever before.
             
            Fun animations
            Treasure chests pop open, your streak flame explodes, and Duo waves to you. How’s that for motivation?`,
            isRead: false,
            sentAt: 1551243930583
        }

    ];
    return demoEmails;

}

function _createEmails() {
    gEmails = storageService.load(KEY);
    if (!gEmails || !gEmails.length) {
        gEmails = _getDemoEmails()
        _saveEmailsToStorage();
    }
}