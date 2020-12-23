import { storageService } from "../../../services/storageService.js";

export const emailService = {
    query
}

const KEY = 'emailsDB';
var gEmails;
_createEmails();

function _createEmails() {
    gEmails = storageService.load(KEY);
    if (!gEmails || !gEmails.length) {
        gEmails = _getDemoEmails()
        _saveEmailsToStorage();
    }
}
function query() {
    return Promise.resolve(gEmails);
}

function _saveEmailsToStorage() {
    storageService.save(KEY, gEmails);
}

function _getDemoEmails() {

    const demoEmails = [
        {
            id: 1,
            subject: `Win a Dream Mix in Our Year-End Party`,
            body: ` Win a Dream Mix
            Enter to win a free mix of your song by mixing engineer Manny Marroquin,
             or a free one-on-one consultation session with producer/engineer Jack Joseph Puig or producer/remixer Dave Audé. `,
            isRead: true,
            sentAt: 1551163530583
        },
        {
            id: 2,
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