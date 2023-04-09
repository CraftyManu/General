window.onload = init();

function init() {
    console.log('page loaded, the DOM is ready');
    getDOMElementes();
    // disableInputFields();
    measuringSystemMenu.addEventListener('change', getMeasuringSystemChoice);
    resetButton.addEventListener('click', resetAll);
    // darkLightModeButton = document.querySelector('#darkLightModeButton');
    // darkLightModeButton.addEventListener('click', darkLightMode);
    darkLightModeSwitch = document.querySelector('.switch');
    darkLightModeSwitch.addEventListener('change', darkLightMode);
//scroll to top button:
topButton = document.querySelector('#topButton');
topButton.addEventListener('click', topFunction);

// light/dark mode switch:}
} //end of init function 

function resetAll() {
    console.log('topNav: ' + topNav);
    console.log('resetAll function EXECUTED');
    measuringSystemMenu.disabled = false;
    submitButton.disabled = true;
   
console.log('topNav.childElementCount: ' + topNav.childElementCount);
const topNava = document.querySelectorAll(".topNava");
console.log('topNava.length: ' + topNava.length);
     for (let i = 0; i < topNava.length; i++) {
        console.log('i: ' + i);
         topNava[i].remove();
     }
    console.log('topNav: ' + topNav);
} // end of resetAll function

  function getMeasuringSystemChoice(){
    console.log('getMeasuringSystemChoice function EXECUTED')
  measuringSystem = document.querySelector('#measuring-system-selection').value;
  if (measuringSystem == "cm")   {
      enableSwatchSize();
      console.log('cm or inches?: ' + measuringSystem);
  } else if (measuringSystem == "inches") {
      enableSwatchSize();
      console.log('cm or inches?: ' + measuringSystem);
  } else {
      alert('Please choose between the metric or the imperial system');
      console.log('cm or inches?: ' + measuringSystem);
  }} //end of getMeasuringSystemChoice function

  function getDOMElementes() {
      console.log('getDOMElements function EXECUTED');
    submitButton = document.querySelector('#submitButton');
    submitButton.disabled = true;
    resetButton = document.querySelector('#resetButton');
    resetButton.disabled = true;
    gaugeInfoFields = document.querySelectorAll('.gaugeInfoInput');
    footInfoFields = document.querySelectorAll('.footInfoInput');
    measuringSystemMenu = document.querySelector('#measuring-system-selection')
    footLengthField =  document.querySelector('#footLength');
    footWidthField = document.querySelector('#footWidth');
    gaugeSizeLabel = document.querySelector('#gaugeSizeLabel');
    gaugeStsLabel = document.querySelector('#gaugeStsLabel');
    gaugeRowsLabel = document.querySelector('#gaugeRowsLabel');
    footLengthLabel = document.querySelector('#footLengthLabel');
    footWidthLabel = document.querySelector('#footWidthLabel');
    patternParagraphs = document.querySelector('.pattern');
    disableInputFields();
} //end of getDOMElementes function

function disableInputFields() {
    console.log('disableInputFields function EXECUTED')
    for (let i = 0; i < gaugeInfoFields.length; i++) {
        gaugeInfoFields[i].disabled = true;
        // console.log('gaugeInfoFields['+ i +'] inside disableInputFields function, disabled?' + gaugeInfoFields[i].disabled)
      }
      for (let i = 0; i < footInfoFields.length; i++) {
        footInfoFields[i].disabled = true;
        // console.log('footInfoFields['+ i +'] inside disableInputFields function, disabled?' + footInfoFields[i].disabled)
      }
} //end of disableInputFields funtion


function enableSwatchSize() {
    gaugeSizeLabel.innerHTML = '<input type="number" name="gaugeSwatchSize" id="gaugeSize" class="gaugeInfoInput" min="1" placeholder="swatch size" required>' + ' How many ' + measuringSystem + ' are in your swatch.'
    gaugeSizeField = document.querySelector('#gaugeSize');
    gaugeSize = gaugeSizeField.value;
    gaugeSizeField.disabled = false;
    gaugeSizeField.addEventListener('change', writeInputFields);
} //end of enableSwatchSize function

