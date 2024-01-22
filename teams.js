//Teams Bot by Fakelatency


const puppeteer = require('puppeteer');

class info{
    constructor(link,login,haslo,dzień,godzina,minuta){
        this.link = link;
        this.login = login;
        this.haslo = haslo;
        this.dzień = dzień; 
        this.godzina = godzina; 
        this.minuta = minuta;
   }
}


(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        args: ['--use-fake-ui-for-media-stream',],
          ignoreDefaultArgs: ['--mute-audio'],
    });



    //Sneak into sign in page
    const page = await browser.newPage();
    const navigationPromise = page.waitForNavigation();
    await page.goto("https://teams.microsoft.com/_?lm=deeplink&lmsrc=homePageWeb&cmpid=WebSignIn#/school//?ctx=teamsGrid");                 

    // If u r not logged in automaticly change scope 30 with that link "https://login.microsoftonline.com/common/oauth2/authorize?response_type=id_token&client_id=5e3ce6c0-2b1f-4285-8d4b-75ee78787346&redirect_uri=https%3A%2F%2Fteams.microsoft.com%2Fgo&state=4977cad9-9730-4aa5-b262-a28415a2953c&&client-request-id=c735501a-51a1-4bfb-8b8c-2b9917af74b5&x-client-SKU=Js&x-client-Ver=1.0.9&nonce=6dbbe3d4-e3d9-4763-9b93-deba2db3ed2b&domain_hint="

    const context = browser.defaultBrowserContext();
    await context.overridePermissions(
        "https://teams.microsoft.com", ['microphone', 'camera', 'notifications']   // Teams after u r logged in 
    );

    await navigationPromise;   


    //Logging in + checkboxes
    await page.waitForSelector('input[type="email"]');
    await page.click('input[type="email"]');
    await navigationPromise;

    await page.waitForTimeout(500);
    await page.keyboard.type('', {delay: 50});      // If u r not logged in automaticly add your email here
    await page.waitForSelector('input[type="submit"]');
    await page.click('input[type="submit"]');
    await navigationPromise;

    await page.waitForSelector('input[type="password"]');
    await page.click('input[type="password"]');
    await navigationPromise;

    await page.waitForTimeout(3500);
    await page.keyboard.type('', {delay: 100});      // If u r not logged in write your passwd there
    await page.waitForTimeout(1000);
    await page.waitForSelector('input[type="submit"]');
    await page.click('input[type="submit"]');  
    await navigationPromise;

    await page.waitForSelector('input[type="checkbox"]');   
    await navigationPromise;
    await page.click('input[type="checkbox"]');
    await navigationPromise;
    await page.waitForSelector('input[type="submit"]');
    await navigationPromise;
    await page.click('input[type="submit"]');
    await navigationPromise

    //Going into callender
    await page.goto('https://teams.microsoft.com/_?lm=deeplink&lmsrc=homePageWeb&cmpid=WebSignIn#/calendarv2');
    await navigationPromise;


    do{
        
        var date = new Date();
        var day = date.getUTCDay();
        var hour = date.getHours();
        var minutes = date.getMinutes();
        console.log(date)
        
        if (day == 4 && hour == 8 && minutes >= 20){            //in order to join add date of ur meeting hour and minute   (4,8,20)

             
            await page.goto(''); // paste link to meeting here
            await navigationPromise;
            await console.log("CZEKAMY 25");
            await page.waitForTimeout(25000);
            await console.log("Dołączamy :D");
            
            

           await page.evaluate(() => {
                function eventFire(el, etype){
                    if (el.fireEvent) {
                      el.fireEvent('on' + etype);
                    } else {
                      var evObj = document.createEvent('Events');
                      evObj.initEvent(etype, true, false);
                      el.dispatchEvent(evObj);
                    }
                }

                //Mikrofon
                if(document.querySelector("#preJoinAudioButton > div > button").ariaPressed)
                {
                    eventFire(document.querySelector("#preJoinAudioButton > div > button"), 'click');
                }

                //Kamera
                if(document.querySelector("#page-content-wrapper > div.flex-fill > div > calling-pre-join-screen > div > div > div.ts-calling-pre-join-content > div.central-section > div.video-and-name-input > div > div > section > div.buttons-container > toggle-button:nth-child(1) > div > button").ariaPressed)
                {
                    eventFire(document.querySelector("#page-content-wrapper > div.flex-fill > div > calling-pre-join-screen > div > div > div.ts-calling-pre-join-content > div.central-section > div.video-and-name-input > div > div > section > div.buttons-container > toggle-button:nth-child(1) > div > button"), 'click');
                }

                //Dołączanie
                if(document.querySelector("#page-content-wrapper > div.flex-fill > div > calling-pre-join-screen > div > div > div.ts-calling-pre-join-content > div.central-section > div.video-and-name-input > div > div > section > div.flex-fill.input-section > div > div > button") != undefined)
                {
                    eventFire(document.querySelector("#page-content-wrapper > div.flex-fill > div > calling-pre-join-screen > div > div > div.ts-calling-pre-join-content > div.central-section > div.video-and-name-input > div > div > section > div.flex-fill.input-section > div > div > button"), 'click');
                    console.log("Dołączyliśmy ;D")
                }
            });


            // if ()

                // wychodzimy 
            do{
                var date1 = new Date();
                var day1 = date1.getUTCDay();
                var hour1 = date1.getHours();
                var minutes1 = date1.getMinutes();
                console.log(date1);

                if(day1 == 4 && hour1 == 9 && minutes1 == 0)
                {
                    console.log("wychodzimy!");
                    await page.waitForSelector('button[id="hangup-button"]');
                    await navigationPromise; 
                    await page.click('button[id="hangup-button"]'); 
                    await navigationPromise; 
                    console.log("wyszlismy ; D");
                    await page.goto('https://teams.microsoft.com/_?lm=deeplink&lmsrc=homePageWeb&cmpid=WebSignIn#/calendarv2');
                    await navigationPromise;
                }
                await page.waitForTimeout(10000);
            }while (hour>2);
        }
        await page.waitForTimeout(30000);
    }while(hour <0 );
   


    do{
        var date = new Date();
        var day = date.getUTCDay();
        var hour = date.getHours();
        var minutes = date.getMinutes();
        console.log(hour,minutes,day);

        if (day == 1 && hour >0 && minutes >=0){                            //in order to join add date of ur meeting hour and minute   (4,8,20)

             
            await page.goto(''); // paste link to meeting here
            await navigationPromise;
            await console.log("CZEKAMY 20");
            await page.waitForTimeout(20000);
            await console.log("All loaded!!!");
            
            

           await page.evaluate(() => {
                function eventFire(el, etype){
                    if (el.fireEvent) {
                      el.fireEvent('on' + etype);
                    } else {
                      var evObj = document.createEvent('Events');
                      evObj.initEvent(etype, true, false);
                      el.dispatchEvent(evObj);
                    }
                }

                //Mikrofon
                if(document.querySelector("#preJoinAudioButton > div > button").ariaPressed)
                {
                    eventFire(document.querySelector("#preJoinAudioButton > div > button"), 'click');
                }

                //Kamera
                if(document.querySelector("#page-content-wrapper > div.flex-fill > div > calling-pre-join-screen > div > div > div.ts-calling-pre-join-content > div.central-section > div.video-and-name-input > div > div > section > div.buttons-container > toggle-button:nth-child(1) > div > button").ariaPressed)
                {
                    eventFire(document.querySelector("#page-content-wrapper > div.flex-fill > div > calling-pre-join-screen > div > div > div.ts-calling-pre-join-content > div.central-section > div.video-and-name-input > div > div > section > div.buttons-container > toggle-button:nth-child(1) > div > button"), 'click');
                }

                //Dołączanie
                if(document.querySelector("#page-content-wrapper > div.flex-fill > div > calling-pre-join-screen > div > div > div.ts-calling-pre-join-content > div.central-section > div.video-and-name-input > div > div > section > div.flex-fill.input-section > div > div > button") != undefined)
                {
                    eventFire(document.querySelector("#page-content-wrapper > div.flex-fill > div > calling-pre-join-screen > div > div > div.ts-calling-pre-join-content > div.central-section > div.video-and-name-input > div > div > section > div.flex-fill.input-section > div > div > button"), 'click');
                    console.log("Dołączamy ;D")
                }
            });
            await page.waitForTimeout(20000);


            //Emulowanie mikorfonu 


            // await page.waitForSelector('button[id="microphone-button"]');
            // await navigationPromise; 
            // await page.click('button[id="microphone-button"]');
            await page.evaluate(() => {
                function eventFire1(el, etype){
                    if (el.fireEvent) {
                      el.fireEvent('on' + etype);
                    } else {
                      var evObj = document.createEvent('Events');
                      evObj.initEvent(etype, true, false);
                      el.dispatchEvent(evObj);
                    }
                }

            if(document.querySelector("#microphone-button").aria-label == "Wyłącz wyciszenie")
                {
                    eventFire1(document.querySelector("#microphone-button"), 'click');
                }
                console.log("Odciszamy!");
            });

            // 1 próba, nie wiem jak, ale moze kiedy sie przyda!

            // await page.evaluate(() => {
            //     var audio = document.createElement("audio");
            //     audio.setAttribute("src", "C:\Users\huber\Desktop\example");
            //     audio.setAttribute("crossorigin", "anonymous");
            //     audio.setAttribute("controls", "");
            //     audio.onplay = function() {
            //       var stream = audio.captureStream();
            //       navigator.mediaDevices.getUserMedia = async function() {
            //          return stream;
            //       };
            //     };
            //     document.querySelector("body").appendChild(audio);
            //   });
            //   await page.evaluate(navigator.mediaDevices.getUserMedia);
            //   console.log("Mowimy!");

            await page.waitForTimeout(10000);

            await page.evaluate(() => {
                function eventFire2(el, etype){
                    if (el.fireEvent) {
                      el.fireEvent('on' + etype);
                    } else {
                      var evObj = document.createEvent('Events');
                      evObj.initEvent(etype, true, false);
                      el.dispatchEvent(evObj);
                    }
                }

            if(document.querySelector("#microphone-button").aria-label == "Wycisz")
                {
                    eventFire2(document.querySelector("#microphone-button"), 'click');
                }
                console.log("wyciszamy!");
            });

                // wychodzimy 
            do{
                var date1 = new Date();
                var day1 = date1.getUTCDay();
                var hour1 = date1.getHours();
                var minutes1 = date1.getMinutes();
                console.log(date1);

                if(day1 == 3 && hour1 == 8 && minutes1 == 10)
                {
                    console.log("wychodzimy!");
                    await page.waitForSelector('button[id="hangup-button"]');
                    await navigationPromise; 
                    await page.click('button[id="hangup-button"]'); 
                    await navigationPromise; 
                    console.log("wyszlismy ; D");
                    await page.goto('https://teams.microsoft.com/_?lm=deeplink&lmsrc=homePageWeb&cmpid=WebSignIn#/calendarv2');
                    await navigationPromise;
                }
                await page.waitForTimeout(10000);
            }while (hour>2);
        }
        await page.waitForTimeout(30000);
    }while(hour >= 0 );
})();

