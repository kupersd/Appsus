import { storageService } from "../../../services/storageService.js";
import { utilService } from "../../../services/utilService.js";

export const emailService = {
    myMail,
    query,
    send,
    remove,
    toggleIsRead,
    getById,
    getNextPrev,
    getMailBoxes,
    toWhichFolders,
    unreadCount
}

const KEY = 'emailsDB';
const MY_MAIL = 'ori@misterbyte.co.il'

var gEmails;
_createEmails();

window.mails = gEmails;

function query() {
    return Promise.resolve(gEmails);
}

function getById(emailId) {
    const email = gEmails.find(email => email.id == emailId);       // TODO fix string/int
    return Promise.resolve(email);
}
function getNextPrev(emailId) {
    const currIdx = gEmails.findIndex(email => email.id === emailId);
    const nextIdx = (currIdx === gEmails.length - 1) ? 0 : currIdx + 1;
    const prevIdx = (currIdx === 0) ? gEmails.length - 1 : currIdx - 1;
    const nextEmailId = gEmails[nextIdx].id;
    const prevEmailId = gEmails[prevIdx].id;
    return Promise.resolve({ nextEmailId, prevEmailId });
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

function toggleIsRead(emailId) {
    const emailCopy = gEmails.find(email => email.id == emailId);
    const emailsCopy = [...gEmails];
    const emailCopyIdx = emailsCopy.findIndex(email => emailCopy.id === email.id);
    emailsCopy[emailCopyIdx].isRead = !emailsCopy[emailCopyIdx].isRead;
    gEmails = emailsCopy;
    _saveEmailsToStorage();
    return Promise.resolve();
}

function unreadCount() {
    let count = 0;
    gEmails.forEach(email => {
        if (!email.isRead) count ++
    })
    return Promise.resolve(count);
}

function myMail() {
    return Promise.resolve(MY_MAIL);
}

function toWhichFolders(email) {
    let mailBox ;
    if (email.to === MY_MAIL) mailBox = 'inbox';
    // if (email.to === MY_MAIL && !email.isRead) mailBox = 'unread';
    if (email.from === MY_MAIL && email.to.length > 3) mailBox = 'sent';
    if (email.from === MY_MAIL && email.to.length <= 3) mailBox = 'drafts';

    return mailBox;
}

function getMailBoxes() {
    return Promise.resolve(['ALL', 'Inbox', 'Unread', 'Sent', 'Drafts']);
}

function _saveEmailsToStorage() {
    storageService.save(KEY, gEmails);
}

function _createEmails() {
    gEmails = storageService.load(KEY);
    if (!gEmails || !gEmails.length) {
        gEmails = _getDemoEmails()
        _saveEmailsToStorage();
    }
}

function _getDemoEmails() {

    const demoEmails = [
        {
            id: 'CDCx5',
            from: MY_MAIL,
            to: 'Dudiyahoo@nsm.com',
            cc: 'alon@misterbit.co.il',
            subject: `Win a Dream Mix in Our Year-End Party`,
            body: ` Win a Dream Mix
            Enter to win a free mix of your song by mixing engineer Manny Marroquin,
             or a free one-on-one consultation session with producer/engineer Jack Joseph Puig or producer/remixer Dave Audé. `,
            isRead: true,
            sentAt: 1551163530583
        },
        {
            id: 'vKcz3',
            from: MY_MAIL,
            to: 'Dudiyahoo@nsm.com',
            cc: 'yaron@codingacademy.com',
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
            isRead: true,
            sentAt: 1551133930583
        },
        {
            id: '1cXz',
            from: 'search@lycos.com',
            to: MY_MAIL,
            cc: '',
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
            id: '9cZx1',
            from: 'alta@vista.com',
            to: MY_MAIL,
            cc: '',
            subject: `Revealing the new Duolingo`,
            body: `Vibrant new style
    
            Duolingo has a bright new art style that pops off the screen and makes learning even more exciting.
            
            A more expressive Duo
            Whether he’s crying or cheering your progress, our mascot Duo has more personality than ever before.
             
            Fun animations
            Treasure chests pop open, your streak flame explodes, and Duo waves to you. How’s that for motivation?`,
            isRead: false,
            sentAt: 1551243930583
        },
        {
            id: 'VvsaA',
            from: 'do-not-reply@info.maccabi4u.co.il',
            fromName: 'הפועל שירותי בריאות',
            to: MY_MAIL,
            cc: '',
            subject: `היי אורי, בוא נדבר על החיסון`,
            body: `
            שלום אורי,
            אחרי שנה מלאת אתגרים, מגיעים בימים אלה חיסוני הקורונה לישראל. ריכזנו עבורך את כל מה שצריך לדעת על חיסוני הקורונה:                 
            איור של יד עליה מונח בקבוק 	
             
            יש תופעות לוואי לחיסון? האם החיסון משנה את המטען הגנטי?
            כל התשובות בנושא חיסוני הקורונה 	`,
            isRead: false,
            sentAt: 1551243930583
        },
        {
            id: 'vp3Ca',
            from: '<info@greeninvoice.co.il',
            fromName: 'חשבונית בצבע ירוק',
            to: MY_MAIL,
            cc: '',
            subject: `שמים מסמכים בעננים`,
            body: `green_market...

            והפעם בפינתנו "לגבות את כל המסמכים מיד - שאלו אותנו כיצד", נדבר על גוגל דרייב.
            קודם כל, הוא התוסף הפופולארי ביותר בחנות שלנו כי הוא יעשה לכם הרבה סדר בעסק ובעבודה השוטפת. וגם כי הוא בחינם למנויי Popular ומעלה, אז למה לא.

            החיבור יוצר תיקייה שבה יגובו בצורה קבועה ואוטומטית כל המסמכים שתגדירו,
            מחשבוניות, הצעות מחיר ועד דוחות תקופתיים.
            הם יחכו לכם בתיקייה כשתרצו לגשת אליהם או לשלוח אותם.`,
            isRead: false,
            sentAt: 1551243930583
        },
        {
            id: 'pAckl',
            from: MY_MAIL,
            fromName: '',
            to: '',
            cc: '',
            subject: `a Few thoughts...`,
            body: `before moving to my new apartment I think we should consider starting a new service. my thoughts are almost lorem ipsumiyot at this point,
            writing a draft email body. This sprint is nice, I hope it will go well...`,
            isRead: true,
            sentAt: 0
        },
        {
            id: '9cXZc',
            from: 'google-noreply@google.com',
            fromName: 'The Google team',
            to: MY_MAIL,
            cc: '',
            subject: `Ori, finish setting up your Apple iPad`,
            body: `Hi Ori,
            Welcome to Google on your new Apple iPad
            Take the final steps to set up your Apple iPad and try these official Google apps.
            Google Photos
            Store, organize and share all your photos and videos
            Average rating 5 stars
             
            Chrome
            Browse fast and securely on all your devices
            Average rating 3.5 stars
             
            Google Drive
            Create, share and keep all your stuff in one place `,
            isRead: false,
            sentAt: 1551263930583
        },
        {
            id: 'P4XZc',
            from: 'DoNot.Reply@marketing-sw.com',
            fromName: 'תמי4‎',
            to: MY_MAIL,
            cc: '',
            subject: `היי אורי, תתחדשו המשלוח מתמי4 בדרך אליכם`,
            body: ` היי אורי,
            תודה על הקנייה!
            
            אוטוטו כל המשפחה תמשיך ליהנות
            ממים מוגזים, מרעננים וטעימים בלחיצת כפתור.
            
            פרטי הזמנת מכלי הגזה CO2 שלך:
            
            סיכום הזמנה
            
            כתובת למשלוח:                        
            תאריך למשלוח:            
              עד ל 22.12.2020
            
            מוצרים בהזמנה:
            1*מיכל הגזה CO2 חד פעמי ארוז- זוג
            1*דמי משלוח CO2
            
            מספר עסקה:
            8-0000551205
            
            פרטי החיוב:
            סה"כ מחיר כולל מע"מ ומשלוח - 70 ש"ח`,
            isRead: false,
            sentAt: 1551247930583
        },
        {
            id: 'PMoZc',
            from: 'robot2@openweathermap.org',
            fromName: 'OWM Team',
            to: MY_MAIL,
            cc: '',
            subject: `OpenWeatherMap API Instruction`,
            body: `Dear Customer!


            Thank you for subscribing to Free OpenWeatherMap!
            
            API key:
            - Your API key is 385e6d
            - Within the next couple of hours, it will be activated and ready to use
            - You can later create more API keys on your account page
            - Please, always use your API key in each API call
            
            Endpoint:
            - Please, use the endpoint api.openweathermap.org for your API calls
            - Example of API call:
            api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=385e6db04cc
            
            Useful links:
            - API documentation https://openweathermap.org/api
            - Details of your plan https://openweathermap.org/price
            - Please, note that 16-days daily forecast and History API are not available for Free subscribers`,
            isRead: false,
            sentAt: 1551847930583
        },
        {
            id: '1xoZc',
            from: 'no-reply@dropbox.com',
            fromName: 'Dropbox',
            to: MY_MAIL,
            cc: '',
            subject: `We noticed a new sign in to your Dropbox`,
            body: `Hi Ori,

            A new iPad just signed in to your Dropbox account. To help keep your account secure, let us know if this is you.
            
                    
                Is this you?
                
            When: 	Dec 21, 2020 at 2:53 pm (IST)
            What: 	Dropbox for iPad`,
            isRead: false,
            sentAt: 1551467930583
        },


    ];
    return demoEmails;

}