function writeInputFields() {
    measuringSystemMenu.disabled = true;
    gaugeSize = document.querySelector('#gaugeSize').value;
    gaugeStsLabel.innerHTML = '<input type="number" name="gaugeSts" id="gaugeSts" class="gaugeInfoInput" min="1" placeholder="sts" required> ' + ' sts in ' + gaugeSize + ' ' + measuringSystem + '.';
    gaugeStsField = document.querySelector('#gaugeSts');
    console.log('Gauge sts value: ' + gaugeSts);
    gaugeRowsLabel.innerHTML = '<input type="number" name="gaugeRows" id="gaugeRows" class="gaugeInfoInput" min="1" placeholder="rows" required>' + '  rows in ' + gaugeSize + ' ' + measuringSystem + '.';
    gaugeRowsField = document.querySelector('#gaugeRows'); 
    console.log('Gauge ros value: ' + gaugeRows);
    footLengthLabel.innerHTML = 'The LENGTH of your foot: <input type="number" name="footLength" id="footLength" class="footInfoInput" min="1" placeholder="foot length" required> ' + measuringSystem; 
    footLengthField = document.querySelector('#footLength');
    console.log('Foot length value: ' + footLength);
    footWidthLabel.innerHTML = 'The WIDTH of your foot (circumference): <input type="number" name="footWidth" id="footWidth" class="footInfoInput" min="1" placeholder="foot width" required> ' + measuringSystem;
    footWidthField = document.querySelector('#footWidth');
    console.log('Foot width value: ' + footWidth);
    resetButton.disabled = false;
    enableInputFields();
} // end of writeInputFields function

function enableInputFields() {
    console.log('enableInputFields function EXECUTED')
    for (let i = 0; i < gaugeInfoFields.length; i++) {
        gaugeInfoFields[i].disabled = false;
        // console.log('gaugeInfoFields['+ i +'] inside enableInputFields function, disabled?' + gaugeInfoFields[i].disabled)
      }
      for (let i = 0; i < footInfoFields.length; i++) {
        footInfoFields[i].disabled = false;
        // console.log('footInfoFields['+ i +'] inside enableInputFields function, disabled?' + footInfoFields[i].disabled)
      }
    measuringSystemMenu.disabled = true;
    console.log('measuringSytemMenu inside enableInputFields function, disabled? ' + measuringSystemMenu.disabled)
    submitButton.disabled = false;
    submitButton.addEventListener('click', checkAllFieldsHaveBeenFilled);  
} // end of enableInputFields funtion

function checkAllFieldsHaveBeenFilled() {
    console.log('Gauge size value: ' + gaugeSize);
    gaugeSts = gaugeStsField.value;
    console.log('Gauge sts value: ' + gaugeSts);
    gaugeRows = gaugeRowsField.value;
    console.log('Gauge rows value: ' + gaugeRows);
    footLength = footLengthField.value;
    console.log('Foot length value: ' + footLength);
    footWidth = footWidthField.value;
    console.log('Foot width value: ' + footWidth);
    var x = 0;
    console.log('original x = ' + x)
      if (gaugeSize > 0) {
          x ++;
          console.log('gauge size, x: ' + x);
        } 
     if (gaugeSts > 0) { //it doesnt enter this if nor any of the following ifs, why?
             x ++;
             console.log('gauge sts x: ' + x);
     }

     if (gaugeRows > 0) {
              x ++;
             console.log('gauge rows x: ' + x);
     }
     if (footLength > 0) {
        x ++;
     }
     if (footWidth > 0) { //arreglar esto que tampoco funciona
        x ++;
     }
    console.log('final x = ' + x);
    console.log('checkAllFieldsHaveBeenFilled funtion EXECUTED')
    if (x < 5) {
        alert('Check that you have completed all the information');
        console.log('Check that you have completed all the information');
        submitButton.addEventListener('click', checkAllFieldsHaveBeenFilled); 
    } else  if (x >= 5){ 
        getSubmitedValues();
    }
} // end of checkAllFieldsHaveBeenFilled

function getSubmitedValues() {
    console.log('Submit button fired');
    console.log('getSubmitedValues function EXECUTED')
    submitButton.disabled = true;
    console.log('SubmitButton inside getSubmitedValues function, disabled?' + submitButton.disabled)
    gaugeSize = document.querySelector('#gaugeSize').value;
    gaugeSts = document.querySelector('#gaugeSts').value;
    gaugeRows = document.querySelector('#gaugeRows').value;
    footLength = document.querySelector('#footLength').value;
    footWidth = document.querySelector('#footWidth').value;
    userNotes = document.querySelector('#userNotes').value;
    document.querySelector('#buttonInstructions').innerHTML = "";
    seeSubmitedValues();
      if (measuringSystem == "cm") {
          measuringSystem = "cm";
          console.log('this pattern will be in CM, from getSubmitedValues');
        //   calculateInCm();
        calculatePattern();
      } else if (measuringSystem == "inches") {
          measuringSystem = "inches"
          console.log('this pattern will be in INCHES, from getSubmitedValues');
        //  calculateInInches();
         calculatePattern ()
      }
    disableInputFields();
    //  seeSubmitedValues();
} //enf of getSubmitedValues function

function seeSubmitedValues() {
    console.log('seeSubmitedValues function EXECUTED');
console.log('cm or inches?: ' + measuringSystem);
console.log('Gauge Size: ' + gaugeSize);
console.log('Gauge Sts: ' + gaugeSts);
console.log('Gauge Rows: ' + gaugeRows);
console.log('footLength: ' + footLength);
console.log('footWidth: ' + footWidth);
console.log('');
//  if (measuringSystem == "inches") {
//      calculateInInches();
//  } else if (measuringSystem == "cm") {
//      calculateInCm();
//  }
calculatePattern();
} //end of seeSubmitedValues function

////////// start of the pattern math of the program: 
 function calculatePattern() {
     foot_sts = ((footWidth * gaugeSts) / gaugeSize) *0.9;
     HALF_CO_sts = foot_sts / 4;
     if ((HALF_CO_sts % 2) !== 0) {
         HALF_CO_sts = Math.round(HALF_CO_sts);
     }
     if ((HALF_CO_sts % 4) !== 0) {
        HALF_CO_sts = HALF_CO_sts-1;
    }
     foot_sts = HALF_CO_sts * 4;
     console.log("HALFCOsts: " + HALF_CO_sts );
     if (foot_sts % 2 !== 0) {
         foot_sts = Math.round(foot_sts)-1;
     }
     console.log("footSts: " + foot_sts);
     CO_sts = HALF_CO_sts * 2;
     HALF_foot_sts = foot_sts / 2;
     console.log("HALFfootSts: " + HALF_foot_sts)
     gusset_inc_sts = HALF_foot_sts - 2;
     HALF_gusset_inc_sts = gusset_inc_sts / 2;
     gusset_inc_rows = gusset_inc_sts;
     if (measuringSystem == 'cm') {
        total_foot_rows = ((footLength - (footLength*0.05)) * gaugeRows) / gaugeSize;
        if (total_foot_rows % 1!== 0 ) {
            total_foot_rows = Math.round(total_foot_rows)-1;
        }
     } else if (measuringSystem == 'inches') {
        total_foot_rows = ((footLength - (footLength*0.05)) * gaugeRows) / gaugeSize;
        if (total_foot_rows % 1!== 0 ) {
            total_foot_rows = Math.ceil(total_foot_rows)-1;
        }
     }
     foot_before_gusset_rows = total_foot_rows - gusset_inc_rows;
     if (measuringSystem == 'cm') {
         foot_before_gusset_cm = (foot_before_gusset_rows * gaugeSize) / gaugeRows;
         if (foot_before_gusset_cm % 1 !== 0) {
            foot_before_gusset_cm = Math.round(foot_before_gusset_cm);
         }
     } else if (measuringSystem == 'inches') {
        console.log('stop 2 inches')
         foot_before_gusset_inches = (foot_before_gusset_inches = (foot_before_gusset_rows * (gaugeSize)) / gaugeRows); 
         if (foot_before_gusset_inches % 1 !== 0) {
            foot_before_gusset_inches = Math.round(foot_before_gusset_inches);
        }
      }
      console.log('stop 3')
     afterGussetHeelNeedleSts = HALF_foot_sts + gusset_inc_sts;
     heelNeedleStMarker = afterGussetHeelNeedleSts / 2;
     R1BackAndForth = heelNeedleStMarker + 2;
     R1sts = R1BackAndForth + 2;
     Rend_k_sts = heelNeedleStMarker - 1;
     Rend_sts = R1BackAndForth;
     R1HeelNeedle = Rend_sts;
     R1InstepNeedle = Rend_sts-1;
     R1BothNeedlesSts = R1HeelNeedle + R1InstepNeedle;
     R2BothNeedlesSts = R1BothNeedlesSts - 2;
     CuffRepeats = R2BothNeedlesSts / 4
     writePattern();
 } // end of the calculateIn CM and Inches function



function writePattern() {
    console.log('writePattern function EXECUTED')
patternMeasurementsTitle = document.querySelector('#h3-patternMeasurements');
    patternMeasurementsTitle.innerHTML = 'Your Measurements'
patternMeasurementsP = document.querySelector('#patternMeasurements');
    patternMeasurementsP.innerHTML =  "Your gauge: " + gaugeSize + " " + measuringSystem + " = " + gaugeSts + " sts and " + gaugeRows + " rows. <br>" + "Your foot measurements: " + footLength + " " + measuringSystem + " (length) and " + footWidth + " " + measuringSystem + " (width). " + " <br>"
patternNotesTitle = document.querySelector('#h3-patternNotes');
    patternNotesTitle.innerHTML = 'Notes:'
patternNotes = document.querySelector('#patternNotes');
    patternNotes.innerHTML = 'This socks are knitted in the rnd, starting at the toe and ending with the cuff. You can use 1 circular knitting needle, 2 circular knitting needles or double pointed needles. <br>'
    patternInstructionsTitle = document.querySelector('#h3-patternInstuctions');
    patternInstructionsTitle.innerHTML = 'Pattern Instructions';
patternInstructions = document.querySelector('#patternInstructions');
addH4Titles('TOE', 'yes');
addParagraph("Using Judy's Magic Cast On, CO " + HALF_CO_sts + " sts on each needle, so that you have a total of " + CO_sts + " sts. <br>");
addParagraph("Put a st marker to indicate the beg of rnd.");
addParagraph("<b>R1:</b> knit both needles. ");
addParagraph("<b>R2:</b> k1, M1R, knit to last st on needle, M1L, k1 (rep on the other needle) ");
addParagraph("Rep rnds 1 and 2 until there are " + foot_sts + " sts in total (" + HALF_foot_sts + " on each needle) ")
addH4Titles('FOOT', 'yes');
if (measuringSystem == 'cm') {
    // addParagraph("Continue knitting in Stockinette St until your piece measures " + foot_before_gusset_cm + ' ' + measuringSystem + " from the toe to your needles. (that would be aprox " + foot_before_gusset_rows + " rnds). ");
    addParagraph("Continue knitting in Stockinette St for  " + foot_before_gusset_rows + " rnds  from the toe to your needles. (that would be aprox " + foot_before_gusset_cm + ' ' + measuringSystem + "). ");
} else if (measuringSystem == 'inches') {
    // addParagraph("Continue knitting in Stockinette St until your piece measures approximately " + foot_before_gusset_inches + ' ' + measuringSystem + " from the toe to your needles. (that would be aprox " + foot_before_gusset_rows + " rnds). ");
    addParagraph("Continue knitting in Stockinette St for  " + foot_before_gusset_rows + " rnds  from the toe to your needles. (that would be aprox " + foot_before_gusset_inches + ' ' + measuringSystem + "). ");
}
addParagraph("The sts on the 1st needle are the SOLE sts (where we'll make the HEEL), the ones on the 2nd needle are the INSTEP sts. ");
addH4Titles('GUSSET', 'yes');
addParagraph("Beg increasing on the sole (while working in Stockinette St for the instep) as follows: ");
addParagraph("<b>R1:</b> (heel needle): k1, M1L, k to last st on needle, M1R, k1; <br> (instep needle): knit.");
addParagraph("<b>R2:</b> knit ");
addParagraph("Rep rnds 1 and 2 until the heel needle has " + afterGussetHeelNeedleSts + " sts.");
addH4Titles('HEEL', 'yes')
addParagraph("Start working back and forth to make a fleegle heel.");
addParagraph("<b>R1:</b> k " + R1BackAndForth + ", k2tog, k1. Turn. (" + R1sts + " sts)");
addParagraph("<b>R2:</b> sl1(wyif), p5, p2tog, p1. Turn. (8 sts)");
addParagraph("<b>R3:</b> sl1(wyib), k6, k2tog, k1. Turn (9 sts)");
addParagraph("<b>R4:</b> sl1(wyif), p7, p2tog, p1. Turn. (10 sts)");
addParagraph("Continue knitting in this manner until there is a row like the one that follows: sl1(wyib), k" + Rend_k_sts + ", k2tog, k1. (" + Rend_sts + " sts)");
addParagraph("Knit the sts on the instep needle. Then continue knittng in the rnd.");
addParagraph("<b>R1:</b> (heel needle): k1, k2tog, k to end of needle (" +  R1HeelNeedle + " sts); <br> (instep needle): knit (" + R1InstepNeedle + " sts). That way you have a total of " + R1BothNeedlesSts + " sts.");
addParagraph("<b>R2:</b> (heel needle): k1, SSK, knit to last 3 sts, k2tog, k1 (" + R1InstepNeedle + " sts); <br> (instep needle): knit " + R1InstepNeedle + " sts. You'll have a total of " + R2BothNeedlesSts + " sts.");
addH4Titles('CUFF', 'yes')
addParagraph("Optional: work in Stockinette Stitch for as long as you want before making the rib."); 
addParagraph("*k2, p2*  rep from * to * " + CuffRepeats + " times, for as many rnds as necessary to achieve the desired elastic cuff length.");
addParagraph("Once you've reached the desired length BO (with an elastic bind off method).");
addParagraph("I like to use Jeny's Stretchy Bind OFf")
addParagraph('Enjoy your new socks!');
addH4Titles('Your Personal Notes for this pattern: ', 'no', 'notes', 'no');
addParagraph(userNotes, 'notes' , 'yes');
const breaks = document.createElement('hr');
patternInstructions.appendChild(breaks);
document.querySelector('.row').style = "flex-direction: column-reverse;";
topFunction()
window.onscroll = function() {scrollFunction()};
body.innerHTML = "";

} //end of the writePatternInCM function


 function addH4Titles(title, id, specialClass, classes) {
    const title4 = document.createElement('h4');
    title4.innerHTML = title;
    patternInstructions.appendChild(title4);
    console.log('addH4Titles function EXECUTED for: ' + title);
    title4.classList.add('light-mode');
    title4.classList.add('morePadding');
    if ( id === 'yes') {
        title4.setAttribute('id', title)
        topNav = document.querySelector('.topNav');
        const aNav = document.createElement('a');
        aNav.innerHTML = title;
        topNav.appendChild(aNav);
        aNav.setAttribute('href', "#" + title);
        aNav.classList.add('topNava');
        aNav.classList.add('light-mode');
    }
    if (classes === 'yes') {
        title4.classList.add(specialClass)
    }
 } 

function addParagraph(text, specialClass, classes) {
    const para = document.createElement('p');
    para.innerHTML = text;
    patternInstructions.appendChild(para);
    if (classes === "yes") {
        para.classList.add(specialClass);
    }
} //end of addParagraph function

function addBreak() {
    const title4 = document.createElement('h4');
    title4.innerHTML = title;
    patternInstructions.appendChild(title4);
    console.log('addH4Titles function EXECUTED for: ' + title);
    title4.classList.add('light-mode');
} // end of break function

// scroll to top button
// When the user scrolls down 15px from the top of the document, show the button
// window.onscroll = function() {scrollFunction()};
function scrollFunction() {
  if (document.body.scrollTop > 15 || document.documentElement.scrollTop > 15) {
    topButton.style.display = "block";
  } else {
    topButton.style.display = "none";
  }
}
// When the user clickss on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
//end of scroll to top button

// light/dark mode toggle:

function darkLightMode() {

    var element = document.body;
    element.classList.toggle('dark-mode');
    var elements = document.getElementsByClassName('light-mode');
    for (let i = 0; i < elements.length; i++) {
        elements[i].classList.toggle('dark-mode');
      }
      var element = document.querySelector('footer');
    element.classList.toggle('dark-mode');

    var lightSwitch = document.querySelector('#light');
    var darkSwitch = document.querySelector('#dark');

    darkSwitch.classList.toggle('dark-selected');
    lightSwitch.classList.toggle('light-selected');
  } //end of darkLightMode funtion

